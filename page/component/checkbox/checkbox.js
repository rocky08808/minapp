Page({
  data: {
    items: [
      { name: 'angular', value: 'AngularJS' },
      { name: 'react', value: 'React', checked: true },
      { name: 'polymer', value: 'Polymer' },
      { name: 'vue', value: 'Vue.js' },
      { name: 'ember', value: 'Ember.js' },
      { name: 'backbone', value: 'Backbone.js', disabled: true },
    ],
  },
  onSubmit(e) {
    console.log('onSubmit', e);
    my.alert({
      content: `Your choice of frame is ${e.detail.value.libs.join(', ')}`,
    });
  },
  onChange(e) {
    console.log('onChange', e);
    my.alert({
      content: `onChange`,
    });
  },

  onReset(e) {
    console.log('onReset', e);
  },

});
