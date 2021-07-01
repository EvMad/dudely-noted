const notesData = require('/notesdata');

module.exports = (app) => {

    app.get('/notesData', (req, res) => res.json(notesData));
}

app.post('/notesData', (req,res) => {

notesData.push(req.body);
res.json(true);

})