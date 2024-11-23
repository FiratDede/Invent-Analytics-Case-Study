import { DataTypes, Optional, ModelDefined, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";
import { sequelize } from "../helpers/db";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;


}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
  sequelize,
  tableName: "Users"
})

export default User