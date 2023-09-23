-- Migration number: 0000 	 2023-09-23T11:37:08.996Z

CREATE TABLE IF NOT EXISTS users (
  id integer PRIMARY KEY AUTOINCREMENT,
  username text NOT NULL,
  password text NOT NULL,
  admin BIT NOT NULL DEFAULT 0,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);