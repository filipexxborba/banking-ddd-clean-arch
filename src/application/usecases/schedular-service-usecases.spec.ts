import { TransactionRepositoryInterface } from "../../domain/interfaces/repositories/transaction-repository.interface";
import { TransactionService } from "../services/transaction.service";
import { AccountRepositoryInterface } from "../../domain/interfaces/repositories/account-repository.interface";
import { AccountService } from "../services/account.service";
import { SchedularService } from "../services/schedular.service";
import { InMemoryTransactionsRepository } from "../../../tests/in-memory-transactions-repository";
import { InMemoryAccountsRepository } from "../../../tests/in-memory-accounts-repository";

describe("Schedular Service Use Case", () => {
   let transactionRepository: TransactionRepositoryInterface;
   let transactionService: TransactionService;

   let accountRepository: AccountRepositoryInterface;
   let accountService: AccountService;

   let schedularService: SchedularService;

   beforeEach(() => {
      transactionRepository = new InMemoryTransactionsRepository();
      transactionService = new TransactionService(transactionRepository);

      accountRepository = new InMemoryAccountsRepository();
      accountService = new AccountService(accountRepository);

      schedularService = new SchedularService(
         accountService,
         transactionService
      );
   });

   it("Should be able to run the schedular", async () => {
      const senderAccount = await accountService.createAccount({
         name: "sender_account",
         amount: 100,
         id: 1,
      });
      const receiverAccount = await accountService.createAccount({
         name: "receiver_account",
         id: 2,
      });

      const transaction = await transactionService.createTransaction({
         senderId: senderAccount.id,
         receiverId: receiverAccount.id,
         amount: 50,
      });

      await schedularService.run();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedSenderAccount = await accountService.findAccountById(
         senderAccount.id
      );
      const updatedReceiverAccount = await accountService.findAccountById(
         receiverAccount.id
      );
      const updatedTransaction = await transactionService.getTransactionById(
         transaction.id
      );

      expect(updatedSenderAccount?.amount).toBe(50);
      expect(updatedReceiverAccount?.amount).toBe(50);
      expect(updatedTransaction?.status).toBe("COMPLETED");
   });

   it("Should be able to cancel a transaction if sender account does not exist", async () => {
      const receiverAccount = await accountService.createAccount({
         name: "receiver_account",
         amount: 100,
         id: 2,
      });

      const transaction = await transactionService.createTransaction({
         senderId: 999,
         receiverId: receiverAccount.id,
         amount: 50,
      });

      await schedularService.run();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedTransaction = await transactionService.getTransactionById(
         transaction.id
      );

      expect(updatedTransaction?.status).toBe("CANCELED");
   });

   it("Should be able to cancel a transaction if receiver account does not exist", async () => {
      const senderAccount = await accountService.createAccount({
         name: "sender_account",
         amount: 100,
         id: 1,
      });

      const transaction = await transactionService.createTransaction({
         senderId: senderAccount.id,
         receiverId: 999,
         amount: 50,
      });

      await schedularService.run();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTimeout(async () => {
         const updatedTransaction = await transactionService.getTransactionById(
            transaction.id
         );

         expect(updatedTransaction?.status).toBe("CANCELED");
      }, 1000);
   });

   it("Should be able to cancel a transaction if sender account does not have enough money", async () => {
      const senderAccount = await accountService.createAccount({
         name: "sender_account",
         amount: 10,
         id: 1,
      });
      const receiverAccount = await accountService.createAccount({
         name: "receiver_account",
         id: 2,
      });

      const transaction = await transactionService.createTransaction({
         senderId: senderAccount.id,
         receiverId: receiverAccount.id,
         amount: 50,
      });

      await schedularService.run();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedTransaction = await transactionService.getTransactionById(
         transaction.id
      );

      expect(updatedTransaction?.status).toBe("CANCELED");
   });
});
