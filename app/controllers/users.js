var Users = function () {
    this.respondsWith = ['json', 'html', 'xml', 'js', 'txt'];

    this.splitGET = function(req, resp, params)
    {
      console.log("welcome to splitGet");
        if(params.respDict)
        {
          params.respDict={};
        }

        this.respond(params,
        {
            format:'html',
            template: 'app/views/users/split'
        });
    }; 

    this.loginGET = function(req, resp, params)
    {
        this.respond(params,
        {
            format:'html',
            template: 'app/views/users/login'
        });
    };


  this.split = function (req, resp, params)
  {
    for (var key in params)
    {
      console.log(key+" "+params[key]);
    }

    if(params.split == "Add User")
    {
      console.log("add user funct");
      this.add(req, resp, params)
    }
    else
    {
      if(params.split == "Login")
      {
        console.log("login user funct");
        this.login(req, resp, params)
      }
    }
  }

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.User.all(function(err, users) {
      self.respond({params: params, users: users});
    });
  };

  this.login = function (req, resp, params)
  {
    var self = this;
    console.log("USER "+params.user+" PASSWORD "+params.password);
    geddy.model.User.login(params.user, params.password, function(responseDict)
    {
      console.log("ERRCODE is :" + responseDict.errCode);
      params.respDict = responseDict;
      self.respond(responseDict, {format: 'html'});
    });
  }

  this.add = function (req, resp, params) {
    var self = this;
    params.id = params.id || geddy.string.uuid(10);
    geddy.model.User.add(params.user, params.password, function(responseDict)
    { 
        params.respDict = responseDict;
        self.respond(responseDict, {format: 'html'});
    });
  };

  this.resetFixture = function (req, resp, params)
  {
    var self = this;
    geddy.model.User.resetFixture(function(responseDict)
    {
      self.respond(responseDict);
    });
  }

  this.unitTests = function (req, resp, params)
  {
    var self = this;
    geddy.model.User.unitTests(function(responseDict)
    {
      self.respond(responseDict);
    });
  };

  this.create = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);

    var self = this
      , user = geddy.model.User.create(params);

    user.save(function(err, data) {
      if (err) {
        params.errors = err;
        self.transfer('add');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.User.first(params.id, function(err, user) {
      self.respond({params: params, user: user.toObj()});
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.User.first(params.id, function(err, user) {
      self.respond({params: params, user: user});
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.User.first(params.id, function(err, user) {
      user.updateProperties(params);

      user.save(function(err, data) {
        if (err) {
          params.errors = err;
          self.transfer('edit');
        } else {
          self.redirect({controller: self.name});
        }
      });
    });
  };

  this.destroy = function (req, resp, params) {
    var self = this;

    geddy.model.User.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Users = Users;
