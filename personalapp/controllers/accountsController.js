'use strict';
const Account = require( '../models/account' );
console.log("loading the account Controller")


// this displays all of the accounts
exports.getAllAccounts = ( req, res ) => {
  console.log('in getAllAccounts-start')
  Account.find( {} )
    .exec()
    .then( ( accounts ) => {
      console.log("in getAllAccounts-then")
      res.render( 'accounts', {
        accounts: accounts
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'account promise complete' );
    } );
};




exports.saveAccount = ( req, res ) => {
  console.log("in saveAccount!")
  console.dir(req.body)
  let newAccount = new Account( {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.wowOK
  } )

  console.log("account = "+newAccount)

  newAccount.save()
    .then( () => {
      res.redirect( '/accounts' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.deleteAccount = (req, res) => {
  console.log("in deleteAccount")
  let accountName = req.body.deleteName
  if (typeof(accountName)=='string') {
      Account.deleteOne({_id:accountName})
           .exec()
           .then(()=>{res.redirect('/accounts')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(accountName)=='object'){
      Account.deleteMany({_id:{$in:accountName}})
           .exec()
           .then(()=>{res.redirect('/accounts')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(accountName)=='undefined'){
      console.log("This is if they didn't select a account")
      res.redirect('/accounts')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown accountName: ${accountName}`)
  }

};
