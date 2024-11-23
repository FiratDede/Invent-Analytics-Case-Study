import { DataTypes,  Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";
import { sequelize } from "../helpers/db";
import {User,Book} from "./index"
class BorrowedBook extends Model<InferAttributes<BorrowedBook>, InferCreationAttributes<BorrowedBook>> {
    declare id: CreationOptional<number>;
    declare score: CreationOptional<number>;
    declare borrowedDate: CreationOptional<Date>;
    declare returnedDate: null | CreationOptional<Date>;
    declare userId:  ForeignKey<User['id']>;
    declare bookId:  ForeignKey<Book['id']>;
}
BorrowedBook.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,    
        },

        borrowedDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        returnedDate: {
            type: DataTypes.DATE,
            defaultValue: null,
        }
    }, {
    sequelize,
    tableName: "BorrowedBooks"
})

export default BorrowedBook