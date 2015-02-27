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