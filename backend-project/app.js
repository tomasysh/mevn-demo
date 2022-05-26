const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./utils/database');
const authRoutes = require('./routes/auth');

////////////////////////////////////////////////////////////////

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(authRoutes);

database
    // .sync()
	.sync({ force: true }) // 和 db 連線時，強制重設 db
	.then((result) => {
		app.listen(port, () => {
			console.log(`Web Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.log('create web server error: ', err);
	});