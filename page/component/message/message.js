Page({
  data: {
    title: "Successful operation",
    subTitle: "Details can be folded line, recommended no more than two lines",
    messageButton: {
      mainButton: {
        buttonText: "Main operation"
      },
      subButton: {
        buttonText: "Auxiliary operation"
      }
    }
  },
  goBack() {
    my.navigateBack();
  }
});