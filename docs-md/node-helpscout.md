#Index

**Modules**

* [Gulpfile](#module_Gulpfile)

**Classes**

* [class: Analytics](#Analytics)
  * [new Analytics(apiKey, mailboxId)](#new_Analytics)
* [class: Conversations](#Conversations)
  * [new Conversations(apiKey, mailboxId)](#new_Conversations)
  * [conversations.list(options, callback)](#Conversations#list)
  * [conversations.listForCustomer(customerId, options, callback)](#Conversations#listForCustomer)
  * [conversations.get(conversationId, callback)](#Conversations#get)
  * [conversations.create(conversation, options, callback)](#Conversations#create)
  * [conversations.update(conversationId, conversation, callback)](#Conversations#update)
  * [conversations.delete(conversationId, callback)](#Conversations#delete)
* [class: Customers](#Customers)
  * [new Customers(apiKey, mailboxId)](#new_Customers)
  * [customers.list(options, callback)](#Customers#list)
  * [customers.get(customerId, callback)](#Customers#get)
  * [customers.create(customer, callback)](#Customers#create)
  * [customers.update(customerId, customer, callback)](#Customers#update)
  * [customers.delete(customerId, callback)](#Customers#delete)
* [class: Helpscout](#Helpscout)
  * [new Helpscout(apiKey, mailboxId)](#new_Helpscout)
* [class: node-helpscout](#node-helpscout)
  * [new node-helpscout(apiKey, mailboxId)](#new_node-helpscout)
* [class: Mailboxes](#Mailboxes)
  * [new Mailboxes(apiKey)](#new_Mailboxes)
  * [mailboxes.list(options, callback)](#Mailboxes#list)
 
<a name="module_Gulpfile"></a>
#Gulpfile
Gulpfile.js
All automated tasks go here

**Author**: Randy Lebeau  
<a name="Analytics"></a>
#class: Analytics
**Members**

* [class: Analytics](#Analytics)
  * [new Analytics(apiKey, mailboxId)](#new_Analytics)

<a name="new_Analytics"></a>
##new Analytics(apiKey, mailboxId)
Initialize a new helpscout `Analytics` client with an
`apiKey` and `mailboxId`.

**Params**

- apiKey `String` - Your authorized API key  
- mailboxId `String` - A specific mailbox id  

<a name="Conversations"></a>
#class: Conversations
**Members**

* [class: Conversations](#Conversations)
  * [new Conversations(apiKey, mailboxId)](#new_Conversations)
  * [conversations.list(options, callback)](#Conversations#list)
  * [conversations.listForCustomer(customerId, options, callback)](#Conversations#listForCustomer)
  * [conversations.get(conversationId, callback)](#Conversations#get)
  * [conversations.create(conversation, options, callback)](#Conversations#create)
  * [conversations.update(conversationId, conversation, callback)](#Conversations#update)
  * [conversations.delete(conversationId, callback)](#Conversations#delete)

<a name="new_Conversations"></a>
##new Conversations(apiKey, mailboxId)
Initialize a new helpscout `Conversations` client with an
`apiKey` and `mailboxId`.

**Params**

- apiKey `String` - Your authorized API key  
- mailboxId `String` - A specific mailbox id  

<a name="Conversations#list"></a>
##conversations.list(options, callback)
List `Conversations` by `Mailbox`.

**Params**

- options `Object` - Options for this function  
- callback `function` - A callback function  

<a name="Conversations#listForCustomer"></a>
##conversations.listForCustomer(customerId, options, callback)
List `Conversations` by `Mailbox` for a `Customer`.

**Params**

- customerId `Number` - The id of a specific customer  
- options `Object` - Options for this function  
- callback `function` - A callback function  

<a name="Conversations#get"></a>
##conversations.get(conversationId, callback)
Get a single existing `Conversation`.

**Params**

- conversationId `Number` - The id of a specific conversation  
- callback `function` - A callback function  

<a name="Conversations#create"></a>
##conversations.create(conversation, options, callback)
Create a new `Conversation`.

**Params**

- conversation `Object` - The id of a specific conversation  
- options `Object` - Options for this function  
- callback `function` - A callback function  

<a name="Conversations#update"></a>
##conversations.update(conversationId, conversation, callback)
Update an existing `Conversation`.

**Params**

- conversationId `Number` - The id of a specific conversation  
- conversation `Object` - An update object  
- callback `function` - A callback function  

<a name="Conversations#delete"></a>
##conversations.delete(conversationId, callback)
Delete an existing `Conversation`.

**Params**

- conversationId `Number` - The id of a specific conversation  
- callback `function` - A callback function  

<a name="Customers"></a>
#class: Customers
**Members**

* [class: Customers](#Customers)
  * [new Customers(apiKey, mailboxId)](#new_Customers)
  * [customers.list(options, callback)](#Customers#list)
  * [customers.get(customerId, callback)](#Customers#get)
  * [customers.create(customer, callback)](#Customers#create)
  * [customers.update(customerId, customer, callback)](#Customers#update)
  * [customers.delete(customerId, callback)](#Customers#delete)

<a name="new_Customers"></a>
##new Customers(apiKey, mailboxId)
Initialize a new helpscout `Customers` client with an
`apiKey` and `mailboxId`.

**Params**

- apiKey `String` - Your authorized API key  
- mailboxId `String` - A specific mailbox id  

<a name="Customers#list"></a>
##customers.list(options, callback)
List `Customers` (optionally by `Mailbox`).

**Params**

- options `Object` - Options for this function  
- callback `function` - A callback function  

<a name="Customers#get"></a>
##customers.get(customerId, callback)
Get a single existing `Customer`.

**Params**

- customerId `Number` - The id of a specific customer  
- callback `function` - A callback function  

<a name="Customers#create"></a>
##customers.create(customer, callback)
Create a new `Customer`.

**Params**

- customer `Object` - A customer object to create  
- callback `function` - A callback function  

<a name="Customers#update"></a>
##customers.update(customerId, customer, callback)
Update an existing `Customer`.

**Params**

- customerId `Number` - The id of a specific customer  
- customer `Object` - An update object  
- callback `function` - A callback function  

<a name="Customers#delete"></a>
##customers.delete(customerId, callback)
Delete an existing `Customer`.

NOTE: NOT YET IMPLEMENTED BY HELP SCOUT

**Params**

- customerId `Number` - The id of a specific customer  
- callback `function` - A callback function  

<a name="Helpscout"></a>
#class: Helpscout
**Members**

* [class: Helpscout](#Helpscout)
  * [new Helpscout(apiKey, mailboxId)](#new_Helpscout)

<a name="new_Helpscout"></a>
##new Helpscout(apiKey, mailboxId)
Initialize a new helpscout `Helpscout` client with an
`apiKey` and `mailboxId`.

**Params**

- apiKey `String` - Your authorized API key  
- mailboxId `String` - A specific mailbox id  

**Returns**: `Object` - Contains clients for Mailboxes, Customers, Conversations, and Analytics.  
<a name="node-helpscout"></a>
#class: node-helpscout
**Members**

* [class: node-helpscout](#node-helpscout)
  * [new node-helpscout(apiKey, mailboxId)](#new_node-helpscout)

<a name="new_node-helpscout"></a>
##new node-helpscout(apiKey, mailboxId)
Create a Helpscout or Mailbox/Customer client based on
the `apiKey` and `mailboxId` passed in.

**Params**

- apiKey `String` - Your authorized API key  
- mailboxId `String` - A specific mailbox id  

**Returns**: [Helpscout](#Helpscout) | `Object` - If this does not return a Helpscout client directly, the object will contain 'Mailboxes' and 'Customers' keys with those clients as values.  
<a name="Mailboxes"></a>
#class: Mailboxes
**Members**

* [class: Mailboxes](#Mailboxes)
  * [new Mailboxes(apiKey)](#new_Mailboxes)
  * [mailboxes.list(options, callback)](#Mailboxes#list)

<a name="new_Mailboxes"></a>
##new Mailboxes(apiKey)
Initialize a new helpscout `Mailboxes` client with an
`apiKey`.

**Params**

- apiKey `String` - Your authorized API key  

<a name="Mailboxes#list"></a>
##mailboxes.list(options, callback)
List the `Mailboxes`.

**Params**

- options `Object` - Options for this function  
- callback `function` - A callback function  

