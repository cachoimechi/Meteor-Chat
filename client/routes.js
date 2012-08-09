/**
 * Routes
 */
 	//Extend backbone router
    var ChatRouter = Backbone.Router.extend({
    	//URL triggers
    	routes: {
    		"/": "home",
    		"about": "about",
 			"chat": "chat"
    	},
    	home: function () {
    		Session.set("page", "home");
    	},
    	about: function () {
    		Session.set("page", "about");
    	},
    	chat: function () {
    		Session.set("page", "chat");
    	}
    });

    Router = new ChatRouter;