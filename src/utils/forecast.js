const request = require('request')
const weather_api_key = '030699870e7a97e519de3492315afdd1'



const forecast = (lat, lng, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${lat},${lng}`
    
    request({ url: url, json:true }, (error, {body} = {}) =>{
        if(error){
            callback('There is an Error',undefined)
        }else if(body.error){
            callback(body.error.info,undefined)
        }else{
            const weather_description = body.current.weather_descriptions[0]
            const temp = body.current.temperature
            const feelsLike = body.current.feelslike
            const isDay = body.current.is_day
            callback(undefined,`weather description is: ${weather_description}, It is currently ${temp} degrees out, But it feels like  ${feelsLike} degrees out
            ${isDay}`)
            
        }
})
}

module.exports = forecast