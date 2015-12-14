import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    clearCompleted() {
      var completed = this.get('completed');
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },
  /* properties */
  remaining: Ember.computed.filterBy('todos', 'isCompleted', false),
  completed: Ember.computed.filterBy('todos', 'isCompleted', true)
});
