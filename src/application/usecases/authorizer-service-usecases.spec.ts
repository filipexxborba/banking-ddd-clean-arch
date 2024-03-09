import { ExternalAuthorizer } from "../../domain/entities/external-authorizer.entity";
import { AuthorizerService } from "../services/authorizer.service";
import { LocalAuthorizer } from "../../../tests/local-authorizer";

describe("Authorizer Service Use Case", () => {
   let authorizerService: AuthorizerService;
   let externalAuthorizer: ExternalAuthorizer;

   beforeEach(() => {
      externalAuthorizer = new LocalAuthorizer();
      authorizerService = new AuthorizerService(externalAuthorizer);
   });

   it("Should be able to authorize a transaction", async () => {
      const isAuthorized = await authorizerService.authorize(1, 2, 100);
      expect(isAuthorized).toBe(true);
   });

   it("Should not be able to authorize a transaction with same senderId and receiverId", async () => {
      const isAuthorized = await authorizerService.authorize(1, 1, 1000);
      expect(isAuthorized).toBe(false);
   });

   it("Should not be able to authorize a transaction with amount less than or equal to 0", async () => {
      const isAuthorized = await authorizerService.authorize(1, 2, 0);
      expect(isAuthorized).toBe(false);
   });
});
