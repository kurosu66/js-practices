import { db } from "./db_operation.js";

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["アーサー王物語"],
      function () {
        console.log(this.lastID);
        db.get("SELECT id, title FROM books", (_err, row) => {
          console.log(`${row.id} ${row.title}`);
          db.run("DROP TABLE books");
        });
      },
    );
  },
);
