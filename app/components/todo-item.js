import Ember from 'ember';

export default Ember.Component.extend({
      tagName: 'li',
  		isEditing: false,

  		// We use the bufferedTitle to store the original value of
  		// the model's title so that we can roll it back later in the
  		// `cancelEditing` action.
  		bufferedTitle: Ember.computed.oneWay('todo.title'),

  		actions: {
  			editTodo() {
  				this.set('isEditing', true);
  			},

  			doneEditing() {
  				var bufferedTitle = this.get('bufferedTitle').trim();

  				if (Ember.isEmpty(bufferedTitle)) {
  					// The `doneEditing` action gets sent twice when the user hits
  					// enter (once via 'insert-newline' and once via 'focus-out').
  					//
  					// We debounce our call to 'removeTodo' so that it only gets
  					// made once.
  					Ember.run.debounce(this, 'removeTodo', 0);
  				} else {
  					var todo = this.get('todo');
  					todo.set('title', bufferedTitle);
  					todo.save();
  				}

  				// Re-set our newly edited title to persist its trimmed version
  				this.set('bufferedTitle', bufferedTitle);
  				this.set('isEditing', false);
  			},

  			cancelEditing() {
  				this.set('bufferedTitle', this.get('title'));
  				this.set('isEditing', false);
  			},

  			removeTodo() {
  				this.removeTodo();
  			}
  		},

  		removeTodo() {
  			var todo = this.get('todo');

  			todo.deleteRecord();
  			todo.save();
  		},
  		saveWhenCompleted: function() {
  			this.get('todo').save();
  		}.observes('todo.isCompleted')
  	}
);
