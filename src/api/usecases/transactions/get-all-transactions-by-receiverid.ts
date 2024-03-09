import { TransactionService } from "../../../application/services/transaction.service";

export class GetAllTransactionsByReceiverId {
   constructor(private readonly transactionService: TransactionService) {}

   async execute(receiverId: number) {
      return await this.transactionService.getAllTransactionsByReceiverId(
         receiverId
      );
   }
}
