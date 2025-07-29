import { db } from "./db_operation.js";

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO bookss (title) VALUES (?)",
      ["アーサー王物語"],
      function (err) {
        if (err) {
          console.error(err.message);
        }
        db.get("SELECT idd, title FROM books", (err) => {
          if (err) {
            console.error(err.message);
          }
          db.run("DROP TABLE books");
        });
      },
    );
  },
);
