//Lorsque le front-end envoie une requête vers le serveur (fetch..etc), toutes les reqûetes passeront par ici

// Importer le package HTTP de Node.js pour avoir les outils créer le serveur
const http = require('http');

// Importer le package pour utiliser les variables d'environement
const dotenv = require("dotenv");

const result = dotenv.config();

// Importer l'application app.js
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// paramétrage du port avec la méthode set de Express
const port = normalizePort(process.env.PORT || '3000');
app.set('port', process.env.PORT);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Méthode creatServer() prend en aurgment 
// la fonction qui sera appelé à chaque requête reçu par le serveur
// les fonctions seront dans app.js
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// le serveur écoute les requêtes sur le port
server.listen(process.env.PORT);