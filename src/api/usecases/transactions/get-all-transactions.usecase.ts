import { TransactionService } from "../../../application/services/transaction.service";

export class GetAllTransactionsUseCase {
   constructor(private readonly transactionService: TransactionService) {}

   async execute() {
      return await this.transactionService.getAllTransactions();
   }
}
