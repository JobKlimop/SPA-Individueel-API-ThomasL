const app = require('./app');
const config = require('./config/env/env');

app.listen(config.env.webPort, '0.0.0.0', () => {
    console.log('Running on port ' + config.env.webPort);
});

app.listen(config.env.driver, () => {
    console.log('Neo4J is running ' + config.env.driver);
});