var request = require('request');
const {API_KEY} = require('./abtasty-api-key');


/**
 * Generate a unique visitor ID               
 * @return id	string   {"id": "",d}
 */ 
createId = function(){
    return new Promise((resolve, reject) => {
        request.post({
            url:'https://serverside.abtasty.com/v1/visitor',
            data:{},
            headers: {
                'x-api-key': API_KEY
            },
            method: 'POST'
        },
        function (e, r, body) {
            body ? resolve(body) : reject(e)

        });
    })
}
/**then
 * Allocate a visitor to variation
 * @param visitor_id    string  required
 * @param campaign_id	string	optional
 * @return allocations	object {"variation_id": , "allocations": {} }	
 */
allocateVisitor = function(visitor_id, campaign_id = ''){
    return new Promise((resolve, reject) => {
        request.post({
            url:'https://serverside.abtasty.com/v1/allocate',
            json: {
                'visitor_id': visitor_id,
                'campaign_id': campaign_id
            },
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            method: 'POST'
        },
        function (e, r, body) {
          body ? resolve(body) : reject(e);
        });
    })
}

/**
 * Send Campaign Activated event
 * @param campaign_id	string	required	
 * @param variation_id	string	required
 * @param tracking_data	object	required
 * @param tracking_data.visitor_id	string	required
 * @param tracking_data.device_type	string	required
 * @param tracking_data.origin	string	required
 * @param tracking_data.timestamp	string	optional (recommended for asynchronous)
 * @param tracking_data.ip
 * @return allocations	object	
 */
campaignActivated = function(campaign_id, variation_id, tracking_data){
    return new Promise((resolve, reject) => {
        request.post({
            url:'https://serverside.abtasty.com/v1/campaign_activated_event',
            json: {
                "campaign_id": campaign_id,
                "variation_id": variation_id,
                "tracking_data": {
                    "device_type": tracking_data.device_type,
                    "origin": tracking_data.origin,
                    "visitor_id": tracking_data.visitor_id
                  }
            },
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            method: 'POST'
        },
        function (e, r, body) {
          body ? resolve(body) : reject(e);
        });
    })
}

/**
 * Send Action Tracking event
 * @param name	string	required
 * @param type	string	required  "CLICK" or "TOUCH"
 * @param tracking_data	object	required
 * @param tracking_data.visitor_id	string	required
 * @param tracking_data.device_type	string	required  "DESKTOP", "MOBILE_PHONE", "TABLET", "CAMERA", "TV", "GAMES_CONSOLE", "PAYMENT_TERMINAL", "WRISTWATCH", and "OTHER".
 * @param tracking_data.origin	string	required
 * @param tracking_data.timestamp	string	optional (recommended for asynchronous)
 * @param tracking_data.ip	string	optional
 * @param value_string	string	optional
 * @param value_integer	int	optional
 * @param position	object	optional
 * @param position.x	int	required
 * @param position.y	int	required
 * @param resolution	object	optional
 * @param resolution.width	int	required
 * @param resolution.height	int	required 	
 */
actionTracking = function(name, type, tracking_data){
    return new Promise((resolve, reject) => {
        request.post({
            url:'https://serverside.abtasty.com/v1/action_tracking_event',
            json: {
                "name": name,
                "type": type,
                "tracking_data": {
                  "visitor_id": tracking_data.visitor_id,
                  "device_type": tracking_data.device_type,
                  "origin": tracking_data.origin
                }
            },
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            method: 'POST'
        },
        function (e, r, body) {
          body ? resolve(body) : reject(e);
        });
    })
}

/**
 * Send Custom event
 * @param name	string	required
 * @param tracking_data	object	required
 * @param tracking_data.visitor_id	string	required
 * @param tracking_data.device_type	string	required  "DESKTOP", "MOBILE_PHONE", "TABLET", "CAMERA", "TV", "GAMES_CONSOLE", "PAYMENT_TERMINAL", "WRISTWATCH", and "OTHER".
 * @param tracking_data.origin	string	required
 * @param tracking_data.timestamp	string	optional (recommended for asynchronous)
 * @param tracking_data.ip	string	optional
 * @param value_string	string	optional
 * @param value_integer	int	optional
 */
customEvent = function(name, tracking_data){
    return new Promise((resolve, reject) => {
        request.post({
            url:'https://serverside.abtasty.com/v1/custom_event',
            json: {
                "name": name,
                "tracking_data": {
                  "visitor_id": tracking_data.visitor_id,
                  "device_type": tracking_data.device_type,
                  "origin": tracking_data.origin,
                  "ip": tracking_data.ip,
                  "timestamp": tracking_data.timestamp,
                  "geolocation": {
                      "lat": tracking_data.geolocation.lat,
                      "long": tracking_data.geolocation.long
                  }
                }
            },
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            method: 'POST'
        },
        function (e, r, body) {
          body ? resolve(body) : reject(e);
        });
    })
}

/**
 * Send Transaction event
 * @param name	string	required
 * @param id	string	required
 * @param revenue	int	required
 * @param shipping	int	required
 * @param tracking_data	object	required
 * @param tracking_data.visitor_id	string	required
 * @param tracking_data.device_type	string	required  "DESKTOP", "MOBILE_PHONE", "TABLET", "CAMERA", "TV", "GAMES_CONSOLE", "PAYMENT_TERMINAL", "WRISTWATCH", and "OTHER".
 * @param tracking_data.origin	string	required
 * @param tracking_data.timestamp	string	optional (recommended for asynchronous)
 * @param tracking_data.ip	string	optional
 * @param tax_total	int	optional
 * @param payment_method	string optional
 * @param item_count	int optional - default number of items
 * @param currency	object optional
 * @param currency.name	string required
 * @param currency.rate	float required
 * @param items	object 	optional
 * @param items.name	string	required	
 * @param items.price	int	required	
 * @param items.sku	string	optional
 * @param items.category	string	optional
 * @param items.quantity	int	optional
 * @param items.tax_amount	int	optional
 * @param items.tax_rate	float	
 */
transactionEvent = function(name, id, revenue, shipping, tax_total, payment_method, items_count, currency, items, tracking_data){
    return new Promise((resolve, reject) => {
        request.post({
            url:'https://serverside.abtasty.com/v1/transaction_event',
            json: {
                "name": name,
                "id": id,
                "revenue": revenue,
                "shipping": shipping,
                "tracking_data": {
                  "visitor_id": tracking_data.visitor_id,
                  "device_type": tracking_data.device_type,
                  "origin": tracking_data.origin,
                  "ip": tracking_data.ip,
                  "geolocation": {
                      "lat": tracking_data.geolocation.lat,
                      "long": tracking_data.geolocation.long
                  }
                },
                "tax_total": tax_total,
                "payment_method": payment_method,
                "items_count": 2,
                "currency": {
                    "name": currency.name,
                    "rate": currency.rate
                },
                "items": [{
                    "name": items.name,
                    "price": items.price,
                    "sku": items.sku,
                    "category": items.category,
                    "quantity": items.quantity,
                    "tax_amount": items.tax_amount,
                    "tax-rate": items.tax_rate
                },
                {
                    "name": items.name,
                    "price": items.price,
                    "sku": items.sku,
                    "category": items.category,
                    "quantity": items.quantity,
                    "tax_amount": items.tax_amount,
                    "tax-rate": items.tax_rate
                }]
            },
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            method: 'POST'
        },
        function (e, r, body) {
          body ? resolve(body) : reject(e);
        });
    })
}

/**
 * Send Visit event
 * @param tracking_data	object	required
 * @param tracking_data.visitor_id	string	required
 * @param tracking_data.device_type	string	required  "DESKTOP", "MOBILE_PHONE", "TABLET", "CAMERA", "TV", "GAMES_CONSOLE", "PAYMENT_TERMINAL", "WRISTWATCH", and "OTHER".
 * @param tracking_data.origin	string	required
 * @param tracking_data.timestamp	string	optional (recommended for asynchronous)
 * @param tracking_data.ip	string	optional
 */
visitEvent = function(tracking_data){
    return new Promise((resolve, reject) => {
        request.post({
            url:'https://serverside.abtasty.com/v1/visit_event',
            json: {
                "tracking_data": {
                  "visitor_id": tracking_data.visitor_id,
                  "device_type": tracking_data.device_type,
                  "origin": tracking_data.origin,
                  "ip": tracking_data.ip,
                  "timestamp": tracking_data.timestamp,
                  "geolocation": {
                      "lat": tracking_data.geolocation.lat,
                      "long": tracking_data.geolocation.long
                  }
                }
            },
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            method: 'POST'
        },
        function (e, r, body) {
          body ? resolve(body) : reject(e);
        });
    })
}


module.exports = {createId, allocateVisitor, campaignActivated, actionTracking, customEvent, transactionEvent, visitEvent }