var defaults = require('defaults');
var request = require('request');

/**
 * Expose `Analytics`.
 */

module.exports = Analytics;

/**
 * Initialize a new helpscout `Analytics` client with an
 * `apiKey` and `mailboxId`.
 *
 * @param {String} apiKey
 * @param {String} mailboxId
 */

function Analytics(apiKey, mailboxId) {
  if (!(this instanceof Analytics)) return new Analytics(apiKey, mailboxId);
  if (!apiKey) throw new Error('Analytics requires an apiKey.');
  this.apiKey = apiKey;
  this.mailboxId = mailboxId;
}

/**
 * List the mailbox's conversations.
 *
 * @param {Object} options
 *   @param {Number} page
 * @param {Function} callback
 */

// Analytics.prototype.listAll = function(options, callback)
// {
//   if (typeof options === 'function') {
//     callback = options;
//     options = {};
//   }

//   if(!options.mailbox_id) return callback(new Error('Mailbox id is required.'));

//   options = defaults(options, {
//     page: 1
//   });

//   request.get('https://api.helpscout.net/v1/mailboxes/' + options.mailbox_id + '/conversations.json', {
//     'auth': {
//       'user': this.apiKey,
//       'pass': 'x'
//     },
//     qs: options
//   }, function(err, res) {
//     if (err || res.statusCode !== 200) return callback(new Error(err));
//     return callback(null, res.body);
//   });
// }
