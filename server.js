
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);



const noteData = require("./db/db.json");

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"));
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,"./public/notes.html"));
});

// app.use( (req,res) => {
//     res.sendFile(path.join(__dirname,'./public/index.html'));
// });


app.get('/api/notes/', (req,res) => {
    readFileAsync('./db/db.json', 'utf8').then(data => {
        const parsedData = JSON.parse(data);
        res.json(parsedData);
        res.end();
    });
});


app.post('/api/notes', (req,res) => {
    const {title, text} = req.body;
    console.log({title,text});    const newNote = {title, text};
    noteData.push(newNote);
    res.json(noteData);
    writeFileAsync('./db/db.json', JSON.stringify(noteData), function (err) {
        res.end();
    });

});

// app.get('/api/notes/', (req,res) => {
//     fs.readFileAsync(path.join(__dirname,'./db/db.json', (err,data) => {
//         if (err) throw err;
//         req.json(JSON.parse(data));
//     })
// )});


// app.post('/api/notes/', (req,res) => {
//     let newNote = req.body;
//     fs.readFileAsync('.db/db.json',(err,data) => {
//         if (err) throw err;
//         let notes = JSON.parse(data);
//         noteData.push(newNote);
//         res.json(noteData);
//         fs.writeFileAsync('./db/db.json', JSON.stringify(noteData),(err) => err? console.err(err) :console.log('note added!') 
           
//         );
//     })

//     res.end();
// });





// require('./apiRoutes')(app);
// require('./htmlRoutes')(app);



app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});