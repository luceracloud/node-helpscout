var Customers = require('./customers'),
	Conversations = require('./conversations'),
	Mailboxes = require('./mailboxes'),
	Analytics = require('./analytics');

module.exports = Helpscout;

/**
 * 
 * Initialize a new helpscout `Helpscout` client with an
 * `apiKey` and `mailboxId`.
 *
 * @class Helpscout
 * 
 * @param {String} apiKey    Your authorized API key
 * @param {String} mailboxId A specific mailbox id
 * 
 * @return {Object} Contains clients for Mailboxes, Customers, Conversations, and Analytics.
 */

function Helpscout(apiKey, mailboxId) {
	if (!(this instanceof Helpscout)) return new Helpscout(apiKey);
	if (!apiKey) throw new Error('Helpscout requires an api key.');
	if (!mailboxId) throw new Error('Helpscout requires a mailbox id.');

	return {
		mailboxes: new Mailboxes(apiKey),
		customers: new Customers(apiKey, mailboxId),
		conversations: new Conversations(apiKey, mailboxId),
		analytics: new Analytics(apiKey, mailboxId)
	};

}
