var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const circuitExample = require('../static/circuit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send', (req, res) =>{
  async function getData(circuit) {
    try {
       let res = await axios({
            url: 'https://urisolve.pt/app/circuit/load',
            method: 'post',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
              'req': circuit
            }
        })
        if(res.status == 200){
            // test 200 status
            console.log(res.status)
        }
        return res.data;
    }
    catch (err) {
        console.error(err);
    }
}

const circuit = circuitExample();

getData(circuit)
  .then(url => {
    if(url!="null"){
      console.log("URL: " + url);
      res.render('goto', { title: 'U=RIsolve', circuit: url});
    }
  })
});

module.exports = router;
