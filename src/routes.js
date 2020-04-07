const express = require('express');

const Router = express.Router();

require('./routes/routesCategory')(Router);
require('./routes/rotuesBook')(Router);
require('./routes/routesUser')(Router);
require('./routes/routesAuth')(Router);
require('./routes/routesCapter')(Router);
require('./routes/routesAuthor')(Router);
require('./routes/routesArtists')(Router);

module.exports = Router;
