var defaults = require('defaults'),
	request = require('request');

module.exports = Mailboxes;

/**
 * 
 * Initialize a new helpscout `Mailboxes` client with an
 * `apiKey`.
 *
 * @class Mailboxes
 *
 * @param {String} apiKey Your authorized API key
 */

function Mailboxes(apiKey) {
	if (!(this instanceof Mailboxes)) return new Mailboxes(apiKey);
	if (!apiKey) throw new Error('Mailboxes requires an apiKey.');
	this.apiKey = apiKey;
}

/**
 * List the `Mailboxes`.
 *
 * @param {Object}   options  Options for this function
 * @param {Function} callback A callback function
 */

Mailboxes.prototype.list = function(options, callback) {

	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	options = defaults(options, {
		page: 1
	});

	request.get('https://api.helpscout.net/v1/mailboxes.json', {
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
