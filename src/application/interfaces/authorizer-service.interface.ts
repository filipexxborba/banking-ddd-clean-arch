export interface AuthorizerServiceInterface {
   authorize(
      senderId: number,
      receiverId: number,
      amount: number
   ): Promise<boolean>;
}
