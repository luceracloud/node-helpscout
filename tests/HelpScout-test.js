var expect = require('expect.js'),
    HelpScout = require('..'),
    util = require('util'),
    mocks = require('./mocks'),
    Config = require('./config'),
    debug = {
        initial: false,
        mailbox_list: false,
        customer_list: false,
        customer_mailbox_list: false,
        customer_detail: false,
        customer_create: false,
        customer_update_title: false,
        customer_add_email: false,
        customer_del_email: false,
        customer_delete: false,
        conversations_all: false,
        conversations_active: false,
        customer_conversations_all: false,
        customer_conversations_active: false,
        conversation_create: false,
        conversation_lookup: false,
        conversation_close: false,
        conversation_delete: false
    };

describe('helpscout', function() {

    var apiKey = Config.api_key,
        mailboxId = Config.mailbox_id,
        customerId = Config.customer_id;

    if (debug.initial) {

        console.log(apiKey, mailboxId, customerId);

    }

    describe('mailboxes', function() {

        describe('list', function() {
            it('should get a list of mailboxes', function(done) {

                var helpscout = new HelpScout(apiKey);

                helpscout.mailboxes.list(function(err, response) {
                    if (err) return done(err);
                    var res = JSON.parse(response);

                    if (debug.mailbox_list) {

                        console.log(err, res);

                    }

                    expect(res).to.be.ok();
                    expect(res.items).to.be.an('array');

                    done();

                });

            });

        });

    });

    describe('customers', function() {

        describe('list', function() {

            it('should get a list of all customers', function(done) {

                var helpscout = new HelpScout(apiKey);

                helpscout.customers.list(function(err, response) {
                    if (err) return done(err);
                    var res = JSON.parse(response);

                    if (debug.customer_list) {

                        console.log(err, res);

                    }

                    expect(res).to.be.ok();
                    expect(res.items).to.be.an('array');

                    done();

                });

            });

            it('should get a list of all customers for one mailbox', function(done) {

                var helpscout = new HelpScout(apiKey, mailboxId);

                helpscout.customers.list(function(err, response) {
                    if (err) return done(err);
                    var res = JSON.parse(response);

                    if (debug.customer_mailbox_list) {

                        console.log(err, res);

                    }

                    expect(res).to.be.ok();
                    expect(res.items).to.be.an('array');

                    done();

                });

            });

        });

        describe('get', function() {

            it('should get one customer by id', function(done) {

                var helpscout = new HelpScout(apiKey);

                helpscout.customers.get(customerId, function(err, response) {
                    if (err) return done(err);
                    var res = JSON.parse(response);

                    if (debug.customer_detail) {

                        console.log(err, res);

                    }

                    expect(res).to.be.ok();
                    expect(res.item).to.be.an('object');
                    expect(res.item.id).to.equal(customerId);

                    done();

                });

            });

        });

        // describe('create', function() {

        //  it('should create a new customer', function(done) {

        //      var helpscout = new HelpScout(apiKey);

        //      helpscout.customers.create(mocks.newUser, function(err, response) {
        //          if (err) return done(err);
        //          var res = JSON.parse(response);

        //          if (debug.customer_create) {

        //              console.log(err, res);

        //          }

        //          expect(res).to.be.ok();
        //          expect(res.item).to.be.an('object');
        //          expect(res.item.id).to.equal(customerId);

        //          done();

        //      });

        //  });

        // });

        describe('update', function() {

            var newEmail = "email." + new Date().getTime() + "@work.com",
                emailLocation = "work",
                emailId = null;

            it('should update a customers job title', function(done) {

                this.timeout = 6000;

                var helpscout = new HelpScout(apiKey);

                helpscout.customers.list({ email: mocks.newUser.emails[0].value }, function(err, response) {

                    var customer = JSON.parse(response),
                        old_title = customer.items[0].jobTitle,
                        new_title1 = 'CTO',
                        new_title2 = 'EVP',
                        actual_new_title = new_title1;
                    
                    if (old_title === new_title1)
                        actual_new_title = new_title2;

                    helpscout.customers.update(customer.items[0].id, {
                        jobTitle: actual_new_title
                    }, function(err2, response2) {

                        var res = response2;

                        if (debug.customer_update_title) {

                            console.log(err, res);

                        }

                        expect(res).to.be.ok();
                        expect(res.item.jobTitle).to.equal(actual_new_title);

                        done();

                    });

                });

            });

            it('should add an email to a customer', function(done) {

                this.timeout = 4000;

                var helpscout = new HelpScout(apiKey);

                helpscout.customers.list({ email: mocks.newUser.emails[0].value }, function(err, response) {

                    var customer = JSON.parse(response);

                    helpscout.customers.update(customer.items[0].id, {
                        emails: [{
                            value: newEmail,
                            location: emailLocation
                        }]
                    }, function(err2, response2) {

                        var res = response2;

                        if (debug.customer_add_email) {

                            console.log('response: ', res, 'emails: ',res.item.emails);

                        }

                        var count = 0;

                        res.item.emails.forEach(function(email) {
                            if(email.value === newEmail) {
                                emailId = email.id;
                                count++;
                            }
                        });
                        expect(count).to.equal(1);

                        done();

                    });

                });

            });

            it('should remove an email from a customer', function(done) {

                this.timeout = 8000;

                var helpscout = new HelpScout(apiKey);

                helpscout.customers.list({ email: mocks.newUser.emails[0].value }, function(error, response) {

                    var customer = JSON.parse(response);

                    helpscout.customers.update(customer.items[0].id, {
                        emails: [{
                            id: emailId * -1,
                            value: newEmail,
                            location: emailLocation
                        }]
                    }, function(err, res) {

                        if (debug.customer_del_email) {

                            console.log('response: ', res, 'emails: ',res.item.emails);

                        }

                        expect(res).to.be.ok();

                        var count = 0;
                        res.item.emails.forEach(function(email) {
                            if(email.value === newEmail) {
                                emailId = email.id;
                                count++;
                            }
                        });
                        expect(count).to.equal(0);

                        done();

                    });

                });

            });

        });

        // describe('delete', function() {

        //  it('should delete a customer', function(done) {

        //      var helpscout = new HelpScout(apiKey);

        //      helpscout.customers.list({ email: mocks.newUser.emails[0].value }, function(err, response) {

        //          var res = JSON.parse(response);

        //          if (debug.customer_delete) {

        //              console.log(err, res);

        //          }

        //          helpscout.customers.delete(res.items[0].id, function(err2, response2) {

        //              console.log(err2, response2);
        //              expect(response2).to.be.ok();

        //              done();

        //          });

        //      });

        //  });

        // });

    });

    describe('conversations', function() {

        var conversationId;

        describe('list', function() {

            it('should get a list of all conversations', function(done) {

                this.timeout(4000);

                var helpscout = new HelpScout(apiKey, mailboxId);

                helpscout.conversations.list(function(err, response) {
                    if (err) return done(err);
                    var res = JSON.parse(response);

                    if (debug.conversations_all) {

                        console.log(err, res);

                    }

                    expect(res).to.be.ok();
                    expect(res.items).to.be.an('array');

                    done();

                });

            });

            it('should get a list of active conversations', function(done) {

                var helpscout = HelpScout(apiKey, mailboxId);

                helpscout.conversations.list({
                    status: 'active'
                }, function(err, response) {
                    if (err) return done(err);
                    var res = JSON.parse(response);

                    if (debug.conversations_active) {

                        console.log(err, res);

                    }

                    expect(res).to.be.ok();
                    expect(res.items).to.be.an('array');

                    res.items.forEach(function(item) {
                        expect(item.status).to.equal('active');
                    });

                    done();

                });

            });

        });

        describe('listForCustomer', function() {

            it('should get a list of conversations for one customer', function(done) {

                var helpscout = new HelpScout(apiKey, mailboxId);

                helpscout.conversations.listForCustomer(customerId, function(err, response) {
                    if (err) return done(err);
                    var res = JSON.parse(response);

                    if (debug.customer_conversations_all) {

                        console.log(err, res);

                    }

                    expect(res).to.be.ok();
                    expect(res.items).to.be.an('array');

                    res.items.forEach(function(item) {
                        expect(item.customer.id).to.equal(customerId);
                    });

                    done();

                });

            });

            it('should get a list of active conversations for one customer', function(done) {

                var helpscout = new HelpScout(apiKey, mailboxId);

                helpscout.conversations.listForCustomer(customerId, {
                    status: 'active'
                }, function(err, response) {
                    if (err) return done(err);
                    var res = JSON.parse(response);

                    if (debug.customer_conversations_active) {

                        console.log(err, res);

                    }

                    expect(res).to.be.ok();
                    expect(res.items).to.be.an('array');

                    res.items.forEach(function(item) {
                        expect(item.customer.id).to.equal(customerId);
                        expect(item.status).to.equal('active');
                    });

                    done();

                });

            });

        });

        describe('create', function() {

            it('should create a conversation', function(done) {

                var helpscout = new HelpScout(apiKey, mailboxId),
                    new_conversation = mocks.newConversation;

                new_conversation.mailbox.id = mailboxId;

                helpscout.conversations.create(mocks.newConversation, function(err, res) {

                    if (debug.conversation_create) {

                        console.log(err, res);

                    }

                    conversationId = res.item.id;
                    expect(res).to.be.ok();
                    expect(res.item).to.be.an('object');

                    done();

                });

            });
        });

        describe('get', function() {

            it('should get a conversation by id', function(done) {

                this.timeout(4000);

                var helpscout = new HelpScout(apiKey, mailboxId);

                helpscout.conversations.get(conversationId, function(err, response) {
                    if (err) return done(err);
                    var res = JSON.parse(response);

                    if (debug.conversation_lookup) {

                        console.log(err, res);

                    }

                    expect(res).to.be.ok();
                    expect(res).to.be.an('object');
                    expect(res.item.id).to.equal(conversationId);

                    done();

                });

            });

        });

        describe('update', function() {

            it('should close the conversation and update the tags', function(done) {

                this.timeout(4000);

                var helpscout = new HelpScout(apiKey, mailboxId);

                helpscout.conversations.update(conversationId, mocks.updateConversation, function(error, response) {

                    expect(response).to.be.ok();

                    helpscout.conversations.get(conversationId, function(err, response) {

                        expect(response).to.be.ok();

                        var res = JSON.parse(response);

                        if (debug.conversation_close) {

                            console.log(err, res);

                        }

                        expect(res.item.status).to.be('closed');
                        expect(res.item.tags).to.be.an('array');

                        var concatTags = mocks.newConversation.tags.concat(mocks.updateConversation.tags).toString();
                        expect(res.item.tags.toString()).to.be(concatTags);

                        done();

                    });

                });

            });

        });

        describe('delete', function() {

            it('should delete a conversation', function(done) {

                var helpscout = new HelpScout(apiKey, mailboxId);
                helpscout.conversations.delete(conversationId, function(error, response) {

                    expect(response).to.be.ok();

                    helpscout.conversations.get(conversationId, function(err, res) {

                        if (debug.conversation_delete) {

                            console.log(err, res);

                        }

                        expect(err).to.be.ok();
                        expect(res).to.not.be.ok();

                        done();

                    });

                });

            });

        });

    });

    describe('analytics', function() {});

});
