var SimpleListItem = Backbone.Model.extend({
	defaults: function() {
		return {
    		title: '',
    		price: ''
  		}
  	}
});
var Tweet = Backbone.Model.extend({
	defaults: function() {
		return {
    		title: '',
    		price: ''
  		}
  	}
});
var SimpleList = Backbone.Collection.extend ({
 
	model: SimpleListItem,

	initialize: function(){
	
	}

});

var simpleListCollection = new SimpleList;
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


var SimpleListView = Backbone.View.extend({

	el: '.my-list',
	simpleListCollection: null,

	 events: {
        'keypress #custom-entry' : 'addToList'
    },

	initialize: function() {
		this.simpleListCollection = simpleListCollection;
		this.listenTo(this.simpleListCollection, "add", this.addItem);

		this.render();
	},

	render: function() { 
		return this; 
	},

	addItem: function() {
		var that = this;

		var data = _.last( that.simpleListCollection.models ).attributes;

		
			var view = new SimpleListSectionView({
				model: data,
				collection: that.simpleListCollection
			});
			that.$el.append( view.render().hide().fadeIn('fast') );
	
	},

    addToList: function( e ) {
    	var code = e.keyCode || e.which;
 		if(code == 13) {
        	var newListItem = this.$('#custom-entry').val();
        	this.$('#custom-entry').val('');
        	this.simpleListCollection.add({
            	title: newListItem
        	});
    	}
    }


});

var simpleListView = new SimpleListView();
var SimpleListSectionView = Backbone.View.extend({

    tagName: "li",

    el: null,
    simpleList: null,

    template: _.template("<h2><%= this.model.title %></h2><a class='remove' href='#'>&#10005</a>"),

    initialize: function( options ) {
        //_.bindAll(this, "handleScrollPosition", "updateSectionHighlight");
        this.simpleList = options.collection;
        this.listenToOnce( this.simpleList, "add", this.addSection );
    },

    render: function() {
        this.$el.html( this.template( this.model ) );
        //this.$el.html( this.model.title );
        return this.$el;
    },

    addSection: function( model ) {
        this.viewIndex = this.simpleList.indexOf( model );
    }



})

// var simple = new TweetView();


var TweetView = Backbone.View.extend({

	el: '.tweetList',
	tweetCollection: null,
	simpleListCollection: null,

	initialize: function() {
		this.simpleListCollection = simpleListCollection;
		this.tweetCollection = new TweetList;
		this.render();
	},

	render: function() { 
		var that = this;

		this.tweetCollection.fetch({ 
			success: function(){

				var data = that.tweetCollection.models[0].attributes.content.collection[0].data

				_.each( data, function( data ){
					var view = new TweetSectionView({
						model: data,
						collection: that.tweetCollection,
						simpleList: that.simpleListCollection
					});
					that.$el.append( view.render() );
				}, that);

			},
			error: function(){
				console.log('error');
			}
		});

		return this; 
	}

});

var TweetSectionView = Backbone.View.extend({

    tagName: "li",

    el: null,
    tweetCollection: null,
    simpleList: null,

    template: _.template("<h2><%= this.model.title %></h2><span><%= this.model.price %></span><a href='#' class='add-to-list'>add to list</a>"),

    events: {
        'click .add-to-list' : 'addToList'
    },

    initialize: function( options ) {
        //_.bindAll(this, "handleScrollPosition", "updateSectionHighlight");
        this.el = options.el;
        this.tweetCollection = options.collection;
        this.simpleList = options.simpleList;
        this.listenToOnce( this.tweetCollection, "add", this.addSection );
    
    },

    render: function() {
        this.$el.html( this.template( this.model ) );
        //this.$el.html( this.model.title );
        return this.$el;
    },

    addSection: function( model ) {
        this.viewIndex = this.tweetCollection.indexOf( model );
    },

    addToList: function( event ) {
        this.simpleList.add(this.model);
        $(event.currentTarget).addClass('added').html('added to list &#10003');
        return false;
    }


})

var tweetView = new TweetView();

