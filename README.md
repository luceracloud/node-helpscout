# Help Scout API
> A simple interface to the published Help Scout [RESTful API](http://developer.helpscout.net/help-desk-api/)

## Installation

`npm install node-helpscout`

## Example Usage

```javascript
// one-liner
var HelpScout = new require('node-helpscout')([api_key]);
```

```javascript
// or, the same, with a mailbox id
var HelpScout = new require('node-helpscout')([api_key], [mailbox_id]);
```

```javascript
// or, reusable based upon needs
var HelpScout = require('node-helpscout');
var helpscout1 = new HelpScout([api_key]);
var helpscout2 = new HelpScout([api_key], [mailbox_id]);
```

#### API Key
See the section "Generating an API Key" in the Help Scout [API documentation](http://developer.helpscout.net/help-desk-api/) to generate a proper api key for your user.

#### Mailbox ID
This is a numeral that represents the mailbox id in the Help Scout backend.

## Examples

#### Testing Framework Usage

```javascript
var expect = require('expect.js'),
	HelpScout = require('..');

describe('helpscout', function() {

	var apiKey = Config.api_key,
		mailboxId = Config.mailbox_id;

	describe('list mailboxes', function() {

		it('should get a list of mailboxes', function(done) {

			var helpscout = new HelpScout(apiKey);

			helpscout.mailboxes.list(function(err, response) {

				if (err) return done(err);
				var res = JSON.parse(response);

				expect(res).to.be.ok();
				expect(res.items).to.be.an('array');

				done();

			});

		});

	});

});
```

## Tests

`npm test`