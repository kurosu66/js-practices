import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["アーサー王物語"],
      function () {
        console.log(this.lastID);
        db.get("SELECT id, title FROM books", (err, row) => {
          console.log(`${row.id} ${row.title}`);
          db.run("DROP TABLE IF EXISTS books");
        });
      },
    );
  },
);
