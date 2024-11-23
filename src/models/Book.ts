import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../helpers/db";

class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare score: CreationOptional<number>;
}
Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        score: {
            type: DataTypes.DOUBLE,
            defaultValue: -1
        },
      
    }, {
    sequelize,
    tableName: "Books"
})

export default Book