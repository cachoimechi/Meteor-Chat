/**
 * Templates
 */

  //Header
  Template.header.is_logged = function () {
    return !Session.equals("user_id", undefined);
  };
  
  Template.header.events = {
    "click #logout": function () {
      Session.set("is_logged", false);
      Session.set("user_id", undefined);
      Session.set("username", undefined);
    }
  }

  //Wrapper
  Template.wrapper.is_home = function () {
    return !Session.equals("page", "home");
  };

  Template.wrapper.is_about = function () {
    return !Session.equals("page", "about");
  };
  
  Template.wrapper.is_chat = function () {
    return !Session.equals("page", "chat");
  };

  Template.wrapper.is_register = function () {
    return !Session.equals("page", "register");
  };

  Template.wrapper.is_login = function () {
    return !Session.equals("page", "login");
  };

  Template.wrapper.is_account = function () {
    return !Session.equals("page", "account");
  };
  
  //Sidebar
  Template.sidebar.users = function () {
    return Users.find().count();
  };

  Template.sidebar.rooms = function () {
    return Rooms.find().count();
  };

  //Register
  Template.register.events = {
    "click #submit_register": function () {
      var username = $("#register_username"),
          password = $("#register_password"),
          verify_password = $("#register_verify_password"),
          user_exists = Users.findOne({name: username});

      if (!user_exists) {
        if (password === verify_password) {
          var user_id = Users.insert({
            username: username,
            password: sha1(password)
          });
          Session.set("is_logged", true);
          Session.set("user_id", user_id);
          Session.set("username", username);
          Router.chat("chat");
        } else {
          console.log("Registration failed.");
        }
      } else {
        console.log("User already exists!");
      }
    }
  };
  
  //Login
  Template.login.events = {
    "click #submit_login": function () {
      var username = $("#login_username"),
          password = $("#login_password"),
          user = Users.findOne({name: username});

      if (sha1(password) === user.password) {
        Session.set("is_logged", true);
        Session.set("user_id", user._id);
        Session.set("username", username)
      } else {
        console.log("Login failed.");
      }
    }
  };

  //Rooms
  Template.rooms.rooms = function () {
    return Rooms.find();
  };

  Template.rooms.events = {
    "mousedown .room": function () {
      Session.set("room_id", this._id);
    },
    "click #create_room": function () {
      var room_name = $("#room_name").val(),
      room_id = Rooms.insert({
        name: room_name
      });
      Session.set("room_id", room_id);
    }
  };

  //Chat
  Template.chat.events = {
    "click #submit_message": function () {
      var message = $("#message").val(),
          tm = new Date(a*1000),
          hours = tm.getUTCHours();
          minutes = tm.getUTCMinutes();
          seconds = tm.getUTCSeconds();
          timestamp = hours + ":" + minutes + ":" + seconds;
      Messages.insert({
        username: Session.get("username"),
        timestamp: timestamp
      });
      $("#message").val("");
    }
  };

  //Chat/Users
  Template.users.users = function () {
    return Users.find({room_id: Session.get("room_id")});
  };

  //Chat/Messages
  Template.messages.messages = function () {
    return Messages.find({room_id: Session.get("room_id")});
  };