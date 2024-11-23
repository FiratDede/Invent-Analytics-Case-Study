import 'dotenv/config'
// import { sequelize } from "../helpers/db";
import User from "./User";
import Book  from './Book';
import BorrowedBook from './BorrowedBook';
import { sequelize } from "../helpers/db";


User.hasMany(BorrowedBook, {foreignKey: "userId"});
BorrowedBook.belongsTo(User, {foreignKey: "userId"});

Book.hasMany(BorrowedBook, {foreignKey: "bookId", });
BorrowedBook.belongsTo(Book, {foreignKey: "bookId"});


async function initializeDatabase() {
  try {
    // Check DB Connection
    await sequelize.authenticate();
    console.log('DB connection has been established successfully.');

    // Sync DB
    await sequelize.sync({ });
    console.log('Db syncronized!');


  } catch (error) {
    console.error('Error:', error);
  }
}

initializeDatabase();


export {
  User,
  Book,
  BorrowedBook
};