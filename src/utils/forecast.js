const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e9c9f5347f6d4a8f38a4dfaebc02ddd6&query=${latitude},${longitude}&units=m`;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback(`Unable to connect to weather service!`);
        } else if (body.error) {
            callback(`Unable to find location!`);
        } else {
            const temp = body.current.temperature;
            const feelsLike = body.current.feelslike;
            const description = body.current.weather_descriptions[0];
            callback(undefined, `${description}. It is currently ${temp} degress out. It feels like ${feelsLike} degress out.`);
        }
    });
}

module.exports = forecast;