import { AccountService } from "../../../application/services/account.service";

export class FindAccountByIdUseCase {
   constructor(private readonly accountService: AccountService) {}

   async execute(id: number) {
      return await this.accountService.findAccountById(id);
   }
}
