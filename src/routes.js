const express = require('express');
const routes = express.Router();


routes.get('/', (request, response) => {

    console.log('Entrei no Index');

    return response.sendFile(__dirname + '/views/index.html');

});

module.exports = routes;