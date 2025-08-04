import { db, executeRunQuery, executeGetQuery } from "./db_operation.js";

executeRunQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
)
  .then(() =>
    executeRunQuery(db, "INSERT INTO books (title) VALUES (?)", [
      "アーサー王物語",
    ]),
  )
  .then((result) => {
    console.log(result.lastID);
    return executeGetQuery(db, "SELECT id, title FROM books");
  })
  .then((row) => {
    console.log(`${row.id} ${row.title}`);
    return executeRunQuery(db, "DROP TABLE books");
  });
