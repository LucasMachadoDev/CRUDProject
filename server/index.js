const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'crudgames'
});

app.use(cors());
app.use(express.json());

/* app.get('/', (req, res) => {
    db.query("INSERT INTO `tb_games` (name, cost, category) VALUES ('Metroid Dread', '60.00', 'Action/Adventure')", (err, result) => {
        if(result) {
            console.log('Metroid Dread has being add to database!');
            res.json({msg:'Metroid Dread has being add to database!'})
        } else {
            console.log(err);
        }
    });
}) */

app.get('/getCards', (req, res) => {
    db.query("SELECT * FROM `tb_games`", (err, result) => {
        if(result) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
})

app.post('/register', (req, res) => {
    const {name, cost, category} = req.body;
    db.query("INSERT INTO `tb_games` (name, cost, category) VALUES (?,?,?)", [name, cost, category], (err, result) => {
        if(result) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
})

app.post('/search', (req, res) => {
    const {name, cost, category} = req.body;

    db.query("SELECT * FROM `tb_games` WHERE `name` = ? AND `cost` = ? AND `category` = ?", [name, cost, category], (err, result) => {
        if(err) res.send(err);
        res.send(result);
    });
})

app.put('/edit', (req, res) => {
    const {id, name, cost, category} = req.body;
    db.query("UPDATE `tb_games` SET `name` = ?, `cost` = ?, `category` = ? WHERE `id` = ?", 
        [name, cost, category, id],
        (err, result) => {
            if(err) {
                console.log(err)
            } else {
                res.send(result);
            }
        }
    )
})

app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;

    db.query("DELETE FROM `tb_games` WHERE `id` = ?", [id], (err, result) => {
        if(err)
            console.log(err);
        else 
            res.send(result)
    })
})

app.listen(5000, () => {
    console.log('Up & running');
})