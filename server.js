const express = require('express');
const fs = require('fs');
const path = require('path'); // You need to require the 'path' module
const app = express();

app.use(express.json()); // Add '()' to correctly initialize the middleware

// Serve static files
app.use(express.static('public'));

// Send index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/faqs',(req,res) => {
    fs.readFile('faqs.json',(err,data) => {
        if(err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/faqs',(req,res) => {
    const newFaq = req.body;
    fs.readFile('faqs.json',(err,data) => {
        if (err) throw err;
        const faqs = JSON.parse(data);
        faqs.push(newFaq);
        fs.writeFile('faqs.json',JSON.stringify(faqs,null,2),(err) => {
            if(err) throw err;
            res.json(newFaq);
        });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
