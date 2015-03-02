var expect = require('expect.js');
var HelpScout = require('..');
var util = require('util');
var mocks = require('./mocks');

describe('helpscout', function() {

    var apiKey = 'd7d7b958925901cc0859a2f620577bc1c9257cff';
    var mailboxId = 34966;
    var customerId;

    describe('mailboxes', function() {

        describe('list', function() {
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

    describe('customers', function() {

        describe('list', function() {

            it('should get a list of all customers', function(done) {
                var helpscout = new HelpScout(apiKey);
                helpscout.customers.list(function(err, response) {
                    if (err) return done(err);
                    var res = JSON.parse(response);

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

                    expect(res).to.be.ok();
                    expect(res.item).to.be.an('object');
                    expect(res.item.id).to.equal(customerId);
                    done();

                });

            });

        });

        // describe('create', function() {

        //     it('should create a new customer', function(done) {

        //         var helpscout = new HelpScout(apiKey);
        //         helpscout.customers.create(mocks.newUser, function(err, response) {
        //             if (err) return done(err);
        //             var res = JSON.parse(response);

        //             expect(res).to.be.ok();
        //             expect(res.item).to.be.an('object');
        //             expect(res.item.id).to.equal(customerId);
        //             done();

        //         });

        //     });

        // });

        describe('update', function() {

            var newEmail = "email@work.com";
            var emailLocation = "work";
            var emailId = null;

            it('should update a customers job title', function(done) {

                this.timeout = 4000;

                var helpscout = new HelpScout(apiKey);

                helpscout.customers.list({ email: mocks.newUser.emails[0].value }, function(err, response) {

                    var customer = JSON.parse(response);

                    helpscout.customers.update(customer.items[0].id, {
                        jobTitle: 'CTO'
                    }, function(err2, response2) {

                        var res = response2;

                        expect(res).to.be.ok();
                        expect(res.item.jobTitle).to.equal('CTO');
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

                this.timeout = 4000;

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

        //     it('should delete a customer', function(done) {

        //         var helpscout = new HelpScout(apiKey);

        //         helpscout.customers.list({ email: mocks.newUser.emails[0].value }, function(err, response) {

        //             var res = JSON.parse(response);

        //             helpscout.customers.delete(res.items[0].id, function(err2, response2) {

        //                 console.log(err2, response2);
        //                 expect(response2).to.be.ok();
        //                 done();

        //             });

        //         });

        //     });

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

                var helpscout = new HelpScout(apiKey, mailboxId);
                helpscout.conversations.create(mocks.newConversation, function(err, res) {

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

                    expect(res).to.be.ok();
                    expect(res).to.be.an('object');
                    expect(res.item.id).to.equal(conversationId);
                    done();

                });

            });

        });

        describe('update', function() {

            it('should close the conversation and update the tags', function(done) {

                var helpscout = new HelpScout(apiKey, mailboxId);
                helpscout.conversations.update(conversationId, mocks.updateConversation, function(error, response) {

                    expect(response).to.be.ok();

                    helpscout.conversations.get(conversationId, function(err, response) {

                        expect(response).to.be.ok();

                        var res = JSON.parse(response);
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
