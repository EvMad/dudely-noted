const path = require('path');

module.exports = (app) => {

    app.get('/index', (req,res) => {
        res.sendFile(path.join(__dirname,'./public/index.html'));
    });

    app.get('/notes', (req,res) => {
        res.sendFile(path.join(__dirname,'./public/notes.html'));
    });


}