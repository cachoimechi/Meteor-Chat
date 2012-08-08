/**
 * Models
 */

  //Create
  Users = new Meteor.Collection('users');
  Rooms = new Meteor.Collection('rooms');
  Messages = new Meteor.Collection('messages');
  
  //Publish
  Meteor.publish('users', function () {
  	return Users.find();
  });
  Meteor.publish('rooms', function () {
  	return Rooms.find();
  });
  Meteor.publish('messages', function () {
  	return Messages.find();
  });