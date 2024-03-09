alter table account_new enable row level security;

alter table transaction_new enable row level security;

CREATE POLICY "Enable insert for authenticated and anon api users only" ON "public"."Accounts"
AS PERMISSIVE FOR ALL
TO authenticated, anon
USING (true)
WITH CHECK (true)

CREATE POLICY "Enable insert for authenticated and anon api users only" ON "public"."Transactions"
AS PERMISSIVE FOR ALL
TO authenticated, anon
USING (true)
WITH CHECK (true)