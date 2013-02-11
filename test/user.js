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

tests = {
  'addTwoUsers': function () 
    {
        console.log("adding first user");
    	User.add('aUser','aPassword', function (responseDict)
		{
			//SUCCESS
	    	assert.equal(responseDict, {'errCode': 1, 'count': 1});
	    
  		});

        console.log("adding second user");
  		User.add('bUser','bPassword', function (responseDict)
		{
			//SUCCESS
	    	assert.equal(responseDict, {'errCode':1});
	    
  		});
    }

 //    'addExistingUser': function ()
 //    {

 //    	User.add('aUser','aPassword', function (responseDict)
 //    	{
 //    		//ERR_USER_EXISTS
 //    		assert.equal(responseDict, {'errCode':-2});
 //    	});
 //    },

 //    'addInvalidUName': function ()
 //    {
 //        console.log("null Uname");
 //    	User.add(null, 'shouldnt matter', function (responseDict)
 //    	{
 //    		//ERR_BAD_USERNAME
 //    		assert.equal(responseDict, {'errCode': -3});
 //    	});

 //        console.log("empty Uname");
 //    	User.add('','shouldnt matter', function (responseDict)
 //    	{
 //    		//ERR_BAD_USERNAME
 //    		assert.equal(responseDict, {'errCode':--3});
 //    	});

 //        console.log("long Uname");
 //    	User.add(longUser, 'shouldnt matter', function (responseDict)
 //    	{
 //    		//ERR_BAD_USERNAME
 //    		assert.equal(responseDict, {'errCode': -3});
 //    	});
 //    },

 //    'addInvalidPword' : function ()
 //    {
 //        console.log("null pword");
 //    	User.add('fail1', null, function (responseDict)
 //    	{
 //    		//ERR_BAD_PASSWORD
 //    		assert.equal(responseDict, {'errCode': -4});
 //    	});

 //        console.log("empty pword");
 //    	User.add('fail2', '', function (responseDict)
 //    	{
 //    		//ERR_BAD_PASSWORD
 //    		assert.equal(responseDict, {'errCode': -4});
 //    	});

 //        console.log("long pword");
 //    	User.add('fail3', longPass, function(responseDict)
 //    	{
 //    		//ERR_BAD_PASSWORD
 //    		assert.equal(responseDict, {'errCode': -4});
 //    	});
	// }

};

module.exports = tests;
