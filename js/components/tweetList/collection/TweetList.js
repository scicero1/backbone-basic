var TweetList = Backbone.Collection.extend ({
 
	model: Tweet,

	initialize: function(){},

	url: "https://www.googleapis.com/books/v1/volumes?q=baseball",

	render: function() {
		return this;
	}

});
