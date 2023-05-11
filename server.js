const express = require('express')
const app = express()
const handlebars = require('express-handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', handlebars.create({defaultLayout: 'main', extname: '.handlebars'}).engine);



app.set('view engine', 'handlebars')

const usuarios = []

const paises = [
    {nome: 'Canada'},
    {nome: 'croacia'},
    {nome: 'Camarões'}
  ]
  
  app.get('/', (req, res) => {
    res.json({usuarios: usuarios, paises: paises})
})


app.get('/usuarios', (req, res) => {
    res.render('usuarios', {usuarios: usuarios})
  })
  
app.get('/paises', (req, res)=>{
    res.render('paises', {paises: paises})
  })
  
app.listen(8080, () => {
    console.log('Rodando em http://localhost:8080')
})

app.post('/usuarios', (req, res) => {
    res.send("Nome: " + req.body.nome + "\n Email: " + req.body.email)
    usuarios.push(req.body)
})

app.post('/paises', (req, res) => {
    res.send("Nome: " + req.body.nome)
    paises.push(req.body)
})

app.delete('/usuarios', (req, res) => {
    const index = usuarios.findIndex(user => user.id === req.body.id)
    if (index !== -1) {
        usuarios.splice(index, 1)
        res.json('usuário deletado com sucesso')
    } else {
        res.json('usuário não encontrado')
    }
})