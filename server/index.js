const express = require("express"); //biblioteca express
const app = express(); //executando o express
const mysql = require("mysql");
const cors = require("cors"); //para evitar erros na junção do backend com o frontend

//conexão com o db
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crudgames",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req,res)=>{
    const {name} = req.body;
    const {cost} = req.body;
    const {category} = req.body;
    
    let SQL = "INSERT INTO games (name, cost, category) VALUES (?,?,?)";

    db.query(SQL,[name, cost, category],(err, result) => {
        console.log(err);
    });
});

//método get, para pegar valores
//primeiro parâmetro é a url, e após, duas funções, o request e o result(req:todo valor que entra, res:todo valor que sai)
// app.get('/',(req,res) => {
//     res.send("hello word");
// });

//abrir o browser na porta 3001, onde irá mostrar que está ou não puxando valores
app.listen(3001, ()=>{
    console.log("rodando servidor");
});