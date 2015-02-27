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
