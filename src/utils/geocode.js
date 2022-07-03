const geocoding_api ='AIzaSyBV7l3CEout9w6Stxhiais3pQ3WbnUxIzE'
const request = require('request')

const geocode = (adress, callback) =>{
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=${geocoding_api}`
    request({url: url, json:true }, (error, {body} = {}) =>{
    if(error){
        callback('there is an error', undefined)
    }else if(body.error_message){
        callback(body.error_message, undefined)
    }else{   
       }
       callback(undefined, {
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng,
        location: body.results[0].address_components[0].short_name
       })
    }) 
}



module.exports = geocode