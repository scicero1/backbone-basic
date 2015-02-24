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

				var data = that.tweetCollection.models[0].attributes.items;

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
