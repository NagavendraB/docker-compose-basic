const express = require("express");
const redis = require("redis");

const app = express();
const redisServer = redis.createClient({
  host: 'redis-server',
  port: 6379,
});

redisServer.set('visits', 0);

app.get('/', (req, res) => {
  redisServer.get('visits', (err, visits) => {
    res.send('No of user visits are ' + visits);
    redisServer.set('visits', parseInt(visits) + 1);
  });
});

app.listen(3000, () => {
  console.log('App is listining on port 3000');
});
