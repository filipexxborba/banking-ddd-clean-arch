create table
  Accounts (
    id bigint primary key generated always as identity,
    name text not null,
    amount double precision not null,
    created_at timestamp with time zone default current_timestamp
  );