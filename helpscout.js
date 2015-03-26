/**
 * 
 * Module `Helpscout`.
 * 
 * @module helpscout
 * 
 */

var Customers = require('./customers');
var Conversations = require('./conversations');
var Analytics = require('./analytics');

module.exports = Helpscout;

/**
 * Initialize a new helpscout `Helpscout` client with an
 * `apiKey` and `mailboxId`.
 *
 * @param {String} apiKey
 * @param {String} mailboxId
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
