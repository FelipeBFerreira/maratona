const express = require("express");
const server = express();
const routes = require("./routes");

/*Aula 3 jakelyne*/ 
const path = require("path");

server.set('view engine' , 'ejs' , );

/*Aula 3 jakelyne*/ 
server.set('views' , path.join(__dirname, 'views'))

server.use(express.static("public"));

//user o req.body
server.use(express.urlencoded({extended: true}));


server.use(routes);
 
server.listen(3000, () => console.log('RODANDO'));