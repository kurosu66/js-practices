import { db, executeRunQuery, executeGetQuery } from "./db_operation.js";

await executeRunQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);
try {
  await executeRunQuery(db, "INSERT INTO bookss (title) VALUES (?)", [
    "アーサー王物語",
  ]);
} catch (err) {
  console.error(err.message);
}

try {
  await executeGetQuery(db, "SELECT idd, title FROM books");
} catch (err) {
  console.error(err.message);
}
await executeRunQuery(db, "DROP TABLE books");
