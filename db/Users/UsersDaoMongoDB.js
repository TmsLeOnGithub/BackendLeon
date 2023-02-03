import { UserModel } from '../../db/schemas/usersModel.js'
import { ContenedorMongoDB } from '../containers/ContenedorMongoDB.js';

export class UsersDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super({
      name: UserModel.UserCollection,
      schema: UserModel.UserSchema,
    });
  }
}
