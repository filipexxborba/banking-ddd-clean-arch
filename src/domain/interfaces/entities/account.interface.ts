export interface AccountEntity {
   getId(): number;
   getName(): string;
   getAmount(): number;
   debit(amount: number): void;
   credit(amount: number): void;
}
