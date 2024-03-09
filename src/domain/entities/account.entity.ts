import { AccountEntity } from "../interfaces/entities/account.interface";

export class Account implements AccountEntity {
   private id: number = 1;
   private name: string;
   private amount: number = 0;

   constructor(name: string, amount?: number, id?: number) {
      this.name = name;
      if (amount) this.amount = amount;
      if (id) this.id = id;
   }

   getId: () => number = () => this.id;
   getName: () => string = () => this.name;
   getAmount: () => number = () => this.amount;

   debit(amount: number): void {
      if (amount <= 0) {
         throw new Error("Invalid amount");
      }
      if (this.amount < amount) {
         throw new Error("Insufficient funds");
      }
      this.amount -= amount;
   }
   
   credit(amount: number) {
      if (amount <= 0) {
         throw new Error("Invalid amount");
      }
      this.amount += amount;
   }
}
