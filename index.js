var axios = require('axios')
const EpEnvVar = "EP_RAPIDAPI_KEY"

var EpDefaultOptions = {
    method: '',
    url: '',
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'ephemeral-proxies.p.rapidapi.com'
    },
    params: {}
}

const ProxyType = {
    datacenter: "datacenter",
    residential: "residential"
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

function getServiceStatus(proxyType, apiKey) {
    return new Promise((resolve, reject) => {
        try {
            if (proxyType === undefined) {
                throw new Error('Proxy Type argument is required')
            }
            let options = getOptions('GET', `https://ephemeral-proxies.p.rapidapi.com/v2/${proxyType}/service_status`, apiKey)
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

function getProxy(proxyType, countries, whitelistIp, apiKey) {
    return new Promise((resolve, reject) => {
        try {
            if (proxyType === undefined) {
                throw new Error('Proxy Type argument is required')
            }
            let options = getOptions('GET', `https://ephemeral-proxies.p.rapidapi.com/v2/${proxyType}/proxy`, apiKey)
            if (countries !== undefined && countries && Array.isArray(countries) && countries.length > 0) {
                Object.assign(options.params, {countries: countries.join(",")})
            }
            if (whitelistIp !== undefined && whitelistIp.length > 0) {
                Object.assign(options.params, {whitelist_ip: whitelistIp})
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

function extendProxy(proxyId, apiKey) {
    return new Promise((resolve, reject) => {
        try {
            let options = getOptions('GET', 'https://ephemeral-proxies.p.rapidapi.com/v2/datacenter/extend_proxy', apiKey)
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

function getUserBalance(apiKey) {
    return new Promise((resolve, reject) => {
        try {
            let options = getOptions('GET', 'https://ephemeral-proxies.p.rapidapi.com/v2/residential/balance', apiKey)
            options['params'] = {}
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
exports.getUserBalance = getUserBalance;
exports.ProxyType = ProxyType;
