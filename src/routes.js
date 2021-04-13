const express = require('express');
const routes = express.Router();

const ProfileController = require('./controllers/ProfileController')
const DashboardController = require('./controllers/DashboardController');
const JobController = require('./controllers/JobController');
const AutenticationController = require('./controllers/AutenticationController');

/**Modified for structure login with authentication  page  */

routes.get('/login', AutenticationController.signup, )
routes.post('/login', AutenticationController.Login, )

routes.get('/', DashboardController.index);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);
routes.get('/profile', ProfileController.index );
routes.post('/profile', ProfileController.update);

module.exports = routes;


