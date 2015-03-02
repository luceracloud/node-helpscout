var Mailboxes = require('./mailboxes');
var Customers = require('./customers');
var Conversations = require('./conversations');
var Analytics = require('./analytics');

/**
 * Expose `Helpscout`.
 */

module.exports = Helpscout;

/**
 * Initialize a new `Helpscout` client with an `apiKey`.
 *
 * @param {String} apiKey
 * @param {String} mailboxId
 * @param {String} customerId
 */

function Helpscout (apiKey, mailboxId) {
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
