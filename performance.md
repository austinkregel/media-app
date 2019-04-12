With some basic stress testing using the Apache Benchmark suite I was able to get about 1700 requests per second with node 9.6 (the minimum version for fringejs) and with the latest (11.12.0 as of this writing) I was able to get about 2200 r/s.

These tests were conducted 3 times per version of node and the best results are shown. The server used was a DigitalOcean droplet (2GB of Ram, 50GB Of disk, 1vCPU) running Ubuntu 18.04 and using `n` to change the versions of node. Node was the only program I installed and has not been tested with any other server running in the background. (at least, not intentionally.)

### Side note about just express, and then just express and edge.js
To compare the results here on their own it might be worth noting that this very basic express app:
```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```
can average about 3100-3400 r/s. That's just in-memory request sending. Static text with no files or disk access.

Using a modified version of the above app, to add in the edge rendering engine we average between 2000-2400 on Node 11.12.0 
```js
const express = require('express')
const app = express()
const port = 3000
const edge = require('edge.js');
const path = require('path');

edge.registerViews(path.join(__dirname, 'resources/views'))

app.get('/', (req, res) => res.send(edge.render('welcome')))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

I can only imagine as you add less in-memory things and use files from the disk, or access a database you just will get slowly slower results... 

BUT the goal of this project is to give Laravel style structure to node projects, while also being able to handle more R/S. And this is a mission well accomplished.

[See an article by Taylor Otwell regarding popular PHP Framework performance on a droplet set up for PHP instead of node](https://medium.com/@taylorotwell/benchmarking-laravel-symfony-zend-2c01c2b270f8) 
 
# Node 9.6
```
root@nodejs-s-1vcpu-2gb-nyc1-01:~# ab -t 10 -c 10 http://xxx.xxx.xxx.xxx:3000/
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking xxx.xxx.xxx.xxx (be patient)
Completed 5000 requests
Completed 10000 requests
Completed 15000 requests
Finished 17748 requests


Server Software:        
Server Hostname:        xxx.xxx.xxx.xxx
Server Port:            3000

Document Path:          /
Document Length:        730 bytes

Concurrency Level:      10
Time taken for tests:   10.000 seconds
Complete requests:      17748
Failed requests:        0
Total transferred:      16541136 bytes
HTML transferred:       12956040 bytes
Requests per second:    1774.78 [#/sec] (mean)
Time per request:       5.634 [ms] (mean)
Time per request:       0.563 [ms] (mean, across all concurrent requests)
Transfer rate:          1615.33 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       3
Processing:     4    6   2.0      5      29
Waiting:        4    5   1.9      5      29
Total:          4    6   2.0      5      29

Percentage of the requests served within a certain time (ms)
  50%      5
  66%      5
  75%      6
  80%      6
  90%      7
  95%      9
  98%     12
  99%     14
 100%     29 (longest request)
```

# Node v10.15.3
```
root@nodejs-s-1vcpu-2gb-nyc1-01:~# ab -t 10 -c 10 http://xxx.xxx.xxx.xxx:3000/
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking xxx.xxx.xxx.xxx (be patient)
Completed 5000 requests
Completed 10000 requests
Completed 15000 requests
Completed 20000 requests
Finished 20340 requests


Server Software:        
Server Hostname:        xxx.xxx.xxx.xxx
Server Port:            3000

Document Path:          /
Document Length:        730 bytes

Concurrency Level:      10
Time taken for tests:   10.000 seconds
Complete requests:      20340
Failed requests:        0
Total transferred:      18956880 bytes
HTML transferred:       14848200 bytes
Requests per second:    2033.99 [#/sec] (mean)
Time per request:       4.916 [ms] (mean)
Time per request:       0.492 [ms] (mean, across all concurrent requests)
Transfer rate:          1851.25 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       3
Processing:     2    5   1.7      4      24
Waiting:        0    3   1.5      3      23
Total:          4    5   1.7      4      24

Percentage of the requests served within a certain time (ms)
  50%      4
  66%      5
  75%      5
  80%      5
  90%      6
  95%      8
  98%     11
  99%     13
 100%     24 (longest request)
```

# Node 11.12.0
``` 
root@nodejs-s-1vcpu-2gb-nyc1-01:~# ab -t 10 -c 10 http://xxx.xxx.xxx.xxx:3000/
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking xxx.xxx.xxx.xxx (be patient)
Completed 5000 requests
Completed 10000 requests
Completed 15000 requests
Completed 20000 requests
Completed 25000 requests
Finished 25191 requests


Server Software:        
Server Hostname:        xxx.xxx.xxx.xxx
Server Port:            3000

Document Path:          /
Document Length:        730 bytes

Concurrency Level:      10
Time taken for tests:   10.003 seconds
Complete requests:      25191
Failed requests:        0
Total transferred:      23486400 bytes
HTML transferred:       18396000 bytes
Requests per second:    2518.46 [#/sec] (mean)
Time per request:       3.971 [ms] (mean)
Time per request:       0.397 [ms] (mean, across all concurrent requests)
Transfer rate:          2293.01 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       3
Processing:     1    4   0.5      4      12
Waiting:        0    2   0.5      2      11
Total:          3    4   0.5      4      12

Percentage of the requests served within a certain time (ms)
  50%      4
  66%      4
  75%      4
  80%      4
  90%      4
  95%      5
  98%      5
  99%      6
 100%     12 (longest request)
```