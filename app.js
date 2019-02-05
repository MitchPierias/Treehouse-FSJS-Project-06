// Modules
const express = require('express');
const app = express();
const Routes = require('./routes/index');
const data = require('./data.json');

/**
 * SETUP
 */

app.set('view engine', 'pug');

/**
 * MIDDLEWARE
 */

app.use(express.static('public'));

app.use((req, res, next) => {
    // Load data file into locals
    res.locals = data; // Overriding as inital state
    next();
});

/**
 * ROUTES
 */

app.use('/', Routes.home);

app.use('/about', Routes.about);

app.use('/projects?', Routes.project);

app.use(Routes.fallback);

app.use((err, req, res, next) => {
    res.status(500)
    res.render('error', { error: err })
});

app.listen(8000, () => console.log("App listening on port 8000"));