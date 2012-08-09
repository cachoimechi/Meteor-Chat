/**
 * Models
 */

  //Subscribe
  Meteor.subscribe("users");
  Meteor.subscribe("rooms");
  Meteor.subscribe("messages");

  //Create
  Users = new Meteor.Collection("users");
  Rooms = new Meteor.Collection("rooms");
  Messages = new Meteor.Collection("messages");