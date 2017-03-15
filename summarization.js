"use strict";

const addTxn = function(acc, txn){
  switch(txn.type){
  case "deposit":
	  acc.deposit += txn.amount
    break

  case "laundry":
	  acc.laundry += txn.amount
	  break

  case "purchase":
    acc.purchase += txn.amount
    break
  }
  return acc
}

const calculateTotal = function(monies) {
  return monies.deposit - (monies.laundry + monies.purchase);
}

const summarizeStudent = function(student){
  let monies = student.txns.reduce(addTxn, {deposit: 0,laundry: 0,purchase: 0, total:0});
  monies.total = calculateTotal(monies);
  return {
    name : student.name,
    roomNo : student.roomNo,
    seatNo : student.seatNo,
    monies : monies
  }

}

const summarize = function(students) {
  return students.map(summarizeStudent);
}

module.exports = {
  addTxn,
  summarizeStudent,
  summarize
}
