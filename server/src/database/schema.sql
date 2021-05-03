CREATE DATABASE infomarket;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS address (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  street VARCHAR NOT NULL,
  number VARCHAR,
  city VARCHAR,
  state VARCHAR,
  zip_code VARCHAR UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  address_id UUID,
  FOREIGN KEY(address_id) REFERENCES address(id)
);
