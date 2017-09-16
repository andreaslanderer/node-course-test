const express = require('express'),
      hbs     = require('hbs'),
      fs      = require('fs'),
      app     = express(),
      port    = process.env.PORT || 3000;

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

app.get('/projects', (req, res) => {
  res.render('projects', {
    title: 'Projects',
    header: 'Project Portfolio',
    message: 'This site contains an overview of all my projects.'
  });
});

app.listen(port, () => {
  console.log(`Server successfully started at port ${port}!`);
});
