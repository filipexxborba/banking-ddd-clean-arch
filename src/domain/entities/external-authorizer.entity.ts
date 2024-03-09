import { Authorizer } from "../../core/domain/authorizer.abstract";

export class ExternalAuthorizer extends Authorizer {
   authorize: (
      senderId: number,
      receiverId: number,
      amount: number
   ) => Promise<boolean> = async (senderId, receiverId, amount) => {
      try {
         const authorizeResponse = await fetch(
            "https://eo9ggxnfribmy6a.m.pipedream.net/beta-authorizer",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer Ym9yYmEuZmlsaXBlMDBAZ21haWwuY29t",
               },
               body: JSON.stringify({
                  sender: senderId,
                  receiver: receiverId,
                  amount: amount,
               }),
            }
         );
         const authorizeResponseJson = await authorizeResponse.json();
         return authorizeResponseJson.authorized as boolean;
      } catch (error) {
         throw new Error("Error authorizing transaction");
      }
   };
}
