import { ContenedorMongoDB } from "../../containers/ContenedorMongoDB.js";
import { UserModel } from '../../models/usersModel.js'

export class UsersDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super({
      name: UserModel.UserCollection,
      schema: UserModel.UserSchema,
    });
  }
}
