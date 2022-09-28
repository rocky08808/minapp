Page({
  onPromot(){
    my.prompt({
      title: 'Title',
      message: 'Explain the current status and prompt the user solution. It is best not to exceed two lines.',
      placeholder: 'Leave a message to a friend',
      okButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      success: (result) => {
        my.alert({
          title: JSON.stringify(result),
        });
      },
    });
  },
});
