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

// tests = {
//   'addUserA': function () 
//     {
//         console.log("adding first user");
//     	User.add('aUser','aPassword', function (responseDict)
// 		{
// 			//SUCCESS
// 	    	assert.deepEqual(responseDict, {'errCode': 1, 'count': 1});
//             User.resetFixture(function (responseDict)
//             {
//                 console.log("removing first user");
//                 assert.deepEqual(responseDict, {'errCode': 1});
//             });
	           
//   		});
//     },

//     'addUserAB': function ()
//     {
//         console.log("adding first user");
//         User.add('aUser','aPassword', function (responseDict)
//         {
//             //SUCCESS
//             assert.deepEqual(responseDict, {'errCode': 1, 'count': 1});
//             console.log("adding second user");
//   		    User.add('bUser','bPassword', function (responseDict)
//             {
//                 //SUCCESS
//                 assert.deepEqual(responseDict, {'errCode':1, 'count': 1});

//                 User.resetFixture(function (responseDict)
//                 {
//                     console.log("removing first user");
//                     assert.deepEqual(responseDict, {'errCode': 1});
//                 });
//             });
//         });
//     },

//     'addExistingUser': function ()
//     {
//         User.add('cUser','cPassword', function (responseDict1)
//         {
//             User.add('cUser','cPassword', function (responseDict)
//             {
//                 //ERR_USER_EXISTS
//                 assert.equal(responseDict, {'errCode':-2});

//                 User.resetFixture(function (responseDict)
//                 {
//                     console.log("removing first user");
//                     assert.deepEqual(responseDict, {'errCode': 1});
//                 });
//             });
//         });
//     },

//     'addInvalidUName': function ()
//     {
//         console.log("null Uname");
//     	User.add(null, 'shouldnt matter', function (responseDict)
//     	{
//     		//ERR_BAD_USERNAME
//     		assert.deepEqual(responseDict, {'errCode': -3});

//             console.log("empty Uname");
//             User.add('','shouldnt matter', function (responseDict)
//             {
//                 //ERR_BAD_USERNAME
//                 assert.deepEqual(responseDict, {'errCode':--3});

//                 console.log("long Uname");
//                 User.add(longUser, 'shouldnt matter', function (responseDict)
//                 {
//                     //ERR_BAD_USERNAME
//                     assert.deepEqual(responseDict, {'errCode': -3});
//                 });
//             });
//     	});
//     },

//     'addInvalidPword' : function ()
//     {
//         console.log("null pword");
//     	User.add('fail1', null, function (responseDict)
//     	{
//     		//ERR_BAD_PASSWORD
//     		assert.deepEqual(responseDict, {'errCode': -4});

//             console.log("empty pword");
//             User.add('fail2', '', function (responseDict)
//             {
//                 //ERR_BAD_PASSWORD
//                 assert.deepEqual(responseDict, {'errCode': -4});

//                 console.log("long pword");
//                 User.add('fail3', longPass, function(responseDict)
//                 {
//                     //ERR_BAD_PASSWORD
//                     assert.deepEqual(responseDict, {'errCode': -4});
//                 });
//             });
//     	});
// 	},

//     'resetFixture' : function ()
//     {
//         User.resetFixture(function (responseDict)
//         {
//             assert.deepEqual(responseDict, {'errCode': 1});
//         });
//     },

//     'login' : function ()
//     {
//         User.login('me', '123', function (responseDict)
//         {
//             assert.deepEqual(responseDict, {'errCode': -1});

//             User.add('me', '123', function (responseDict)
//             {
//                 assert.deepEqual(responseDict, {'errCode': 1});
//                 User.login('me', '123', function (responseDict)
//                 {
//                     assert.deepEqual(responseDict, {'errCode': 1, 'count': 2});
                    
//                     User.resetFixture(function (responseDict)
//                     {
//                         assert.deepEqual(responseDict, {'errCode': 1});
//                     });
//                 });
//             });
//         });
//     }

// };

tests = 
{
    // 'addUserA' : function(funct)
    // {
    //     console.log("adding first user");
    //     User.add('aUser','aPassword', function (responseDict)
    //     {
    //         //SUCCESS
    //         assert.deepEqual(responseDict, {'errCode': 1, 'count': 1});
    //         User.resetFixture(function (responseDict)
    //         {
    //             console.log("removing first user");
    //             assert.deepEqual(responseDict, {'errCode': 1});
    //             funct();
    //         });
               
    //     });
    // },

    // 'addUserAB': function (funct)
    // {
    //     console.log("adding first user");
    //     User.add('aUser','aPassword', function (responseDict)
    //     {
    //         //SUCCESS
    //         assert.deepEqual(responseDict, {'errCode': 1, 'count': 1});
    //         console.log("adding second user");
    //         User.add('bUser','bPassword', function (responseDict)
    //         {
    //             //SUCCESS
    //             assert.deepEqual(responseDict, {'errCode':1, 'count': 1});

    //             User.resetFixture(function (responseDict)
    //             {
    //                 console.log("removing first user");
    //                 assert.deepEqual(responseDict, {'errCode': 1});
    //                 funct();
    //             });
    //         });
    //     });
    // },

    // 'addExistingUser': function (funct)
    // {
    //     User.add('cUser','cPassword', function (responseDict1)
    //     {
    //         User.add('cUser','cPassword', function (responseDict)
    //         {
    //             //ERR_USER_EXISTS
    //             assert.deepEqual(responseDict, {'errCode':-2});

    //             User.resetFixture(function (responseDict)
    //             {
    //                 console.log("removing first user");
    //                 assert.deepEqual(responseDict, {'errCode': 1});
    //                 funct();
    //             });
    //         });
    //     });
    // },

    'addInvalidUName': function (funct)
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
    },

    'addInvalidPword' : function (funct)
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

                console.log("long pword");
                User.add('fail3', longPass, function(responseDict)
                {
                    //ERR_BAD_PASSWORD
                    assert.deepEqual(responseDict, {'errCode': -4});

                    funct();
                });
            });
        });
    },

    'resetFixture' : function (funct)
    {
        User.resetFixture(function (responseDict)
        {
            assert.deepEqual(responseDict, {'errCode': 1});
            funct();
        });
    },

    'login' : function (funct)
    {
        User.login('me', '123', function (responseDict)
        {
            assert.deepEqual(responseDict, {'errCode': -1});

            User.add('me', '123', function (responseDict)
            {
                assert.deepEqual(responseDict, {'errCode': 1, 'count': 0});
                User.login('me', '123', function (responseDict)
                {
                    assert.deepEqual(responseDict, {'errCode': 1, 'count': 2});
                    
                    User.resetFixture(function (responseDict)
                    {
                        assert.deepEqual(responseDict, {'errCode': 1});
                        funct();
                    });
                });
            });
        });
    }

};

module.exports = tests;
