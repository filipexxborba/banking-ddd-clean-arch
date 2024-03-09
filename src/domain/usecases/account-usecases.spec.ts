import { Account } from "../entities/account.entity";

describe("Account domain usecases", () => {
   it("Should be able to create a new account with zero balance", () => {
      const sut = new Account("any_name");
      expect(sut.getAmount()).toBe(0);
      expect(sut.getId()).toBe(1);
   });

   it("Should be able to create a new account with a positive balance", () => {
      const sut = new Account("any_name", 100);
      expect(sut.getAmount()).toBe(100);
      expect(sut.getId()).toBe(1);
   });

   it("Should be able to create a new account with a custom id", () => {
      const sut = new Account("any_name", 100, 2);
      expect(sut.getAmount()).toBe(100);
      expect(sut.getId()).toBe(2);
   });

   it("Should be able to create a new account with a custom id and zero balance", () => {
      const sut = new Account("any_name", 0, 2);
      expect(sut.getAmount()).toBe(0);
      expect(sut.getId()).toBe(2);
   });

   it("Should be able to debit a valid amount from the account", () => {
      const sut = new Account("any_name", 100);
      sut.debit(50);
      expect(sut.getAmount()).toBe(50);
   });

   it("Should not be able to debit a negative amount from the account", () => {
      const sut = new Account("any_name", 100);
      expect(() => sut.debit(-50)).toThrow(new Error("Invalid amount"));
   });

   it("Should not be able to debit a zero amount from the account", () => {
      const sut = new Account("any_name", 100);
      expect(() => sut.debit(0)).toThrow(new Error("Invalid amount"));
   });

   it("Should not be able to debit an amount greater than the account balance", () => {
      const sut = new Account("any_name", 100);
      expect(() => sut.debit(150)).toThrow(new Error("Insufficient funds"));
   });

   it("Should be able to credit a valid amount to the account", () => {
      const sut = new Account("any_name", 100);
      sut.credit(50);
      expect(sut.getAmount()).toBe(150);
   });

   it("Should not be able to credit a negative amount to the account", () => {
      const sut = new Account("any_name", 100);
      expect(() => sut.credit(-50)).toThrow(new Error("Invalid amount"));
   });

   it("Should not be able to credit a zero amount to the account", () => {
      const sut = new Account("any_name", 100);
      expect(() => sut.credit(0)).toThrow(new Error("Invalid amount"));
   });
});
