create table
  Transactions (
    id bigint primary key generated always as identity,
    sender_id bigint references Accounts (id),
    receiver_id bigint references Accounts (id),
    amount double precision not null,
    scheduled_date date,
    created_at timestamp with time zone default current_timestamp,
    status transaction_status
  );