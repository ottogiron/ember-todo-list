import Ember from 'ember';

export default Ember.TextField.extend({
		focusOnInsert:  () => {
			// Re-set input value to get rid of a redundant text selection
			this.$().val(this.$().val());
			this.$().focus();
		}.on('didInsertElement')
	});
