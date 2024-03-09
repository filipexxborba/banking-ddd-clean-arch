import { ExternalAuthorizer } from "../../domain/entities/external-authorizer.entity";

export class AuthorizerService {
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
