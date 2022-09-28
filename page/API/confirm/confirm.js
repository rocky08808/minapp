Page({
  comfirm() {
    my.confirm({
      title: 'Warm prompt',
      content: 'Do you want to check the courier number：\n1234567890',
      confirmButtonText: 'Immediately query',
      cancelButtonText: 'Not needed',
      success: (result) => {
        my.alert({
          title: `${result.confirm}`,
        });
      },
    });
  },
});
