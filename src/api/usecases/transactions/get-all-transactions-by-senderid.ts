import { TransactionService } from "../../../application/services/transaction.service";

export class GetAllTransactionsBySenderId {
   constructor(private readonly transactionService: TransactionService) {}

   async execute(senderId: number) {
      return await this.transactionService.getAllTransactionsBySenderId(
         senderId
      );
   }
}
