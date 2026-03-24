const mysql = require("mysql2/promise");
const path = require("path");
const fs = require("fs");

const config = {
  host: "localhost",
  user: "root",
  password: "123",
  multipleStatements: true,
};

async function init() {
  const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
  const conn = await mysql.createConnection(config);
  try {
    await conn.query(sql);
    console.log("Database and users table ready.");
  } finally {
    await conn.end();
  }
}

init().catch((err) => {
  console.error("Init failed:", err.message);
  process.exit(1);
});
