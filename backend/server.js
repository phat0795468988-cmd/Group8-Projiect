const http = require('http');
const dotenv = require('dotenv');
const app = require('./index');

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});



