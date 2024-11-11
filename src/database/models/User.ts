import { DataTypes, Model } from "sequelize";

import dbconnection from "@/database/dbconnection";
import { USER } from "@/types";

class User extends Model<USER> {}

User.init(
  {
    // auto managed fields
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM("user", "secretary", "manager", "admin"),
      defaultValue: "user",
    },

    // required fields
    name: { type: DataTypes.STRING("255"), allowNull: false },
    email: { type: DataTypes.STRING("255"), allowNull: false },
    password: { type: DataTypes.STRING("255"), allowNull: false },

    // optional
    phone: { type: DataTypes.STRING("255"), allowNull: true, defaultValue: "" },
    dob: { type: DataTypes.STRING("255"), allowNull: true, defaultValue: "" },
    address: { type: DataTypes.STRING("255"), allowNull: true },
    photo: { type: DataTypes.STRING("255"), allowNull: true },
    refresh_token: { type: DataTypes.STRING("255"), allowNull: true },
  },

  {
    tableName: "users",
    sequelize: dbconnection,
  }
);
export default User;
