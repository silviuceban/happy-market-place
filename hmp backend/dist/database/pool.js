import pkg from "pg";
var Pool = pkg.Pool;
export var pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "hmp_db",
    user: "postgres",
    password: "polkklop",
});
//# sourceMappingURL=pool.js.map