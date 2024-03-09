import { ExternalAuthorizer } from "../../domain/entities/external-authorizer.entity";
import { AuthorizerServiceInterface } from "../interfaces/authorizer-service.interface";

export class AuthorizerService implements AuthorizerServiceInterface {
   constructor(private readonly externalAuthorizer: ExternalAuthorizer) {}

   async authorize(
      senderId: number,
      receiverId: number,
      amount: number
   ): Promise<boolean> {
      const isAuthorized = await this.externalAuthorizer.authorize(
         senderId,
         receiverId,
         amount
      );

      return isAuthorized;
   }
}
