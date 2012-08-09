/**
 * Templates
 */

  //Header

  //Wrapper
  Template.wrapper.is_home = function () {
    return Session.equals("page", "home");
  };

  Template.wrapper.is_about = function () {
    return Session.equals("page", "about");
  };
  
  Template.wrapper.is_chat = function () {
    return Session.equals("page", "chat");
  };

  Template.wrapper.is_register = function () {
    return Session.equals("page", "register");
  };

  Template.wrapper.is_login = function () {
    return Session.equals("page", "login");
  };

  Template.wrapper.is_account = function () {
    return Session.equals("page", "account");
  };
  
  //Sidebar
  Template.sidebar.users = function () {
    return Users.find().count();
  };

  Template.sidebar.rooms = function () {
    return Rooms.find().count();
  };

  //Rooms
  Template.rooms.rooms = function () {
    return Rooms.find();
  };

  Template.rooms.events = {
    "mousedown .room": function (event) {
      Session.set("room_id", this._id);
      if (Session.get("user_id")) {
        Users.update({_id: Session.get("user_id")}, {room: this._id});
      } else {
        var text = "",
              possible =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
              guest_name,
              user_id;

          for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }

          guest_name = "guest_" + text;
          user_id = Users.insert({
            username: guest_name,
            room: this._id
          });
          Session.set("user_id", user_id);
          Session.set("username", guest_name);
      }
      $(".room").removeClass("active_room");
      $(event.target).addClass("active_room");
    },
    "click #create_room": function () {
      var room_name = $("#room_name").val(),
          room_exists = Rooms.find({name: room_name}).count();
      console.log("Inserting new room: " + room_name);

      //Make sure room doesn't exist
      if (!room_exists) {
        room_id = Rooms.insert({
          name: room_name
        });

        //Check if they have a user_id
        if (Session.get("user_id")) {
          Users.update({_id: Session.get("user_id")}, {room: room_name})
        //Create guest credentials if they don't
        } else {
          var text = "",
              possible =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
              guest_name,
              user_id;

          for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }

          guest_name = "guest_" + text;
          user_id = Users.insert({
            username: guest_name,
            room: room_id
          });
          Session.set("user_id", user_id);
          Session.set("username", guest_name);
        }
        Session.set("room_id", room_id);
      //Notify user if it exists
      } else {
        console.log("Room already exists!");
      }
    }
  };

  //Chat
  Template.chat.events = {
    "click #submit_message": function () {
      var message = $("#message").val(),
          tm = new Date(),
          hours = tm.getUTCHours();
          minutes = tm.getUTCMinutes();
          seconds = tm.getUTCSeconds();
          timestamp = hours + ":" + minutes + ":" + seconds;
      Messages.insert({
        username: Session.get("username"),
        room: Session.get("room_id"),
        timestamp: timestamp,
        message: message
      });
      $("#message").val("");
    }
  };

  //Chat/Users
  Template.users.users = function () {
    return Users.find({room: Session.get("room_id")});
  };

  //Chat/Messages
  Template.messages.messages = function () {
    return Messages.find({room: Session.get("room_id")});
  };