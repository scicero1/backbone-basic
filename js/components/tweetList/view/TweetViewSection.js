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

