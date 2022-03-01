export default {
    DB_HOST: "mysqldb",
    DB_USER: process.env.MYSQLDB_USER!,
    DB_PASSWORD: process.env.MYSQLDB_PASSWORD!,
    DB_DATABASE: process.env.MYSQLDB_DATABASE!,
    DB_PORT: 3306,
};
