var TweetList = Backbone.Collection.extend ({
 
	model: Tweet,

	initialize: function(){},

	url: "http://api.shoplocal.com/stopandshop/2010.3/JSON/getcategorylistings.aspx?campaignid=db0e0998bdca968d&storeref=843&listingindex=1&listingcount=50&sortby=6&listingimagewidth=90&listingimageformat=jpg&resultset=full&cattreeid=5119211",

    // Override sync to use jsonp to fix cross-domain api errors
    sync: function(method, model, options){  
		options.timeout = 10000;  
		options.dataType = "jsonp";  
		return Backbone.sync(method, model, options);  
	}

});
