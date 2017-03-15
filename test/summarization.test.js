var assert = require('assert');
var summarization = require('../summarization.js');
var models = require('../models.js');

describe('summarization', function() {
  describe('addTxn', function() {

    it('sums deposits', function() {
      // TODO: replace manual object construction with factories or builders
      var deposit20 = {type: "deposit", amount: 20};
      var deposit10 = {type: "deposit", amount: 10};
      var acc1 = summarization.addTxn({deposit: 0, laundry: 0, purchase: 0}, deposit20);
      var acc2 = summarization.addTxn(acc1, deposit10);
      assert.equal(30, acc2.deposit);
    });

    it('sums laundry', function() {
      var laundry20 = {type: "laundry", amount: 20};
      var laundry10 = {type: "laundry", amount: 10};
      var acc1 = summarization.addTxn({deposit: 0, laundry: 0, purchase: 0}, laundry20);
      var acc2 = summarization.addTxn(acc1, laundry10);
      assert.equal(30, acc2.laundry);
    });

    it('sums purchase', function() {
      var purchase20 = {type: "purchase", amount: 20};
      var purchase10 = {type: "purchase", amount: 10};
      var acc1 = summarization.addTxn({deposit: 0, laundry: 0, purchase: 0}, purchase20);
      var acc2 = summarization.addTxn(acc1, purchase10);
      assert.equal(30, acc2.purchase);
    });

    it('summarizes multiple students', function() {
      var john = {name: "john", roomNo: "1a", seatNo:"2a",
                  txns: [{type: "deposit", amount: 200},
                         {type: "laundry", amount: 10},
                         {type: "laundry", amount: 30},
                         {type: "laundry", amount: 20},
                         {type: "purchase", amount: 50},
                         {type: "purchase", amount: 100}]};
      var mukesh = {name: "mukesh", roomNo: "2a", seatNo: "3a",
                    txns: [{type: "deposit", amount: 200},
                           {type: "laundry", amount: 10},
                           {type: "laundry", amount: 50},
                           {type: "laundry", amount: 20},
                           {type: "purchase", amount: 50}]};
      var summary = [
        {name:"john", roomNo: "1a", seatNo: "2a",
         monies: {deposit: 200, laundry: 60, purchase: 150, total: -10}},
        {name:"mukesh", roomNo: "2a", seatNo: "3a",
         monies: {deposit: 200, laundry: 80, purchase: 50, total: 70}}
      ];
      assert.deepEqual(summary, summarization.summarize([john, mukesh]));
    });

  });
});
