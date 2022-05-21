const express = require("express");
let app = express();
const bodyParser=require("body-parser");
const path = require('path');
const Jimp =require('jimp');
const fs =require('fs');
const { Console } = require("console");



app.use(express.static(path.join(__dirname, '/frontend/public')))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));


let value;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/frontend/index.html'));
     
  });


app.post('/', async function(req, res) {
 

  let img_64=req.body.dataToProcess;
  
  // mapping of Component labels
  const labels = [
    'Resistor',
    'Capacitor',
    'Current_Font'
  ];
   
  const imageWidth = 28;
  const imageHeight = 28;
  const imageChannels = 1;
  
  //convert base64 to png
  var fs = require('fs');
  var path = require('path');

 async function base64ToPNG(data) {
  data = data.replace(/data:image\/jpeg;base64,/, '');


  fs.writeFile(path.join(__dirname, '/image.png'), data, 'base64', function(err) {
    if (err) throw err;
  });
 

}

module.exports = base64ToPNG;



  // Convert image to array of normalized pixel values
  async function toPixelData() {
    

    const pixeldata = [];
  const forjimp=path.join(__dirname, '/image.png');
  try {
  const image = await Jimp.read(forjimp);

  
   await image
      .resize(imageWidth, imageHeight)
      .greyscale()
      //.invert()
      .scan(0, 0, imageWidth, imageHeight, (x, y, idx) => {
        let v = image.bitmap.data[idx + 0];
        pixeldata.push(v / 255);
      });
    } catch (error) {
      const image = await Jimp.read(forjimp);

  
   await image
      .resize(imageWidth, imageHeight)
      .greyscale()
      //.invert()
      .scan(0, 0, imageWidth, imageHeight, (x, y, idx) => {
        let v = image.bitmap.data[idx + 0];
        pixeldata.push(v / 255);
      });
  }

    return pixeldata;
  };



async function test() {

  base64ToPNG(img_64);
  value = await toPixelData();

 // data = value;
  return value;

}
const testing= await test ();


      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(testing));
      res.status(200).end();
     


});

app.listen(8081, function() {
    console.log("Listening on port 8081");
});