const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'infomarket',
});

client.connect();

// Executar as querys dentro do db
exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
