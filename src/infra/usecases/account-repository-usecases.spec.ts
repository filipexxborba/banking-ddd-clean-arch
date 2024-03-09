import { Account } from "../../domain/entities/account.entity";
import { InMemoryAccountsRepository } from "../../../tests/in-memory-accounts-repository";

describe("Account repository usecases", () => {
   let inMemoryAccountsRepository: InMemoryAccountsRepository;

   beforeEach(() => {
      inMemoryAccountsRepository = new InMemoryAccountsRepository();
   });

   it("Should be able to create a new account", async () => {
      const newAccount = new Account("any_name", 100);
      const sut = await inMemoryAccountsRepository.createAccount(newAccount);
      expect(inMemoryAccountsRepository.accounts.length).toBe(1);
      expect(sut.getId()).toBe(1);
   });

   it("Should be able to create a new account with a custom id", async () => {
      const newAccount = new Account("any_name", 100, 2);
      const sut = await inMemoryAccountsRepository.createAccount(newAccount);
      expect(inMemoryAccountsRepository.accounts.length).toBe(1);
      expect(sut.getId()).toBe(2);
   });

   it("Should be able to find an account by id", () => {
      const newAccount = new Account("any_name", 100);
      inMemoryAccountsRepository.createAccount(newAccount);
      const sut = inMemoryAccountsRepository.findAccountById(1);
      expect(sut).resolves.toEqual(inMemoryAccountsRepository.accounts[0]);
   });

   it("Should be able to find an account by id and return null if not found", () => {
      const sut = inMemoryAccountsRepository.findAccountById(1);
      expect(sut).resolves.toBeNull();
   });

   it("Should be able to credit an account", async () => {
      const newAccount = new Account("any_name", 100);
      inMemoryAccountsRepository.createAccount(newAccount);
      const account = inMemoryAccountsRepository.accounts[0];
      account.credit(100);
      const sut = await inMemoryAccountsRepository.saveAccount(account);
      expect(sut.getAmount()).toBe(200);
   });

   it("Should be able to debit an account", async () => {
      const newAccount = new Account("any_name", 100);
      inMemoryAccountsRepository.createAccount(newAccount);
      const account = inMemoryAccountsRepository.accounts[0];
      account.debit(50);
      const sut = await inMemoryAccountsRepository.saveAccount(account);
      expect(sut.getAmount()).toBe(50);
   });

   it("Should not be able to debit an account with insufficient funds", async () => {
      const newAccount = new Account("any_name", 100);
      inMemoryAccountsRepository.createAccount(newAccount);
      const account = inMemoryAccountsRepository.accounts[0];
      expect(() => account.debit(200)).toThrow(new Error("Insufficient funds"));
   });

   it("Should not be able to debit an account with invalid amount", async () => {
      const newAccount = new Account("any_name", 100);
      inMemoryAccountsRepository.createAccount(newAccount);
      const account = inMemoryAccountsRepository.accounts[0];
      expect(() => account.debit(-100)).toThrow(new Error("Invalid amount"));
   });

   it("Should not be able to credit an account with invalid amount", async () => {
      const newAccount = new Account("any_name", 100);
      inMemoryAccountsRepository.createAccount(newAccount);
      const account = inMemoryAccountsRepository.accounts[0];
      expect(() => account.credit(-100)).toThrow(new Error("Invalid amount"));
   });
});
