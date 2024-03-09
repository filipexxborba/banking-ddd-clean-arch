import { AccountRepositoryInterface } from "../../domain/interfaces/repositories/account-repository.interface";
import { AccountService } from "../services/account.service";
import { InMemoryAccountsRepository } from "../../../tests/in-memory-accounts-repository";

describe("Account service usecases", () => {
   let accountRepository: AccountRepositoryInterface;
   let accountService: AccountService;

   beforeEach(() => {
      accountRepository = new InMemoryAccountsRepository();
      accountService = new AccountService(accountRepository);
   });

   it("Should be able to create a new account with zero balance", async () => {
      const account = await accountService.createAccount({
         name: "any_name",
      });
      expect(account.amount).toBe(0);
      expect(account.id).toBe(1);
   });

   it("Should be able to create a new account with a positive balance", async () => {
      const account = await accountService.createAccount({
         name: "any_name",
         amount: 100,
      });
      expect(account.amount).toBe(100);
      expect(account.id).toBe(1);
   });

   it("Should be able to transfer money between accounts", async () => {
      const senderAccount = await accountService.createAccount({
         name: "sender_account",
         amount: 100,
      });
      const receiverAccount = await accountService.createAccount({
         name: "receiver_account",
      });
      const transfer = await accountService.transfer({
         senderId: senderAccount.id,
         receiverId: receiverAccount.id,
         amount: 50,
      });
      expect(transfer.amount).toBe(50);
      expect(transfer.senderId).toBe(senderAccount.id);
      expect(transfer.receiverId).toBe(receiverAccount.id);
      expect(transfer.description).toBe(
         "Transfer between accounts done successfully!"
      );
   });

   it("Should not be able to transfer money between accounts if sender account does not exist", async () => {
      const receiverAccount = await accountService.createAccount({
         name: "receiver_account",
      });
      try {
         await accountService.transfer({
            senderId: 999,
            receiverId: receiverAccount.id,
            amount: 50,
         });
      } catch (error) {
         expect((error as Error).message).toBe("Sender account not found");
      }
   });

   it("Should not be able to transfer money between accounts if receiver account does not exist", async () => {
      const senderAccount = await accountService.createAccount({
         name: "sender_account",
         amount: 100,
      });
      try {
         await accountService.transfer({
            senderId: senderAccount.id,
            receiverId: 999,
            amount: 50,
         });
      } catch (error) {
         expect((error as Error).message).toBe("Receiver account not found");
      }
   });

   it("Should not be able to transfer money between accounts if sender account has insufficient funds", async () => {
      const senderAccount = await accountService.createAccount({
         name: "sender_account",
      });
      const receiverAccount = await accountService.createAccount({
         name: "receiver_account",
      });
      try {
         await accountService.transfer({
            senderId: senderAccount.id,
            receiverId: receiverAccount.id,
            amount: 50,
         });
      } catch (error) {
         expect((error as Error).message).toBe("Insufficient funds");
      }
   });

   it("Should not be able to transfer money between accounts if sender account has invalid amount", async () => {
      const senderAccount = await accountService.createAccount({
         name: "sender_account",
      });
      const receiverAccount = await accountService.createAccount({
         name: "receiver_account",
      });
      try {
         await accountService.transfer({
            senderId: senderAccount.id,
            receiverId: receiverAccount.id,
            amount: -50,
         });
      } catch (error) {
         expect((error as Error).message).toBe("Invalid amount");
      }
   });

   it("Should be able to find an account by id", async () => {
      const account = await accountService.createAccount({
         name: "any_name",
         amount: 100,
      });
      const foundAccount = await accountService.findAccountById(account.id);
      expect(foundAccount).toEqual(account);
   });

   it("Should not be able to find an account by id if it does not exist", async () => {
      const foundAccount = await accountService.findAccountById(999);
      expect(foundAccount).toBeNull();
   });
});
