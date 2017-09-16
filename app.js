const express = require('express'),
      hbs     = require('hbs'),
      fs      = require('fs'),
      app     = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('year', () => new Date().getFullYear());

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log(err);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    header: 'Landing Page',
    message: 'Welcome to my landing page.'
  });
});

app.listen(3000, () => {
  console.log('Server started successfully!');
});