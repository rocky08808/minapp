Component({
  mixins: [],
  data: {},
  props: {
    editable: true,
    productData: {},
    onCountChange: (count) => {}
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onCountUpdate (value) {
      console.log(this.props.productData);
      this.props.onCountChange(this.props.productData.id, value)
    }
  },
});
