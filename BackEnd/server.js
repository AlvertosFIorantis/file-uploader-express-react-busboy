const express = require('express');
const fs = require('fs');
const Busboy = require('busboy');
const cors = require("cors");

const app = express();
app.use(cors());



// Upload Endpoint
app.post('/upload', (req, res) => {
  // boro na kano edo ola ta checks gia to an file iparxei an o xrisiosts ta exei kanei ola sosta kai meta na perimeno na do an tha kano save to file
  console.log("File size:" + req.headers['content-length'] / 1024 + "KB");
  var busboy = new Busboy({ headers: req.headers });
  let myFileName;
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      myFileName=filename
      console.log("MineType",mimetype)
      if(mimetype==='application/pdf' || mimetype==='text/plain' || mimetype==='image/png'){
        console.log("Right Format")
        // var saveTo = path.join('.', filename);
      let saveTo = `${__dirname}/uploads/${filename}`
      file.pipe(fs.createWriteStream(saveTo));
      }else{
        busboy.emit('error',new Error('Wrong file type'));
        return
      }
      
    });
    busboy.on('error', function (err) {
    console.error('Error while parsing the form: ', err);
    // edo emfanizete to erro pou exo kai boro na valo next na pao sto mieddlware pou thelo para poli orea doulevei !!!
})
    busboy.on('finish', function() {
      const random_number = Math.random()
      if(random_number<0.5){
        console.log("Removing")
        path=`./${myFileName}`
        fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }

  //file removed
})
      }
      console.log('Upload complete',random_number,myFileName);
      // res.writeHead(200, { 'Connection': 'close' });
      // res.end("That's all folks!");
      res.json({ message:'File was uploaded successfully'});
    });
    return req.pipe(busboy);
});


app.get('/download', function(req, res){
  const file = `${__dirname}/uploads/${filename}`;
  res.download(file); // Set disposition and send it.
});

app.listen(5000, () => console.log('Server Started...'));
