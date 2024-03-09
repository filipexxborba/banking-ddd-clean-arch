create type transaction_status as enum (
  'SCHEDULED',
  'COMPLETED',
  'NOT_AUTHORIZED',
  'CANCELED'
);