import {MongoClient} from 'mongodb';

// URL de conexión al servidor de la base de datos.
const dbURL = 'mongodb://127.0.0.1:27017';

// Nombre de la base de datos.
const dbName = 'dsi-assessment';

// Interfaz que modela la información que tiene que almacenar un artículo.
interface Article {
  description: string,
  stock: number,
  pvp: number,
  obsolete: boolean,
  barcode: number
}

// Se realiza la conexión al servidor de MongoDB.
MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);

  // Se inserta un artículo en la colección articles.
  return db.collection<Article>('articles').insertOne({
    description: 'Feed of AFFINITY LIBRA brand for adult dogs with chicken as the main ingredient',
    stock: 10,
    pvp: 24.99,
    obsolete: false,
    barcode: 5901234123457,
  });
}).then((result) => {
  console.log('The following article has been added:');
  console.log(result.ops);
}).catch((error) => {
  console.log(error);
});
