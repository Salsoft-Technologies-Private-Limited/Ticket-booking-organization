const googleBaseUrl =
    'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
const geoBase = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
const geoBaseLatLng =
    'https://maps.googleapis.com/maps/api/geocode/json?place_id=';
const geo_Base = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
// export const googleApiKey = 'AIzaSyCL2XFs2hqb_aQFKtcUVf9xyhdxLBSFdp0'; //previous key
export const googleApiKey = 'AIzaSyBXqV9bSEkfm5Wh7OQMj37V-n3F4AiyE40'; //latest key
const geocodeUrl =
    'http://dev61.onlinetestingserver.com/forward-geo-code?address=';

export const getAddressByLatLong = coordinate => {
    let latlng = coordinate.latitude + ',' + coordinate.longitude;
    let url = `${geo_Base}${latlng}&sensor=false&key=${googleApiKey}`;
    return async () => {
        try {
            const response = await fetch(url);
            const jsonResponse = await response.json();
            return Promise.resolve(jsonResponse);
        } catch (error) {
            return Promise.reject(error);
        }
    };
};
export const getLatlngByAddress = id => {
    let url = `${geoBaseLatLng}${id}&key=${googleApiKey}`;
    return async () => {
        try {
            const response = await fetch(url);
            const jsonResponse = await response.json();
            console.log('getLatLongByAddress: ', jsonResponse);
            return Promise.resolve(jsonResponse);
        } catch (error) {
            return Promise.reject(error);
        }
    };
};
export const addressPrediction = word => {
    let url =
        googleBaseUrl +
        word +
        '&key=' +
        googleApiKey +
        '&sessiontoken=' +
        AddressApi.getSessionToken();
    return async () => {
        try {
            const response = await fetch(url);
            const jsonResponse = await response.json();
            console.log('addressPrediction : ', jsonResponse);
            return Promise.resolve(jsonResponse);
        } catch (error) {
            return Promise.reject(error);
        }
    };
};
export const AddressApi = {
    getAddressByLatlng: (data, callback) => {
        let latlng = data.lat + ',' + data.lng;
        let full_url =
            geoBase +
            latlng +
            '&sensor=false' +
            '&key=' +
            googleApiKey +
            '&sessiontoken=' +
            AddressApi.getSessionToken();
        fetch(full_url).then(d => {
            d.json().then(data => {
                // console.log('data',data)
                // data[]
                // let re = [];
                if (data.status === 'OK') {
                    // data.result
                    let a = data.results.reverse();
                    // console.log('asd',a)
                    for (var da of a) {
                        // console.log(da)
                        if (da.types.indexOf('country') > -1) {
                            for (var component of da.address_components) {
                                if (component.types.indexOf('country') > -1) {
                                    callback(da);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
            });
            // console.log('d',d)
        });
    },
    getAddressPrediction: (word, callback) => {
        let url =
            googleBaseUrl +
            word +
            '&key=' +
            googleApiKey +
            '&sessiontoken=' +
            AddressApi.getSessionToken();
        fetch(url)
            .then(d => {
                d.json()
                    .then(data => {
                        // console.log('data',data)
                        callback(data);
                    })
                    .catch(() => {
                        // console.log(e)
                    });
            })
            .catch(() => {
                // console.log(e)
            });
    },
    getSessionToken: () => {
        let sessionKey = Math.floor(Math.random() * 10).toString();
        // console.log('sessionKey ',sessionKey)
        return sessionKey;
    },
    getGeoCode: (address, success) => {
        let url = geocodeUrl + address;
        console.log('ttt', url);
        // console.log(url)
        fetch(url).then(d => {
            console.log('fetch result >>', d);
            d.json().then(data => {
                success(data);
                // console.log('add data',data)
            });
        });
    },
    getLatlngByAddress: (id, callback) => { 
        let url = `${geoBaseLatLng}${id}&key=${googleApiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('getLatLongByAddress: ', data);
                callback(data); 
            })
            .catch(error => {
                console.error('Error fetching latlng:', error);
                callback(error); 
            });
    }
};
export default AddressApi;