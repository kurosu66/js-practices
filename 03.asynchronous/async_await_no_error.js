import { db, executeRunQuery, executeGetQuery } from "./db_operation.js";

await executeRunQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);
const result = await executeRunQuery(
  db,
  "INSERT INTO books (title) VALUES (?)",
  ["アーサー王物語"],
);
console.log(result.lastID);
const row = await executeGetQuery(db, "SELECT id, title FROM books");
console.log(`${row.id} ${row.title}`);
await executeRunQuery(db, "DROP TABLE books");
