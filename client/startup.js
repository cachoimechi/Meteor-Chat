/**
 * Client Startup
 */

 	Meteor.startup(function () {
 		Backbone.history.start({pushState: true});
 	})