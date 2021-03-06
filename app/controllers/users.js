var Users = function () {
  this.respondsWith = ['json'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.User.all(function(err, users) {
      self.respond({params: params, users: users});
    });
  };

  this.login = function (req, resp, params)
  {
    var self = this;
    geddy.model.User.login(params.user, params.password, function(responseDict)
    {
      self.respond(responseDict);
    });
  }

  this.add = function (req, resp, params) {
    var self = this;
    params.id = params.id || geddy.string.uuid(10);
    console.log("params: "+params);
    geddy.model.User.add(params.user, params.password, function(responseDict)
    {
      if(responseDict)
      {  
        self.respond(responseDict);
      }
      else
      {
        self.respond("THIS IS BAD");
      }
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
