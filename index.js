var HelpScout = require('./helpscout');
var Mailboxes = require('./mailboxes');
var Customers = require('./customers');

/**
 * Create a Helpscout or Mailbox client based on the `apiKey`
 * and `mailboxId` passed in.
 *
 * @param {String} apiKey
 * @param {String} mailboxId
 * @return {Helpscout|Mailbox}
 */

module.exports = function helpscout(apiKey, mailboxId) {
	if (!apiKey) throw new Error('Helpscout requires an api key.');
	if (mailboxId) return new HelpScout(apiKey, mailboxId);

	return {
		mailboxes: new Mailboxes(apiKey),
		customers: new Customers(apiKey)
	};

};
