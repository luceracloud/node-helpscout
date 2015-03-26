var defaults = require('defaults'),
    request = require('request');

module.exports = Customers;

/**
 * 
 * Initialize a new helpscout `Customers` client with an
 * `apiKey` and `mailboxId`.
 *
 * @class Customers
 *
 * @param {String} apiKey    Your authorized API key
 * @param {String} mailboxId A specific mailbox id
 */

function Customers(apiKey, mailboxId) {
    if (!(this instanceof Customers)) return new Customers(apiKey);
    if (!apiKey) throw new Error('Customers requires an apiKey.');
    this.apiKey = apiKey;
    this.mailboxId = mailboxId;
}

/**
 * List `Customers` (optionally by `Mailbox`).
 *
 * @param {Object}   options  Options for this function
 * @param {Function} callback A callback function
 */

Customers.prototype.list = function(options, callback) {

    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    options = defaults(options, {
        page: 1
    });

    var url = this.mailboxId ? 'https://api.helpscout.net/v1/mailboxes/' + this.mailboxId + '/customers.json' : 'https://api.helpscout.net/v1/customers.json';

    request.get(url, {
        'auth': {
            'user': this.apiKey,
            'pass': 'x'
        },
        qs: options
    }, function(err, res) {
        if (err || res.statusCode !== 200) return callback(new Error(err));
        return callback(null, res.body);
    });

};

/**
 * Get a single existing `Customer`.
 *
 * @param {Number}   customerId The id of a specific customer
 * @param {Function} callback   A callback function
 */

Customers.prototype.get = function(customerId, callback) {

    if (!customerId) return new Error('Customer id is required');

    request.get('https://api.helpscout.net/v1/customers/' + customerId + '.json', {
        'auth': {
            'user': this.apiKey,
            'pass': 'x'
        }
    }, function(err, res) {
        if (err || res.statusCode !== 200) return callback(new Error(err));
        return callback(null, res.body);
    });

};

/**
 * Create a new `Customer`.
 *
 * @param {Object}   customer A customer object to create
 * @param {Function} callback A callback function
 */

Customers.prototype.create = function(customer, callback) {

    if (!customer) return new Error('Customer object is required');

    request.post({
        url: 'https://api.helpscout.net/v1/customers.json',
        auth: {
            user: this.apiKey,
            pass: 'x'
        },
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        body: JSON.stringify(customer),
        qs: {
            reload: true
        }
    }, function(err, res) {
        console.log(res.body);
        if (err || res.statusCode !== 200) return callback(new Error(res.body.message));
        return callback(null, res.body);
    });

};

/**
 * Update an existing `Customer`.
 *
 * @param {Number}   customerId The id of a specific customer
 * @param {Object}   customer   An update object
 * @param {Function} callback   A callback function
 */

Customers.prototype.update = function(customerId, customer, callback) {

    if (!customerId) return new Error('Customer id is required');
    if (!customer) return new Error('Customer update object is required');

    request.put({
        url: 'https://api.helpscout.net/v1/customers/' + customerId + '.json',
        auth: {
            user: this.apiKey,
            pass: 'x'
        },
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        body: customer,
        qs: {
            reload: true
        }
    }, function(err, res) {

        if (err || res.statusCode !== 201) return callback(new Error(res.body));
        return callback(null, res.body);

    });

};

/**
 * Delete an existing `Customer`.
 *
 * NOTE: NOT YET IMPLEMENTED BY HELP SCOUT
 *
 * @param {Number}   customerId The id of a specific customer
 * @param {Function} callback   A callback function
 */

Customers.prototype.delete = function(customerId, callback) {

    if (!customerId) return new Error('Customer id is required');

    request.put({
        url: 'https://api.helpscout.net/v1/customers/' + customerId + '.json',
        auth: {
            user: this.apiKey,
            pass: 'x'
        },
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        body: JSON.stringify({
            'id': customerId * -1
        })
    }, function(err, res) {

        if (err || res.statusCode !== 200) return callback(new Error(res.body.message));
        return callback(null, res.body);

    });

};