import { LocalAuthorizer } from "../../../tests/local-authorizer";

describe("Authorizer domain usecases", () => {
   it("Should be able to authorize a transaction", async () => {
      const sut = new LocalAuthorizer();
      const authorized = await sut.authorize(1, 2, 100);
      expect(authorized).toBe(true);
   });

   it("Should not be able to authorize a transaction to the same account", async () => {
      const sut = new LocalAuthorizer();
      const authorized = await sut.authorize(1, 1, 100);
      expect(authorized).toBe(false);
   });

   it("Should not be able to authorize a transaction with invalid amount", async () => {
      const sut = new LocalAuthorizer();
      const authorized = await sut.authorize(1, 2, 0);
      expect(authorized).toBe(false);
   });
});
