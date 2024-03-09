export interface TransactionDTO {
   id: number;
   senderId: number;
   receiverId: number;
   amount: number;
   status: string;
   scheduledDate: Date;
}
