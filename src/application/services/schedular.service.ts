import { TransactionStatus } from "../../domain/enums/transaction-status.enum";
import { AccountServiceInterface } from "../interfaces/account-service.interface";
import { SchedularServiceInterface } from "../interfaces/schedular-service.interface";
import { TransactionServiceInterface } from "../interfaces/transaction-service.interface";
import { AccountService } from "./account.service";
import { TransactionService } from "./transaction.service";

export class SchedularService implements SchedularServiceInterface {
   private transactionService: TransactionServiceInterface;
   private accountService: AccountServiceInterface;

   constructor(
      accountService?: AccountServiceInterface,
      transactionService?: TransactionServiceInterface
   ) {
      if (accountService) this.accountService = accountService;
      else this.accountService = new AccountService();

      if (transactionService) this.transactionService = transactionService;
      else this.transactionService = new TransactionService();
   }

   public async run() {
      console.log("Starting running schedular");
      const scheduledsTransactionsToDate =
         await this.transactionService.getTransactionsByStatusAndDate(
            TransactionStatus.SCHEDULED,
            new Date()
         );
      console.log(
         `${scheduledsTransactionsToDate.length} transactions found to be processed`
      );

      scheduledsTransactionsToDate.map(async (transaction) => {
         const senderAccount = await this.accountService.findAccountById(
            transaction.senderId
         );

         const receiverAccount = await this.accountService.findAccountById(
            transaction.receiverId
         );

         if (!senderAccount || !receiverAccount) {
            await this.transactionService.saveTransaction(
               transaction.id,
               TransactionStatus.CANCELED
            );
            return;
         }

         if (senderAccount.amount < transaction.amount) {
            await this.transactionService.saveTransaction(
               transaction.id,
               TransactionStatus.CANCELED
            );

            return;
         }

         await this.accountService.transfer({
            senderId: senderAccount.id,
            receiverId: receiverAccount.id,
            amount: transaction.amount,
         });

         await this.transactionService.saveTransaction(
            transaction.id,
            TransactionStatus.COMPLETED
         );
      });
      console.log("Finishing running schedular");
   }
}
