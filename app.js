
const p = require('path')
const fs = require('fs')
const express = require('express');
const { urlencoded } = require('body-parser');
const app = express();


const dataFilePath = p.join(__dirname,'data.json')
const dataFile = fs.readFileSync(dataFilePath)
const dataArray = JSON.parse(dataFile);

 

app.set('templates', p.join(__dirname,'templates'))

// telling express about the view engine
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(urlencoded({extended:false}))

app.get('/', (req , res) => {

    res.render('idx')
     
})
app.get('/abc',(req,res)=>{
    res.send('success')
})

app.post('/abc',(req,res)=>{
    
    dataArray.push({'name':req.body.name,'age':req.body.age})
    fs.writeFileSync(dataFilePath,JSON.stringify(dataArray))
    res.redirect('/thumbsup')

}) 
app.get('/thumbsup', (req , res) => {
    res.render('success')
})

app.get('/people',(req,res)=>{

    res.render('display',{howManyPpl:dataArray.length,
    people:dataArray})
    
})

const PORT = 8000
app.listen(PORT,()=>{
    console.log('server is running on port ' + PORT);
})