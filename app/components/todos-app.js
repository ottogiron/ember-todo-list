import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
		actions: {
			createTodo() {
				var title, todo;

				// Get the todo title set by the "New Todo" text field
				title = this.get('newTitle').trim();
				if (!title) {
					return;
				}

				// Create the new Todo model
				todo = this.get('store').createRecord('todo', {
					title: title,
					isCompleted: false
				});
				todo.save();

				// Clear the "New Todo" text field
				this.set('newTitle', '');
			}
		},
    completed: Ember.computed.filterBy('todos', 'isCompleted', true),
    canToggle: Ember.computed('todos.length', 'todos.@each.isEditing', function() {
      var anyTodos = this.get('todos.length');
      var isEditing = this.get('todos').isAny('isEditing');
      return anyTodos && !isEditing;
    }),
    allAreDone: Ember.computed('todos.length', 'completed.length', {
      get()  {
        var length = this.get('todos.length');
        var completedLength = this.get('completed.length');
        return length > 0 && length === completedLength;
      },
      set(key, value) {
        this.get('todos').setEach('isCompleted', value);
        return value;
      }
    })

	});
