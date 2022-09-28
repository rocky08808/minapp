Page({
  data: {
    items: [
      { checked: true, disabled: false, value: 'a', title: 'Checkbox - selected by default', id: 'checkbox1' },
      { checked: false, disabled: false, value: 'b', title: 'Checkbox - not selected by default', id: 'checkbox2' },
      { checked: true, disabled: true, value: 'c', title: 'Checkbox - selected by default disabled', id: 'checkbox3' },
      { checked: false, disabled: true, value: 'd', title: 'Checkbox - not selected by default-disabled', id: 'checkbox4' },
    ],
    items2: [
      { name: 'react', value: 'React', checked: true },
      { name: 'vue', value: 'Vue.js' },
      { name: 'ember', value: 'Ember.js' },
      { name: 'backbone', value: 'Backbone.js', disabled: true },
    ],
  },
  onSubmit(e) {
    my.alert({
      content: `The frame you choose is ${e.detail.value.libs.join(', ')}`,
    });
  },
  onReset() {},
  onChange(e) { console.log(e); },
});
