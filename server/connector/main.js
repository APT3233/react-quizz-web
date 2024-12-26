"use strict";
// libs
import mysql from "mysql2";
import core from "../core.js";

const pool = mysql.createPool({
  host: core.database.host,
  user: core.database.user,
  password: core.database.pwd,
  database: core.database.db,
  charset: "UTF8_GENERAL_CI",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
});

const pool_getConnection = function (err, conn) {
  if (err) return this.reject(err);

  conn
    .promise()
    .query(this.query, this.values)
    .then(
      (rs) => this.resolve(rs[0]),
      (err) => {
        console.error("\nERROR Sql query error: ~~~~~~~");
        console.error(err);
        if (err.sql) {
          console.error("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          console.error(err.sql);
        }
        console.error("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

        this.reject(err);
      }
    )
    .finally(() => conn.release());
};

const queryPromiseExecutor = function (resolve, reject) {
  pool.getConnection(
    pool_getConnection.bind({
      query: this.query,
      values: this.values,
      resolve: resolve,
      reject: reject,
    })
  );
};

process.on("SIGINT", () => {
  console.log("Received SIGINT. Closing database connections...");

  pool.end((err) => {
    if (err) {
      console.error("Error while closing the database connection:", err);
    } else {
      console.log("Database connections closed gracefully.");
    }
    process.exit();
  });
});

const apt = {
  query: (query, values = []) =>
    new Promise((resolve, reject) => {
      queryPromiseExecutor.bind({ query, values, resolve, reject })(
        resolve,
        reject
      );
    }),
};

export default apt;
