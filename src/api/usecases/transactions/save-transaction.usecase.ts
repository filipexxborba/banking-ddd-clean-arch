import { SaveTransactionDTO } from "../../../application/dtos/save-transaction.dto";
import { TransactionService } from "../../../application/services/transaction.service";

export class SaveTransactionUseCase {
   constructor(private readonly transactionService: TransactionService) {}

   async execute(saveTransactionDTO: SaveTransactionDTO) {
      return await this.transactionService.saveTransaction(
         saveTransactionDTO.id,
         saveTransactionDTO.status
      );
   }
}
