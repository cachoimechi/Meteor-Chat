/**
 * Routes
 */
 	//Extend backbone router
    var ChatRouter = Backbone.Router.extend({
    	//URL triggers
    	routes: {
    		"/": "home",
    		"about": "about",
 			"chat": "chat",
    		"register": "register",
    		"login": "login",
    		"logout": "logout",
    		"account": "account"
    	},
    	home: function () {
    		Session.set("page", "home");
    	},
    	about: function () {
    		Session.set("page", "about");
    	},
    	chat: function () {
    		Session.set("page", "chat");
    	},
    	register: function () {
    		Session.set("page", "register");
    	},
    	login: function () {
    		Session.set("page", "login");
    	},
    	logout: function () {
    		Session.set("page", "home");
    		Session.set("is_logged", false);
            this.navigate("/", true);
    	},
    	account: function () {
    		Session.set("page", "account");
    	}
    });

    Router = new ChatRouter;