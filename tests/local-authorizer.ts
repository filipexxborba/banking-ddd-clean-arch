import { Authorizer } from "../src/core/domain/authorizer.abstract";

export class LocalAuthorizer implements Authorizer {
   authorize: (
      senderId: number,
      receiverId: number,
      amount: number
   ) => Promise<boolean> = async (senderId, receiverId, amount) => {
      if (senderId === receiverId) {
         return false;
      }
      if (amount <= 0) {
         return false;
      }
      return true;
   };
}
