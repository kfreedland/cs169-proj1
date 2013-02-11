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
    console.log("ERR_BAD_USERNAME: "+uname);
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
      console.log('sup\n');

      geddy.model.User.load({name: uname}, function (err, result)
      {
        console.log('error\n');
        if(result)
        {
          //ERR_USER_EXISTS
          responseDict.errCode = -2;
          callback(responseDict);
        }
        else
        {
          console.log("so far so good\n");
          console.log(uname+" "+pword);
          var userRecord = geddy.model.User.create({name: uname, password: pword, logins: 1});
          console.log("record created: "+userRecord);
          geddy.model.User.save(userRecord, function (err, results)
          {
            console.log("GOOD");
            responseDict.errCode = 1; //"SUCCESS"
            responseDict.count = 1;
            callback(responseDict);
          });
        }
      });
    }
  }
};

User.resetFixture = function resetFixture (callback)
{
  console.log("resettingFixture");
  var responseDict={};
  geddy.model.User.all(function (err, records)
  {
    console.log(records);
    for (var record in records)
    {
      console.log("rec is: "+record);
      geddy.model.User.remove(record);
    }
    //SUCCESS
    responseDict.errCode = 1;
    callback(responseDict);
  });
}

User.unitTests = function TESTAPI_unitTests(callback)
{
  var responseDict = {};
  var tests = require('../../test/user.js');
  var failed = 0;
  var passed = 0;
  for (test in tests)
  {
    try
    {
      test();
      passed+=1;
    }
    catch (e)
    {
      failed+=1;
    }
  }
  responseDict.totalTests = failed+passed;
  responseDict.nrFailed = failed;
  if(failed > 0)
  {
    responseDict.output = "you failed stuff";
  }
  else
  {
    responseDict.output = "all good";
  }
  callback(responseDict);
};

User = geddy.model.register('User', User);
exports.User = User;