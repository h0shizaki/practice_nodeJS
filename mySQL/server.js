const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.send({
        error: false,
        message: "Hello World"

    })
})

//connect to DB
const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejsapi'
});

dbCon.connect();

//get Data

app.get('/books', (req, res) => {
    console.log("Do get...");
    dbCon.query("SELECT * FROM book", (error, results, fields) => {
        if (error) throw error;

        let message = "";
        if (results === undefined || results.length == 0) {
            message = "Book data is empty.";
        } else {
            message = "Success got all book data";
        }

        return res.status(200).send({ error: false, data: results, message: message });
    })
});

//post Data
app.post('/book', (req, res) => {
    console.log("DO post...");
    let name = req.body.name;
    let author = req.body.author;

    if (!name || !author) {
        return res.status(400).send({ error: true, message: "Please add data." });
    } else {
        dbCon.query("INSERT INTO book (name,author) VALUES (?,?)", [name, author], (error, results, fields) => {
            if (error) throw error;
            return res.status(200).send({ error: false, data: results, message: "Added success." })
        });
    }
})

//search Data
app.get('/book/:id', (req, res) => {
    console.log("Do get by id...")
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please enter book id." });
    } else {
        dbCon.query("SELECT * FROM book WHERE id = ?", id, (error, results, fields) => {
            if (error) throw error;
            message = "";

            if (results === undefined || results.length == 0) {
                message = "Book not found.";
            } else {
                message = "Success got book data.";
            }

            return res.status(200).send({ error: false, data: results[0], message: message });

        })
    }
})

//update data
app.put('/book', (req, res) => {
    console.log("Do put...");

    let id = req.body.id;
    let name = req.body.name;
    let author = req.body.author;

    if (!id || !name || !author) {
        res.status(400).send({ error: true, message: "Please enter data." });
    } else {
        dbCon.query("UPDATE book SET name = ?, author = ? WHERE id = ?", [name, author, id], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results.changedRow === 0) {
                message = "Book not found or data are same.";
            } else {
                message = "Success updated.";
            }

            return res.status(200).send({ error: false, data: results, message: message });
        })
    }
})

//delete data
app.delete('/book' , (req ,res)=>{
    console.log("Do delete...");
    let id = req.body.id;

    if(!id) {
        return res.status(400).send({error:false , message: "Please enter book id."});
    }else{
        dbCon.query("DELETE FROM book WHERE id = ?", id , (error,results,fields)=>{
            if(error) throw error;
            
            message = "";

            if(results.effectedRows === 0){
                message = "Book not found.";
            }else{
                message = "Success deleted."
            }

            return res.status(200).send({error: false, data: results, message: message });

        })
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`RUNNING ON PORT ${PORT}`) });
module.exports = app;