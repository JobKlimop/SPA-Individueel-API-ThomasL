const app = require('./app');
const config = require('./config/env/env');

app.listen(config.env.webPort, '0.0.0.0', () => {
    console.log('Running on poert ' + config.env.webPort);
});