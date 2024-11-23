import { Request, Response, NextFunction } from "express";
import { Book, } from "../models/index"
import { CustomError } from "../helpers/errorHelpers";
import { createBookRequestBodySchema } from "../helpers/joiSchemas";
import { GetBookRequestParams } from "../types/types";

export async function getAllBooks(req: Request, res: Response, next: NextFunction) {

  const allBooks = await Book.findAll({attributes: ["id","name"]})

  return res.status(200).send(allBooks)
}

export async function getBook(req: Request<GetBookRequestParams>, res: Response, next: NextFunction) {

  const { bookId }: { bookId: number } = req.params;

  const bookWithRating = await Book.findByPk(Number(bookId), {
    attributes: [
      'id',
      'name',
      'score'
    ],
  });

  if(!bookWithRating){
    throw new CustomError(`Book with ${bookId} id not found`,400)
  }

  return res.status(200).send(bookWithRating)
}

export async function createBook(req: Request, res: Response, next: NextFunction) {

  const { value, error } = createBookRequestBodySchema.validate(req.body)

  if (error) {
    throw new CustomError(error.message, 400)
  }

  const { name }: {name: string} = req.body;

  const book = await Book.create({ name })

  return res.status(201).send("")
}