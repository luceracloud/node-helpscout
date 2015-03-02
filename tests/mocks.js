module.exports = {

	newUser: {
		"firstName": "Vernon",
		"lastName": "Bear",
		"organization": "Acme, Inc",
		"jobTitle": "CEO and Co-Founder",
		"background": "I've worked with Vernon before and he's really great.",
		"address": {
			"lines": [
				"123 West Main St",
				"Suite 123"
			],
			"city": "Dallas",
			"state": "TX",
			"postalCode": "74206",
			"country": "US",
			"createdAt": "2012-07-23T12:34:12Z",
			"modifiedAt": "2012-07-24T20:18:33Z"
		},
		"socialProfiles": [{
			"value": "https://twitter.com/helpscout",
			"type": "twitter"
		}],
		"emails": [{
			"value": "vbear@mywork.com",
			"location": "home"
		}],
		"phones": [{
			"value": "222-333-4444",
			"location": "home"
		}],
		"chats": [{
			"value": "jsprout",
			"type": "aim"
		}],
		"websites": [{
			"value": "http://www.somewhere.com"
		}]
	},

	newConversation: {
		"type": "email",
		"customer": {
			"email": "vbear@mywork.com"
		},
		"subject": "I need help",
		"mailbox": {
			"id": 'xxxxxx'
		},
		"tags": [
			"tag1",
			"tag2"
		],
		"status": "active",
		"createdAt": new Date(),
		"threads": [{
			"type": "customer",
			"createdBy": {
				// "id": 1234,
				"email": "vbear@mywork.com",
				"type": "customer"
			},
			"body": "I need your help with an issue I'm having.",
			// "assignedTo": {
			// 	"id": 2222
			// },
			"status": "active",
			"createdAt": new Date(),
			"cc": [
				"user1@example.com",
				"user2@example.com"
			],
			"bcc": [
				"user3@example.com",
				"user4@example.com"
			],
			"attachments": [{
				"hash": "7gjj3dg7fs3cvi956jjgfsw"
			}, {
				"hash": "hfsf63fjgle8jglglksd285"
			}]
		}]
	},

	updateConversation: {
		"subject": "I need help",
		"status": "closed",
		"tags": [
			"tag5",
			"tag6"
		]
	}
};
