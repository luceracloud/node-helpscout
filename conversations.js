var defaults = require('defaults'),
    request = require('request');

module.exports = Conversations;

/**
 * 
 * Initialize a new helpscout `Conversations` client with an
 * `apiKey` and `mailboxId`.
 *
 * @class Conversations
 * 
 * @param {String} apiKey    Your authorized API key
 * @param {String} mailboxId A specific mailbox id
 */

function Conversations(apiKey, mailboxId) {
    if (!(this instanceof Conversations)) return new Conversations(apiKey, mailboxId);
    if (!apiKey) throw new Error('Conversations requires an apiKey.');
    this.apiKey = apiKey;
    this.mailboxId = mailboxId;
}

/**
 * List `Conversations` by `Mailbox`.
 *
 * @param {Object}   options  Options for this function
 * @param {Function} callback A callback function
 */

Conversations.prototype.list = function(options, callback) {

    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    options = defaults(options, {
        page: 1
    });

    request.get('https://api.helpscout.net/v1/mailboxes/' + this.mailboxId + '/conversations.json', {
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
 * List `Conversations` by `Mailbox` for a `Customer`.
 *
 * @param {Number}   customerId The id of a specific customer
 * @param {Object}   options    Options for this function
 * @param {Function} callback   A callback function
 */

Conversations.prototype.listForCustomer = function(customerId, options, callback) {

    if(typeof customerId !== 'number') return callback(new Error('Customer id required.'));

    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    options = defaults(options, {
        page: 1
    });

    request.get('https://api.helpscout.net/v1/mailboxes/' + this.mailboxId + '/customers/' + customerId + '/conversations.json', {
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
 * Get a single existing `Conversation`.
 *
 * @param  {Number}   conversationId The id of a specific conversation
 * @param  {Function} callback       A callback function
 */

Conversations.prototype.get = function(conversationId, callback) {

    if (!conversationId) return new Error('Conversation id is required');

    request.get('https://api.helpscout.net/v1/conversations/' + conversationId + '.json', {
        'auth': {
            'user': this.apiKey,
            'pass': 'x'
        }
    }, function(err, res) {

        var body = JSON.parse(res.body);
        if (err || res.statusCode !== 200) return callback(new Error(body.error));
        return callback(null, res.body);
    });

};

/**
 * Create a new `Conversation`.
 *
 * @param  {Object}   conversation The id of a specific conversation
 * @param  {Object}   options      Options for this function
 * @param  {Function} callback     A callback function
 */

Conversations.prototype.create = function(conversation, options, callback) {

    if (!conversation) return new Error('Conversation object is required.');

    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    options = defaults(options, {
        reload: true
    });

    request.post('https://api.helpscout.net/v1/conversations.json', {
        'auth': {
            'user': this.apiKey,
            'pass': 'x'
        },
        headers: {
            'Content-Type': 'application/json'
        },
        qs: options,
        json: true,
        body: conversation
    }, function(err, res) {
        if (err || res.statusCode !== 201) return callback(new Error(res.body.error));
        return callback(null, res.body);
    });

};

/**
 * Update an existing `Conversation`.
 *
 * @param  {Number}   conversationId The id of a specific conversation
 * @param  {Object}   conversation   An update object
 * @param  {Function} callback       A callback function
 */

Conversations.prototype.update = function(conversationId, conversation, callback) {

    if (!conversationId) return new Error('Conversation id is required.');
    if (!conversation) return new Error('Conversation update object is required.');

    request.put('https://api.helpscout.net/v1/conversations/' + conversationId + '.json', {
        'auth': {
            'user': this.apiKey,
            'pass': 'x'
        },
        headers: {
            'Content-Type': 'application/json'
        },
        qs: { reload: true },
        json: true,
        body: conversation
    }, function(err, res) {
        if (err || res.statusCode !== 200) return callback(new Error(res.body.error));
        return callback(null, res.body);
    });

};

/**
 * Delete an existing `Conversation`.
 *
 * @param  {Number}   conversationId The id of a specific conversation
 * @param  {Function} callback       A callback function
 */

Conversations.prototype.delete = function(conversationId, callback) {

    if (!conversationId) return new Error('Conversation id is required.');

    request.del('https://api.helpscout.net/v1/conversations/' + conversationId + '.json', {
        'auth': {
            'user': this.apiKey,
            'pass': 'x'
        }
    }, function(err, res) {
        // console.log(res, err);
        if (err || res.statusCode !== 200) return callback(new Error(res.body.error));
        return callback(null, { success: true });
    });

};

// Threads

Conversations.prototype.createThread = function(options, callback) {};

Conversations.prototype.updateThread = function(options, callback) {};

// Attachments

Conversations.prototype.createAttachment = function(options, callback) {};

Conversations.prototype.deleteAttachment = function(options, callback) {};

Conversations.prototype.getAttachmentData = function(options, callback) {};

// Notes

Conversations.prototype.deleteNote = function(options, callback) {};
