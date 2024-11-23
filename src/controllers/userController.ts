import { Request, Response, NextFunction } from "express";
import { BorrowedBook, User, Book } from "../models/index"
import { CustomError } from "../helpers/errorHelpers";
import {  Op } from "sequelize";
import { sequelize } from "../helpers/db";
import { createUserRequestBodySchema, returnBookRequestBodySchema } from "../helpers/joiSchemas";
import { BorrowBookRequestParams, GetUserRequestParams, ReturnBookRequestParams } from "../types/types";

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {

  const allUsers = await User.findAll({ attributes: ["id", "name"] })

  return res.status(200).send(allUsers)
}

export async function getUser(req: Request<GetUserRequestParams>, res: Response, next: NextFunction) {

  const { userId }: { userId: number } = req.params;


  const myUser = await User.findByPk(Number(userId))

  if (!myUser) {
    throw new CustomError(`User with ${userId} id not found`, 400)
  }

  let presentBooksOfMyUser = await BorrowedBook.findAll({
    attributes: [],
    where: {
      userId: Number(userId),
      returnedDate: null,
    },
    include: [
      {
        model: Book,
        attributes: ['name',
        ],
      },
    ]
  })
  let pastBooksOfMyUser = await BorrowedBook.findAll({
    attributes: ['score'],
    where: {
      userId: Number(userId),
      returnedDate: { [Op.not]: null },
    },
    include: [
      {
        model: Book,

        attributes: ['name',

        ],
      },
    ]

  })

  let formattedUserInfo = {
    id: myUser?.id,
    name: myUser?.name,
    books: {
      past: <any>[

      ],
      present: <any>[
      ]
    }
  }

  presentBooksOfMyUser.forEach((presentBook: any) => {
    formattedUserInfo.books.present.push({ name: presentBook.Book.name })
  })

  pastBooksOfMyUser.forEach((pastBook: any) => {
    formattedUserInfo.books.past.push({ name: pastBook.Book.name, userScore: pastBook.score })
  })

  return res.status(200).json(formattedUserInfo)

}

export async function createUser(req: Request, res: Response, next: NextFunction) {


  const { value, error } = createUserRequestBodySchema.validate(req.body)

  if (error) {
    throw new CustomError(error.message, 400)
  }

  const { name } = req.body;


  const user = await User.create({ name })



  return res.status(201).send("")
}

export async function borrowBook(req: Request<BorrowBookRequestParams>, res: Response, next: NextFunction) {

  const { userId, bookId }: { userId: number, bookId: number } = req.params;

  const isPreviouslyBorrowed: boolean =
    (await BorrowedBook.count(
      {
        where: {
          bookId: bookId,
          returnedDate: null
        },
      }
    )
    ) >= 1;

  if (isPreviouslyBorrowed) {
    throw new CustomError(`Book with ${bookId} id is already borrowed!`, 400)
  }


  await BorrowedBook.create({ userId: Number(userId), bookId: Number(bookId) })

  return res.status(204).send("")

}

export async function returnBook(req: Request<ReturnBookRequestParams>, res: Response, next: NextFunction) {
  const { userId, bookId }: { userId: number, bookId: number } = req.params;

  const { value, error } = returnBookRequestBodySchema.validate(req.body)

  if (error) {
    throw new CustomError(error.message, 400)
  }

  const { score }: { score: number } = req.body

  const updated = await BorrowedBook.update({ returnedDate: new Date(), score: score },
    {
      where: {
        userId: Number(userId),
        bookId: Number(bookId),
        returnedDate: null
      },
    },)
 
  if (updated[0] > 0) {
    const averageScore = await BorrowedBook.findOne({
      attributes: [
        [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('score')), 2), 'score']
      ],
      where: {
        bookId: bookId,
        returnedDate: { [Op.ne]: null }, 
      },
      group: "bookId",

    });
 

    if (averageScore) {
      await Book.update(
        {
          score: Number(averageScore.score)
        },
        {
          where: {
            id: Number(bookId)
          }
        }
      );
    }
  }
  else {
    throw new CustomError(`Book with ${bookId} couldn't be returned `, 400);
  }

  return res.status(204).send("")


}