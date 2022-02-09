const Sequelize = require("sequelize");
// set up sequelize to point to  postgres database
module.exports = new Sequelize(
  "dd416vb70647hn",
  "hddvogcdgroxmz",
  "149ef4651c6c4876f624d7c1c580fb76fa1895692ef5d092df193dc721207be8",
  {
    host: "ec2-52-0-93-3.compute-1.amazonaws.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
  }
);
