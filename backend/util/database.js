import { Sequelize } from "sequelize";

// Use the external URL for connection
const sequelize = new Sequelize(
  'angbookkeeping_db', // Database name
  'angbookkeeping_db_user', // Username
  '3hNT8qPOfrOg6WuQVEpkjJw8Tj5Nn2NA', // Password
  {
    host: 'dpg-cpamtjm3e1ms739s2eh0-a.singapore-postgres.render.com', // Hostname
    port: 5432, // Port
    dialect: 'postgres', // Dialect
    dialectOptions: {
      connectTimeout: 10000,
    },
  },
);

export default sequelize;
