var User = function () {

  this.defineProperties({
    name: {type: 'string', required: true},
    password: {type: 'string'},
    logins: {type: 'int'},
  });


};

User.add = function add (uname, pword, callback)
{
  var responseDict={};
  if(!uname || uname.length == 0 || uname.length > 128)
  {
    //ERR_BAD_USERNAME
    console.log("ERR_BAD_USERNAME: "+uname);
    responseDict.errCode = -3;
    callback(responseDict);
  }
  else 
  {
    if(!pword || pword.length == 0 || pword.length > 128)
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
  geddy.model.User.load({name: uname, password: pword}, function (err, result)
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
  User.resetFixture(function (call)
  {
    var success = 0;
    var fail = 0;
    var tests = require('../../test/user.js');
    var failedTests = "";

    var numTests = 0;
    for (var key in tests)
    {
      numTests += 1;
    }
    var currentTestNumber = -1;

    var finish = function finish()
    {
      var responseDict = {};
      responseDict.totalTests = success + fail;
      responseDict.nrFailed = fail;
      if (fail == 0)
      {
        responseDict.output = "All good";
      } 
      else 
      {
        responseDict.output = failedTests;
      }
      callback(responseDict);
    };

    var runTests = function runTests(didTestPass)
    {
      console.log("runningTest");
      if (currentTestNumber !== -1)
      {
        if (!didTestPass)
        {
          fail += 1;
          failedTests += "Test " + currentTestNumber + ": FAILED.    ";
        } 
        else
        {
          success += 1;
          console.log("Test " + currentTestNumber + ": PASSED.");
        }
      }
      currentTestNumber += 1;
      console.log("running test: " + currentTestNumber + " and there are :" + numTests + " total tests");
      if (currentTestNumber >= numTests)
      {
        finish();
      } 
      else
      {
          tests[currentTestNumber](runTests);
      }
    }

    runTests();
  });
}

User = geddy.model.register('User', User);
exports.User = User;