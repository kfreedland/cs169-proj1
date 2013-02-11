var User = function () {

  this.defineProperties({
    name: {type: 'string', required: true},
    password: {type: 'string'},
    logins: {type: 'int'},
  });

  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
User.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
User.someStaticMethod = function () {
  // Do some other stuff
};
User.someStaticProperty = 'YYZ';
*/
User.add = function add (uname, pword, callback)
{
  var responseDict={};
  if(!uname || uname == "" || uname.length > 128)
  {
    //ERR_BAD_USERNAME
    responseDict.errCode = -3;
    callback(responseDict);
  }
  else 
  {
    if(!pword || pword == "" || pword > 128)
    {
      //ERR_BAD_PASSWORD
      responseDict.errCode = -4;
      callback(responseDict);
    }
    else
    {
      console.log(uname+" "+pword);
      var userRecord = geddy.model.User.create({name: uname, password: pword, logins: 0});
      console.log("record created: "+userRecord);
      geddy.model.User.save(userRecord, function (err, results)
      {
        console.log("GOOD");
        responseDict.errCode = 1; //"SUCCESS"
        callback(responseDict);
      });
    }
  }
};

User = geddy.model.register('User', User);
exports.User = User;