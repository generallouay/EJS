
const p = require('path')
const fs = require('fs')
const express = require('express');
const { urlencoded } = require('body-parser');
const app = express();


const dataFilePath = p.join(__dirname,'data.json')
const dataFile = fs.readFileSync(dataFilePath)
const dataArray = JSON.parse(dataFile);




// telling express about the view engine
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(urlencoded({extended:false}))

app.get('/', (req , res) => {
    const file = p.join(__dirname, 'templates' , 'idx.html')

    res.sendFile(file)
     
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
    res.send('<h1>success</h1>')
})

app.get('/people',(req,res)=>{
    const filePath = p.join(__dirname,'templates','display.html')
    const file = fs.readFileSync(filePath,'utf-8')
    
})

const PORT = 8000
app.listen(PORT,()=>{
    console.log('server is running on port ' + PORT);
})