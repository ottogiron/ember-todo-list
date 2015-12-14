import TodosIndex from './index';

export default TodosIndex.extend({
  model() {
    return this.store.filter('todo', (todo) =>  todo.get('isCompleted'));
  }
}); 
