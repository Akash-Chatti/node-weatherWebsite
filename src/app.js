const express = require('express')
const path= require('path')
const forecast=require('./GetWeather.js')
const app = express()
const hbs= require('hbs')
const port=process.env.PORT || 3000

//setup handle bars
app.set('view engine','hbs')
//html pages can be rendered/ served back as a static file and use the page name in the url
//ex: localhost://3000/about.html
// this is to setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))
//app.use(express.static(path.join(__dirname,'../public/imgs')))
//setup views locaton
var viewsPath=path.join(__dirname,'../templates/handlebarviews')
app.set('views',viewsPath)
//setup partials
var partialsPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)
var imgPath=path.join(__dirname,'../public/image/logo.jpg')
app.get('/home',(req,res)=>{
res.render('index',{
    text:'Enter your location get weather',
    name:'Akash Chatti',
    title:'Weather'
})
})


app.get('/Weather',(req,res)=>{
    var city=req.query.city
    var country=req.query.country
   
    if(city&&country){
    forecast.showWeather(city,country,(err,weatherInfo)=>{
        if(!err)
        {

            return res.send(weatherInfo)

        }
        else
      return  res.send(err)

})
//{
//     location:'Hyd',
//     Temp:'22 C'
// }
    }
    else
return res.send({error:'city & country values are required'})
})
app.get('/product',(req,res)=>{
if(!req.query.search)
{
    return res.send({error:'Please provide product name'})
}
res.send({products:[]})
})
app.get('',(req,res)=>{

    res.render('index',{
        text:'Weather Home page',
        name:'Akash Chatti',
        title:'Weather'
    })
    
    })
app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help',
        phrase:'Best tip when you are clueless',
        tip:'Turn towards east and join hands',
        name:'Akash Chatti'
    })
})
app.get('/about',(req,res)=>{

    res.render('about',{
        about:'This site is built using Node JS, Express Server, Handle bars and has partials setup',
        name:'Akash Chatti',
        title:'About',
        imgPath
    })
})
//setup 404 pages the order of setting routes is imp if a match is found that will be used
//ex: if '*' is encountered first every thing fall under it and that will be executed
// the specific routes like '/help/*' will not be executed
//2. sub routes 404
app. get('/help/*',(req,res)=>{
    //res.send('Help article not found')
    res.render('PageNotFound',{
        Htitle:'The page you are looking for is not available',
        Htext:'Please visit our Help page for more',
        message:'The Help article was not found',
        name:'Akash Chatti'
    })
}) 
//1. to all 404 i.e, all routes that are not mapped
 app.get('*',(req, res)=>{
    // res.send('You got the wrong address')
    res.render('PageNotFound',{
        Htitle:'The page you are looking for is not available',
        Htext:'Please visit our Help page for more',
        message:'Page not found',
        name:'Akash Chatti'
    })
 })

// app.get('',(req,res)=>{
//     res.send('Index page')
// })
// app.get('/home',(req,res)=>{
// res.send('Welcome Home')

// })

// app.get('/about',(req,res)=>{

//     res.send('<h1>About Me</h1>')
// })


app.listen(port,()=>{

    console.log('Server running on 3000 and has home routing')
})