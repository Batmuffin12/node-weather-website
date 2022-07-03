const path = require('path')
const express = require('express')
const hsb = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define paths for Epress config
const publicFirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/patials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hsb.registerPartials(partialsPath)


//Setup static directory to serve 
app.use(express.static(publicFirectoryPath))


app.get('', (req,res) =>{
    res.render('index',{
        title:'Weather',
        name: 'Ofek bs'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title:'help',
        name: 'Ofek bs',
        help_text:'this is some helpful text'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'about',
        img: './img/image.png',
        name: 'Ofek bs'

    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        res.send({
            error: 'you must provide an address term'
        })
    }
        geocode(req.query.address,(error,{lat,lng,location} = {})=>{
            if(error){
                return res.send({ error })
            }
            forecast(lat,lng, (error,forecastData) =>{
                if(error) return res.send({ error })
                res.send({
                    address:req.query.address,
                    location: location,
                    forecast: forecastData
                })
            })
        })
    }
)

app.get('/products',(req,res) =>{
    if(!req.query.search){
        res.send({
            error: 'you must provide a seaarch term'
        })
    }else{
        res.send({
            products: []
        })
    }
   
})

app.get('/weather', (req,res) =>{
    res.send({
        location: 'Tel aviv',
        description: 'it feels like 19 degrees',
        lat: 32,
        lng: 34
    })
})


app.get('/help/*', (req,res) =>{
    res.render('404',{
        title:'404',
        name: 'Ofek Bs',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'ofek Bs',
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})