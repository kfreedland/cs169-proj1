var assert = require('assert')
  , tests
  , User = geddy.model.User;

tests = {
  'addTests': function () 
	{
    	User.add('aUser','aPassword', function (responseDict)
		{
			//SUCCESS
	    	assert.equal(responseDict, {'errCode':1});
	    
  		});

  		User.add('bUser','bPassword', function (responseDict)
		{
			//SUCCESS
	    	assert.equal(responseDict, {'errCode':1});
	    
  		});

    	User.add('aUser','aPassword', function (responseDict)
    	{
    		//ERR_USER_EXISTS
    		assert.equal(responseDict, {'errCode':-2});
    	});

    	User.add(null, 'shouldnt matter', function (responseDict)
    	{
    		//ERR_BAD_USERNAME
    		assert.equal(responseDict, {'errCode': -3});
    	});

    	User.add('','shouldnt matter', function (responseDict)
    	{
    		//ERR_BAD_USERNAME
    		assert.equal(responseDict, {'errCode':--3});
    	});

    	var longUser = "";
    	var longPass = ""
    	for (var i = 0; i < 129; i++)
    	{
    		longUser+="z";
    		longPass+="a";
    	}

    	User.add(longUser, 'shouldnt matter', function (responseDict)
    	{
    		//ERR_BAD_USERNAME
    		assert.equal(responseDict, {'errCode': -3});
    	});

    	User.add('fail1', null, function (responseDict)
    	{
    		//ERR_BAD_PASSWORD
    		assert.equal(responseDict, {'errCode': -4});
    	});

    	User.add('fail2', '', function (responseDict)
    	{
    		//ERR_BAD_PASSWORD
    		assert.equal(responseDict, {'errCode': -4});
    	});

    	User.add('fail3', longPass, function(responseDict)
    	{
    		//ERR_BAD_PASSWORD
    		assert.equal(responseDict, {'errCode': -4});
    	});
	}

};

module.exports = tests;
