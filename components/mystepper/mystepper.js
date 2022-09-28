Component({
  mixins: [],
  data: {
    value: 1,
    min: 0,
    max: 100
  },
  props: {
    min: null,
    max: null,
    value: null,
    onChange: (value) => {}
  },
  didMount() {
    if (this.props.min) this.setData({min: this.props.min})
    if (this.props.max) this.setData({max: this.props.max})
    if (this.props.value) this.setData({value: this.props.value})
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    minus(){
      if (this.data.value > this.data.min) {
        let newValue = this.data.value - 1;
        this.setData({
          value: newValue
        });
        this.props.onChange(newValue);
      }
    },

    plus() {
      if (this.data.value < this.data.max) {
        let newValue = this.data.value + 1;
        this.setData({
          value: newValue
        });
        this.props.onChange(newValue);
      }
    }
  },
});
