const request = require('request');

const geocode = (address, callback) => {
    const uriAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${uriAddress}.json?access_token=pk.eyJ1IjoiYW1zc3dpcGUiLCJhIjoiY2tzcTZleWxkMGE1ZTJubWRyczFzbG9vaSJ9.8FW4SzTNkSO7ZeefQVi6Ng&limit=1`;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback(`Unable to connect to map service!`);
        } else if (!body.features || body.features.length === 0) {
            callback(`Unable to find location. Try another search!`);
        }
        else {
            const locationParams = body.features[0].center;
            const longitude = locationParams[0];
            const latitude = locationParams[1];
            const location = body.features[0].place_name;
            const data = {
                latitude,
                longitude,
                location
            };
            callback(undefined, data);
        }
    });
}

module.exports = geocode;