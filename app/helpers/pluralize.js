import Ember from 'ember';

export function pluralize(params, hash) {
  /* From Ember-Data */
		var inflector = Ember.Inflector.inflector;
		let word = params[0];
		let count = params[1];
		return count === 1 ? word : inflector.pluralize(word);
}

export default Ember.Helper.helper(pluralize);
