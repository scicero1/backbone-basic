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

