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

  // Se eliminan artículos de la colección articles.
  return db.collection<Article>('articles').deleteMany({
    barcode: 5901234123457,
  });
}).then((result) => {
  if (result.deletedCount == 1) {
    console.log('\n1 article has been deleted.\n');
  } else {
    console.log('\n' + result.deletedCount + ' articles have been deleted.\n');
  }
}).catch((error) => {
  console.log(error);
});
