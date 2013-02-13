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

tests = 
{
    'addUserA' : function(funct)
    {
        try
        {
            console.log("adding first user");
            User.add('aUser','aPassword', function (responseDict)
            {
                //SUCCESS
                assert.deepEqual(responseDict, {'errCode': 1, 'count': 1});
                User.resetFixture(function (responseDict)
                {
                    console.log("removing first user");
                    assert.deepEqual(responseDict, {'errCode': 1});
                    funct();
                });
                   
            });
        }
        catch (error)
        {
            funct(error);
        }
    },

    'addUserAB': function (funct)
    {
        try
        {
            console.log("adding first user");
            User.add('aUser','aPassword', function (responseDict)
            {
                //SUCCESS
                assert.deepEqual(responseDict, {'errCode': 1, 'count': 1});
                console.log("adding second user");
                User.add('bUser','bPassword', function (responseDict)
                {
                    //SUCCESS
                    assert.deepEqual(responseDict, {'errCode':1, 'count': 1});

                    User.resetFixture(function (responseDict)
                    {
                        console.log("removing first user");
                        assert.deepEqual(responseDict, {'errCode': 1});
                        funct();
                    });
                });
            });
        }
        catch (error)
        {
            funct(error);
        }
    },

    'addExistingUser': function (funct)
    {
        try{
            User.add('cUser','cPassword', function (responseDict1)
            {
                User.add('cUser','cPassword', function (responseDict)
                {
                    //ERR_USER_EXISTS
                    assert.deepEqual(responseDict, {'errCode':-2});

                    User.resetFixture(function (responseDict)
                    {
                        console.log("removing first user");
                        assert.deepEqual(responseDict, {'errCode': 1});
                        funct();
                    });
                });
            });
        }
        catch (error)
        {
            funct(error);
        }
    },

    'addInvalidUName': function (funct)
    {
        try
        {
            console.log("null Uname");
            User.add(null, 'shouldnt matter', function (responseDict)
            {
                //ERR_BAD_USERNAME
                assert.deepEqual(responseDict, {'errCode': -3});

                console.log("empty Uname");
                User.add('','shouldnt matter', function (responseDict)
                {
                    //ERR_BAD_USERNAME
                    assert.deepEqual(responseDict, {'errCode':-3});

                    console.log("long Uname");
                    User.add(longUser, 'shouldnt matter', function (responseDict)
                    {
                        //ERR_BAD_USERNAME
                        assert.deepEqual(responseDict, {'errCode': -3});
                        funct();
                    });
                });
            });
        }
        catch (error)
        {
            funct(error);
        }
    },

    'addInvalidPword' : function (funct)
    {
        try
        {
            console.log("null pword");
            User.add('fail1', null, function (responseDict)
            {
                //ERR_BAD_PASSWORD
                assert.deepEqual(responseDict, {'errCode': -4});

                console.log("empty pword");
                User.add('fail2', '', function (responseDict)
                {
                    //ERR_BAD_PASSWORD
                    assert.deepEqual(responseDict, {'errCode': -4});

                    console.log();
                    User.add('fail3', longPass, function(responseDict)
                    {
                        //ERR_BAD_PASSWORD
                        assert.deepEqual(responseDict, {'errCode': -4});

                        funct();
                    });
                });
            });
        }
        catch (error)
        {
           funct(error); 
        }
    },

    'resetFixture' : function (funct)
    {
        try
        {
            User.resetFixture(function (responseDict)
            {
                assert.deepEqual(responseDict, {'errCode': 1});
                funct();
            });
        }
        catch (error)
        {
         funct(error);
        }
    },

    'login' : function (funct)
    {
        try
        {
            User.login('me', '123', function (responseDict)
            {
                assert.deepEqual(responseDict, {'errCode': -1});

                User.add('me', '123', function (responseDict)
                {
                    assert.deepEqual(responseDict, {'errCode': 1, 'count': 1});
                    User.login('me', '123', function (responseDict)
                    {
                        assert.deepEqual(responseDict, {'errCode': 1, 'count': 2});
                        
                        User.resetFixture(function (responseDict)
                        {
                            assert.deepEqual(responseDict, {'errCode': 1});
                            console.log("NO ERROR?");
                            funct();
                        });
                    });
                });
            });
        }
        catch (error)
        {
            console.log("WE HAVE AN ERROR");
            funct(error);
        }

    }

};

module.exports = tests;
