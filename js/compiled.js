var Tweet = Backbone.Model.extend({
	defaults: function() {
		return {
    		name: 'Guest User',
    		age: 23,
			occupation: 'Worker'
  		}
  	}
});
var TweetList = Backbone.Collection.extend ({
 
	model: Tweet,

	initialize: function(){},

	url: "https://www.googleapis.com/books/v1/volumes?q=baseball",

	render: function() {
		return this;
	}

});


var TweetView = Backbone.View.extend({

	el: '.tweetList',
	tweetCollection: null,

	initialize: function() {
		this.tweetCollection = new TweetList;
		this.render();
	},

	render: function() { 
		var that = this;
        // _.each(this.$("li"), function( section ) {
        //     new TweetSectionView({
        //     	el: section,
        //         collection: that.tweetCollection
        //     });
        // });

		this.tweetCollection.fetch({ 
			success: function(){

				var data = that.collection.models[0].attributes.content.collection.data;

				_.each( categoryData, function( data ){
					var view = new TweetSectionView({
						model: data
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

    el: null,
    tweetCollection: null,

    initialize: function( options ) {
        //_.bindAll(this, "handleScrollPosition", "updateSectionHighlight");
        this.el = options.el;
        this.tweetCollection = options.collection;
        this.listenToOnce(this.tweetCollection, "add", this.addSection);
    
        this.$el.html('backbone content');

    },

    render: function() {
        return this;
    },

    addSection: function( model ) {
        this.viewIndex = this.tweetCollection.indexOf( model );
    }


})

var tweetView = new TweetView();

