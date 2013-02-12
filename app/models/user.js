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

      geddy.model.User.load({name: uname}, function (err, result)
      {
        if(result)
        {
          //ERR_USER_EXISTS
          responseDict.errCode = -2;
          callback(responseDict);
        }
        else
        {
          var userRecord = geddy.model.User.create({name: uname, password: pword, logins: 1});
          console.log("record created: "+userRecord);
          geddy.model.User.save(userRecord, function (err, results)
          {
            responseDict.errCode = 1; //"SUCCESS"
            responseDict.count = 1;
            callback(responseDict);
          });
        }
      });
    }
  }
};

User.login = function login (uname, pword, callback)
{
  var responseDict = {};
  geddy.model.User.load({name: uname}, function (err, result)
  {
    if(!result)
    {
      responseDict.errCode = -1;
      callback(responseDict);
    }
    else
    {
      result.logins += 1
      geddy.model.User.save(result);
      responseDict.errCode = 1;
      responseDict.count = result.logins;
      callback(responseDict);
    }
  });
}

User.resetFixture = function resetFixture (callback)
{
  console.log("resettingFixture");
  var responseDict={};
  geddy.model.User.all(function (err, records)
  {
    console.log("records: " + records);
    for (var key in records)
    {
      geddy.model.User.remove(records[key].id);
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
  responseDict.output=""
  for (var test in tests)
  {
    try
    {
      console.log("running test" + test);
      tests[test]();
      passed+=1;
    }
    catch (e)
    {
      responseDict.output+="Test: "+test+"Error: "+e+"\n"
      console.log("EXCEPTION: "+ e);
      console.log("FAILED TEST: " + test);
      failed+=1;
    }
  }
  responseDict.totalTests = failed+passed;
  responseDict.nrFailed = failed;
  if(failed <= 0)
  {
    responseDict.output = "all good";
  }
  callback(responseDict);
};

User = geddy.model.register('User', User);
exports.User = User;