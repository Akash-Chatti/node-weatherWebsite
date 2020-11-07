const request= require('request')

var lat=""
var long=""
var loc=""
var location=(place,country,callback)=>{
var cordUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+place+'_'+country+'.json?access_token=pk.eyJ1IjoiaXJhdmFhIiwiYSI6ImNrZzUwaDM2ZjA2Z2MyeXIwa2NqcGlvZnoifQ.xUgGiVVqmDbecHd5DMQXkA'
//debugger
loc=place+'_'+country
request({url:cordUrl,json:true},(error,{body}={})=>{
    if(error)
    {
    callback(error.code)
    }
    else if(!body){
      callback('Could not find the location.')
    }
    else
    {
 lat= body.features[0].center[1]
   long=body.features[0].center[0]
   createLoc(lat,long,loc,(lat,long,loc)=>{
    var url="https://api.climacell.co/v3/weather/realtime?lat="+lat+"&lon="+long+"&location_id="+loc+"&unit_system=si&fields=temp%2Cweather_code&apikey=vBEgypY1hUV5Dv4g5N3AnIPGFhrRHSIQ"
    request({url:url,json:true},(error,response)=>{
        var forec={temp:response.body.temp.value+" "+ response.body.temp.units,
        sky:response.body.weather_code.value,
      loc
      }
        callback(undefined,forec)
    })
    })
   //Forecast(lat,long,loc)
   //console.log(lat, long)
    }
})
// this won't work since request is async and lat long will 
//not be assigned as the main thread finishes before async thread
 //console.log(lat+' '+long+' '+loc)
 // Forecast()
}

/// Callback methods are the methods which will be called by the async method 
var createLoc=(lat,long,loc, callback)=>{
    const options = {
        method: 'POST',
        url: 'https://api.climacell.co/v3/locations',
        qs: {apikey: 'vBEgypY1hUV5Dv4g5N3AnIPGFhrRHSIQ'},
        headers: {'content-type': 'application/json'},
        body: {point: {lat: lat, lon: long}, name: loc},
        json: true
      };
      
      request(options, function (error, response,{message}) //body)
       {
        if (message!='Location with this name already exists.'&&error) 
        console.log(message);
      });
callback(lat,long,loc)
}
// var Forecast=(lat,long,loc)=>{
// var url="https://api.climacell.co/v3/weather/realtime?lat="+lat+"&lon="+long+"&location_id="+loc+"&unit_system=si&fields=temp%2Cweather_code&apikey=vBEgypY1hUV5Dv4g5N3AnIPGFhrRHSIQ"
// request({url:url,json:true},(error,response)=>{
//     // var data= JSON.parse(response.body)
//     // console.log(data.temp.value+" "+ data.temp.units)
//     console.log(response.body.temp.value+" "+ response.body.temp.units)
//     console.log(response.body.weather_code.value)
// })
// }

module.exports={showWeather:location}
