## Javascript client library for [Ephemeral proxies API](https://www.ephemeral-proxies.net/)

:warning: This library requires a valid Rapid API key to access Ephemeral Proxies API. A Rapid API key can easily be obtained on https://rapidapi.com/.

:information_source: More information about Ephemeral Proxies API can be found [here](https://rapidapi.com/rpi4gx/api/ephemeral-proxies)

### Example:

```
$ npm install -s ephemeral-proxies
```

main.js:
```
const ep = require('ephemeral-proxies');

(async function main() {
    try {
        let proxy = await ep.getProxy()
        console.log(proxy)
    } catch (e) {
        console.warn(e)
    }
})()
```

The Rapid API key can be set by EP_RAPIDAPI_KEY environment variable.

```
$ EP_RAPIDAPI_KEY=YOUR_API_KEY_HERE node main.js

{
    "success": true,
    "proxy": {
        "id": "bcdedb1e958400a7a213250a0d877777",
        "host": "l9de0.ep-proxy.net",
        "port": 33357,
        "expires_at": "2022-08-02T21:16:12.000Z",
        "whitelisted_ips": [
            "91.267.2.90"
        ],
        "visibility": {
            "ip": "84.54.58.127",
            "country": "United Kingdom",
            "country_iso": "GB",
            "country_eu": true,
            "latitude": 51.5088,
            "longitude": -0.126,
            "timezone": "Europe/London",
            "asn": "AS174",
            "asn_org": "Cogent Communications",
            "zip_code": "WC1N",
            "region_name": "England",
            "region_code": "ENG",
            "city": "London"
        },
        "features": {
            "static": true,
            "supported_protocols": {
                "socks4": false,
                "socks5": false,
                "http": true,
                "https": true
            }
        }
    }
}
```

### Library functions

* getProxy(rapidApiKey) - Returns a new proxy. 

    *rapidApiKey* argument is optional. If unset, EP_RAPIDAPI_KEY environment variable is required.
    ```
    let proxy = ep.getProxy(rapidApiKey)
    ```


* getServiceStatus(rapidApiKey) - Retrieves API service status.

    *rapidApiKey* argument is optional. If unset, EP_RAPIDAPI_KEY environment variable is required.
    ```
    let service = ep.getServiceStatus(rapidApiKey)
    ```


* extendProxy(proxyId, rapidApiKey) - Extends expiration time of proxy.

    *proxyId* argument is required. Id of proxy to extend.

    *rapidApiKey* argument is optional. If unset, EP_RAPIDAPI_KEY environment variable is required.
    ```
    let proxy = ep.getProxy(rapidApiKey)
    let proxyExtended = ep.extendProxy(proxy.id, rapidApiKey)()
    ```
