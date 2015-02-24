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

