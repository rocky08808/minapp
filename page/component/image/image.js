Page({
  data: {
    array: [{
      mode: 'scaleToFill',
      text: 'scaleToFill：Do not maintain the aspect ratio to scale the image to fit the image completely',
    }, {
      mode: 'aspectFit',
      text: 'aspectFit：Keep the aspect ratio to scale the image so that the long side of the image is fully displayed',
    }, {
      mode: 'aspectFill',
      text: 'aspectFill：Keep the aspect ratio to scale the image, only to ensure that the short side of the image is fully displayed',
    }, {
      mode: 'widthFix',
      text: 'widthFix：The width is constant, the height changes automatically, and the aspect ratio of the original image remains unchanged.',
    }, {
      mode: 'top',
      text: 'top：Do not scale the image, only the top area of the image',
    }, {
      mode: 'bottom',
      text: 'bottom：Do not scale the image, only the bottom area of the image',
    }, {
      mode: 'center',
      text: 'center：Do not scale the image, only the middle area of the image',
    }, {
      mode: 'left',
      text: 'left：Do not scale the image, only show the left side of the image',
    }, {
      mode: 'right',
      text: 'right：Do not scale the image, only the right side of the image',
    }, {
      mode: 'top left',
      text: 'top left：Do not scale the image, only show the top left area of the image',
    }, {
      mode: 'top right',
      text: 'top right：Do not scale the image, only the top right area of the image',
    }, {
      mode: 'bottom left',
      text: 'bottom left：Do not scale the image, only show the lower left area of the image',
    }, {
      mode: 'bottom right',
      text: 'bottom right：Do not scale the image, only the lower right area of the image',
    }],
    src: '/image/ant.png',
  },
  imageError(e) {
    console.log('Image An error event occurred with a value of', e.detail.errMsg);
  },
  onTap(e) {
    console.log('image occur tap event', e);
  },
  imageLoad(e) {
    console.log('image loaded successfully', e);
  },
});
