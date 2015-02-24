var Tweet = Backbone.Model.extend({
	defaults: function() {
		return {
    		name: 'Guest User',
    		age: 23,
			occupation: 'Worker'
  		}
  	}
});