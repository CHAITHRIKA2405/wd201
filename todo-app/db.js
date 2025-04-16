const { Client } = require('pg');

const client = new Client({
  host: '127.0.0.1',
  port: 5432,  // Default PostgreSQL port
  user: 'postgres',
  password: 'postgres',  // Change this if needed
  database: 'wd-todo-dev',  // Your database name
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch(err => {
    console.error('Connection error', err.stack);
  });

// Example query
client.query('SELECT * FROM todos')
  .then(res => {
    console.log(res.rows);
  })
  .catch(err => {
    console.error('Error executing query', err.stack);
  })
  .finally(() => client.end());
