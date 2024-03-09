import { AuthorizerEntity } from "../../domain/interfaces/authorizer.entity";

export abstract class Authorizer implements AuthorizerEntity {
   authorize: (
      senderId: number,
      receiverId: number,
      amount: number
   ) => Promise<boolean> = async (senderId, receiverId, amount) => {
      return false;
   };
}
