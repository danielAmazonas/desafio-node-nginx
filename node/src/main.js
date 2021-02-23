import { createConnection } from 'mysql';
import express from 'express';
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};
const connection = createConnection(config);

let results;
connection.query(`SELECT * FROM people;`, async (err, res) => {
  if (err) throw err;
  results = JSON.parse(JSON.stringify(res));
  console.log(results);
  return results;
});
connection.end();

app.get('/', (_, res) => {
  let html = '<h1>Full Cycle Rocks!</h1>';
  results.map((data) => {
    html += `<p>ID: ${data.id} - ${data.name}</p>`;
  });
  res.send(html);
});

app.listen(port, () => {
  console.log('=====================');
  console.log('Rodando na porta ' + port);
  console.log('=====================');
});
