export interface AuthorizerEntity {
   authorize: (
      senderId: number,
      receiverId: number,
      amount: number
   ) => Promise<boolean>;
}
