import { db, executeRunQuery, executeGetQuery } from "./db_operation.js";

function promiseWithError() {
  executeRunQuery(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  ).then(() =>
    executeRunQuery(db, "INSERT INTO bookss (title) VALUES (?)", [
      "アーサー王物語",
    ])
      .catch((err) => {
        console.error(err.message);
      })
      .then(() =>
        executeGetQuery(db, "SELECT idd, title FROM books")
          .catch((err) => {
            console.error(err.message);
          })
          .then(() => executeRunQuery(db, "DROP TABLE books")),
      ),
  );
}

promiseWithError();
