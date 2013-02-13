var assert = require('assert')
  , tests
  , User = geddy.model.User;

var longUser = "";
var longPass = ""
for (var i = 0; i < 129; i++)
{
    longUser+="z";
    longPass+="a";
}

tests = [
  function (callback) {
    User.add('user1', 'pass', function (responseDict) 
    {
        try
        {
            assert.deepEqual(responseDict, {'errCode': 1, 'count': 1});
            callback(true);
        }
        catch (exc) 
        {
            callback(false);
        }
    });
  },
  function (callback) 
  {
    User.add('Bob', 'pass', function (responseDict) 
    {
        User.add('Bob', 'pass', function (responseDict) {
            try
            {
                assert.deepEqual(responseDict, {'errCode': -2});
                callback(true);
            }
            catch (exc)
            {
                callback(false);
            }
        });
    });
  },
  function (callback) 
  {
    User.add('user2', 'pass', function (responseDict)
    {
        try
        {
            assert.deepEqual(responseDict, {'errCode': 1, 'count': 1});
            callback(true);
        }
        catch (exc){
            callback(false);
        }
    });
  },
  function (callback) 
  {
    User.add("", 'pass', function (responseDict) 
    {
        try{
            assert.deepEqual(responseDict, {'errCode': -3});
            callback(true);
        }
        catch (exc)
        {
            callback(false);
        }
    });
  },
  function (callback) 
  {
    User.add(null, 'pass', function (responseDict) 
    {
        try
        {
            assert.deepEqual(responseDict, {'errCode': -3});
            callback(true);
        }
        catch (exc)
        {
            callback(false);
        }
    });
  },
  function (callback) 
  {
    User.add('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', 'pass', function (responseDict) {
        try
        {
            assert.deepEqual(responseDict, {'errCode': -3});
            callback(true);
        }
        catch (exc)
        {
            callback(false);
        }
    });
  },
  function (callback) 
  {
    User.add('user5', "", function (responseDict) 
    {
        try{
            assert.deepEqual(responseDict, {"errCode": -4});
            callback(true);
        }
        catch (exc)
        {
            callback(false);
        }
    });
  },
  function (callback) 
  {
    User.add('user6', null, function (responseDict) 
    {
       for (var key in responseDict)
        {
            console.log(key + " : " + responseDict[key]);
        }
        try
        {
            assert.deepEqual(responseDict, {"errCode": -4});
            callback(true);
        }
        catch (exc)
        {
            callback(false);
        }
    });
  },
  function (callback) 
  {
    User.add('user7', 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', function (responseDict) {
        for (var key in responseDict)
        {
            console.log(key + " : " + responseDict[key]);
        }
        try
        {
            assert.deepEqual(responseDict, {"errCode": -4});
            callback(true);
        }
        catch (exc)
        {
            callback(false);
        }
    });
  },
  function (callback) 
  {
    User.add('user', 'pass', function (responseDict) 
    {
          User.login('user', 'pass', function (responseDict) 
          {
            try
            {
                assert.deepEqual(responseDict, {'errCode': 1, 'count': 2});
                callback(true);
            }
            catch (exc)
            {
                console.log("exception: " + exc);
                callback(false);
            }
        });
    });
  },
  function (callback) 
  {
    User.login('user12392', 'pass2', function (responseDict) 
    {
        try
        {
            assert.deepEqual(responseDict, {'errCode': -1});
            callback(true);
        }
        catch (exc)
        {
            callback(false);
        }
    });
  }
]
module.exports = tests;
