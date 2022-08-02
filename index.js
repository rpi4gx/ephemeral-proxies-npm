var axios = require('axios')
const EpEnvVar = "EP_RAPIDAPI_KEY"

var EpDefaultOptions = {
    method: '',
    url: '',
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'ephemeral-proxies.p.rapidapi.com'
    }
}

function getOptions(method, url, key) {
    if (key === undefined && process.env[EpEnvVar] && process.env[EpEnvVar].length > 0) {
        key = process.env[EpEnvVar]
    } else {
        throw new Error(`
            Ephemeral Proxies Client Library requires a valid Rapid API Key.
            Visit https://rapidapi.com/rpi4gx/api/ephemeral-proxies to get one for free.
        `)
    }
    let options = EpDefaultOptions
    options.method = method
    options.url = url
    options.headers['X-RapidAPI-Key'] = key
    return options
}

function getServiceStatus(apiKey) {
    return new Promise((resolve, reject) => {
        try {
            let options = getOptions('GET', 'https://ephemeral-proxies.p.rapidapi.com/v1/service_status', apiKey)
            axios.request(options).then(function (response) {
            	resolve(response.data);
            }).catch(function (error) {
            	reject(error);
            });
        } catch(e) {
            reject(e)
        }
    })
}

function getProxy(apiKey) {
    return new Promise((resolve, reject) => {
        try {
            let options = getOptions('GET', 'https://ephemeral-proxies.p.rapidapi.com/v1/proxy', apiKey)
            axios.request(options).then(function (response) {
            	resolve(response.data);
            }).catch(function (error) {
            	reject(error);
            });
        } catch(e) {
            reject(e)
        }
    })
}

function extendProxy(proxyId, apiKey) {
    return new Promise((resolve, reject) => {
        try {
            let options = getOptions('GET', 'https://ephemeral-proxies.p.rapidapi.com/v1/extend_proxy', apiKey)
            options['params'] = {
                id: proxyId
            }
            axios.request(options).then(function (response) {
            	resolve(response.data);
            }).catch(function (error) {
            	reject(error);
            });
        } catch(e) {
            reject(e)
        }
    })
}

exports.getServiceStatus = getServiceStatus;
exports.getProxy = getProxy;
exports.extendProxy = extendProxy;
