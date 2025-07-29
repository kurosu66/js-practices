import { db, executeRunQuery, executeGetQuery } from "./db_operation.js";

function promise_no_error() {
  executeRunQuery(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  ).then(() =>
    executeRunQuery(db, "INSERT INTO books (title) VALUES (?)", [
      "アーサー王物語",
    ])
      .then((result) => {
        console.log(result.lastID);
      })
      .then(() =>
        executeGetQuery(db, "SELECT id, title FROM books")
          .then((row) => {
            console.log(`${row.id} ${row.title}`);
          })
          .then(() => executeRunQuery(db, "DROP TABLE books")),
      ),
  );
}

promise_no_error();
