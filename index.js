var HelpScout = require('./helpscout'),
	Mailboxes = require('./mailboxes'),
	Customers = require('./customers');

/**
 * Create a Helpscout or Mailbox/Customer client based on
 * the `apiKey` and `mailboxId` passed in.
 *
 * @class 0.node-helpscout
 * 
 * @param {String} apiKey
 * @param {String} mailboxId
 * 
 * @return {Helpscout|Object} If this does not return a Helpscout client directly, the object will contain 'Mailboxes' and 'Customers' keys with those clients as values.
 */

module.exports = function(apiKey, mailboxId) {

	if (!apiKey) throw new Error('Helpscout requires an api key.');
	if (mailboxId) return new HelpScout(apiKey, mailboxId);

	return {
		mailboxes: new Mailboxes(apiKey),
		customers: new Customers(apiKey)
	};

}
