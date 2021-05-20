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

  // Se busca un artículo por su código de barras.
  return db.collection<Article>('articles').findOne({
    barcode: 5901234123457,
  });
}).then((result) => {
  console.log('The article has been found:');
  console.log(result);
}).catch((error) => {
  console.log(error);
});
