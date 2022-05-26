const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


////////////////////////////////////////////////////////////////

const app = express();
const port = 3000;

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