const markers = [{
  id: 0,
  latitude: 30.266786,
  longitude: 120.10675,
  width: 19,
  height: 31,
  iconPath: '/image/mark_bs.png',
  callout: {
    content: 'callout',
  },
}];

const animMarker = [{
  id: 1,
  latitude: 30.266786,
  longitude: 120.10675,
  width: 19,
  height: 31,
  iconPath: '/image/mark_bs.png',
  // fixedPoint:{
  //   originX: 200,
  //   originY: 150,
  // },
  markerLevel: 2
}];

const animMarker1 = [{
  id: 2,
  latitude: 30.266786,
  longitude: 120.10674,
  width: 19,
  height: 31,
  iconPath: '/image/map_alr.png',
  // fixedPoint:{
  //   originX: 200,
  //   originY: 150,
  // },
  markerLevel: 2
}];

const labelMarker = [{
  id: 3,
  latitude: 30.266786,
  longitude: 120.10675,
  width: 19,
  height: 31,
  iconPath: '/image/mark_bs.png',
  label: {
    content: "Hello Label",
    color: "#00FF00",
    fontSize: 14,
    borderRadius: 3,
    bgColor: "#ffffff",
    padding: 10,
  },
  markerLevel: 2,
  anchorX: 0.5,
  anchorY: 1
}];
const labelMarker1 = [{
  id: 4,
  latitude: 30.266786,
  longitude: 120.10675,
  width: 19,
  height: 31,
  iconPath: '/image/mark_bs.png',
  label: {
    content: "Hello Label Test!!",
    color: "#00FF00",
    fontSize: 14,
    borderRadius: 3,
    bgColor: "#ffffff",
    padding: 10,
  },
  markerLevel: 2,
  anchorX: 0,
  anchorY: 0
}];
const customCalloutMarker = [{
  id: 5,
  latitude: 30.266786,
  longitude: 120.10675,
  width: 19,
  height: 31,
  iconPath: '/image/mark_bs.png',
  "customCallout": {
    "type": 2,
    "descList": [{
      "desc": "expect",
      "descColor": "#333333"
    }, {
      "desc": "5 minutes",
      "descColor": "#108EE9"
    }, {
      "desc": "arrivals",
      "descColor": "#333333"
    }],
    "isShow": 1
  },
  markerLevel: 2
}];

const customCalloutMarker0 = [{
  id: 6,
  latitude: 30.266786,
  longitude: 120.10675,
  width: 19,
  height: 31,
  iconPath: '/image/mark_bs.png',
  "customCallout": {
    "type": 0,
    "time": "5",
    "descList": [{
      "desc": "Click to take a taxi immediately",
      "descColor": "#333333"
    }],
    "isShow": 1
  },
  markerLevel: 2
}];

const customCalloutMarker1 = [{
  id: 7,
  latitude: 30.266786,
  longitude: 120.10675,
  width: 19,
  height: 31,
  iconPath: '/image/mark_bs.png',
  "customCallout": {
    "type": 1,
    "time": "3",
    "descList": [{
      "desc": "Click to take a taxi immediately",
      "descColor": "#333333"
    }],
    "isShow": 1
  },
  markerLevel: 2
}];
const iconAppendStrMarker = [{
  id: 8,
  latitude: 30.266786,
  longitude: 120.10675,
  width: 19,
  height: 31,
  iconAppendStr: "iconAppendStr",
  markerLevel: 2
}];
const iconAppendStrMarker1 = [{
  id: 34,
  latitude: 30.266786,
  longitude: 120.10675,
  width: 19,
  height: 31,
  iconAppendStr: "iconAppendStrTest!!",
  markerLevel: 2
}];
var myTrafficEnabled = 0;
var myCompassEnabled = 0;
var myScaleEnabled = 0;
var myGestureEnabled = 0;

const longitude = 120.10675;
// const longitude = 77.239204;
const latitude = 30.266786;
// const latitude = 28.589208;
const includePoints = [{
  latitude: 30.266786,
  longitude: 120.10675,
  // latitude: 28.589208,
  // longitude: 77.239204,
}];

Page({
  data: {
    scale: 14,
    longitude,
    latitude,
    includePoints,
  },
  onReady() {
    // 使用 my.createMapContext 获取 map 上下文
    this.mapCtx = my.createMapContext('map');
  },
  demoResetMap() {
    this.setData({
      scale: 14,
      longitude,
      latitude,
      includePoints,
      'ground-overlays': [],
      circles: [],
      polygon: [],
      polyline: [],
      markers: [],
    });
    this.mapCtx.clearRoute();
  },
  demoGetCenterLocation() {
    this.mapCtx.getCenterLocation({
      success: (res) => {
        my.alert({
          content: 'longitude:' + res.longitude + '\nlatitude:' + res.latitude + '\nscale:' + res.scale,
        });
        console.log(res.longitude);
        console.log(res.latitude);
        console.log(res.scale);
      },
    });
  },
  demoMoveToLocation() {
    this.mapCtx.moveToLocation();
  },
  demoMarkerAnimation() {
    // if (!my.canIUse('createMapContext.return.updateComponents')) {
    //   my.alert({ 
    //     title: 'Client version is too low',
    //     content: 'this.mapCtx.updateComponents 需要 10.1.35 及以上版本'
    //   });
    //   return;
    // } 
    this.setData({
      markers: animMarker,
    });
    // this.mapCtx.updateComponents({
    //   command:{
    //     markerAnim:[{markerId:1,type:0},],
    //   }
    // });
  },

  demoMarkerAnimation1() {
    this.setData({
      markers: animMarker1,
    });
  },
  demoMarkerLabel() {
    this.setData({
      scale: 14,
      longitude,
      latitude,
      includePoints,
      markers: labelMarker,
    });
  },
  demoMarkerLabel1() {
    this.setData({
      scale: 14,
      longitude,
      latitude,
      includePoints,
      markers: labelMarker1,
    });
  },
  demoMarkerCustomCallout() {
    this.setData({
      scale: 14,
      longitude,
      latitude,
      includePoints,
      markers: customCalloutMarker,
    });
  },
  demoMarkerCustomCallout1() {
    this.setData({
      scale: 14,
      longitude,
      latitude,
      includePoints,
      markers: customCalloutMarker1,
    });
  },
  demoMarkerCustomCallout0() {
    this.setData({
      scale: 14,
      longitude,
      latitude,
      includePoints,
      markers: customCalloutMarker0,
    });
  },
  demoMarkerAppendStr() {
    this.setData({
      scale: 14,
      longitude,
      latitude,
      includePoints,
      markers: iconAppendStrMarker,
    });
  },
  demoMarkerAppendStr1() {
    this.setData({
      scale: 14,
      longitude,
      latitude,
      includePoints,
      markers: iconAppendStrMarker1,
    });
  },
  demoTrafficOverlay() {
    // if (!my.canIUse('createMapContext.return.updateComponents')) {
    //   my.alert({ 
    //     title: 'Client version is too low',
    //     content: 'this.mapCtx.updateComponents 需要 10.1.35 及以上版本'
    //   });
    //   return;
    // } 
      myTrafficEnabled = (myTrafficEnabled + 1) % 2;
      this.mapCtx.updateComponents({ setting: { trafficEnabled: myTrafficEnabled } });
    // this.setData({
    //     setting:{
    //       trafficEnabled:myTrafficEnabled
    //     }
    // });
      console.log('trafficEnabled: ' + myTrafficEnabled)
      my.alert({
        content: 'trafficEnabled: ' + myTrafficEnabled,
      });

  },
  demoShowRoute() {
    this.mapCtx.showRoute({
      startLat: 30.257839,
      startLng: 120.062726,
      endLat: 30.256718,
      endLng: 120.059985,
      zIndex: 4,
      routeColor: '#FFB90F',
      iconPath: "/image/map_alr.png",
      iconWidth: 10,
      routeWidth: 10,
      success: function (res) {
        console.log(JSON.stringify(res))
        my.alert({
          content: 'showRoute: ' + JSON.stringify(res),
        });
      }
    });
  },
  demoCompass() {
    myCompassEnabled = (myCompassEnabled + 1) % 2;
    this.mapCtx.showsCompass({ isShowsCompass: myCompassEnabled });
  },
  demoScale() {
    myScaleEnabled = (myScaleEnabled + 1) % 2;
    this.mapCtx.showsScale({ isShowsScale: myScaleEnabled });
  },
  demoGesture() {
    myGestureEnabled = (myGestureEnabled + 1) % 2;
    this.mapCtx.gestureEnable({ isGestureEnable: myGestureEnabled });
  },
  demoPolyline() {
    this.setData({
      scale: 16,
      longitude,
      latitude,
      polyline: [{
        points: [{// 右上
          latitude: 30.264786,
          longitude: 120.10775,
        }, {// 左下
          latitude: 30.268786,
          longitude: 120.10575,
        }],
        color: '#FF0000DD',
        width: 10,
        dottedLine: false,
        iconPath: "/image/map_alr.png",
        iconWidth: 10,
      }],
    });
  },
  demoPolygon() {
    this.setData({
      scale: 14,
      longitude,
      latitude,
      polygon: [{
        points: [{// 右上
          latitude: 30.264786,
          longitude: 120.10775,
        }, {// 右下
          latitude: 30.268786,
          longitude: 120.10775,
        }, {// 左下
          latitude: 30.268786,
          longitude: 120.10575,
        }, {// 左上
          latitude: 30.264786,
          longitude: 120.10575,
        }],
        fillColor: '#BB0000DD',
        width: 5,
      }],
    });

  },
  demoPolygon1() {
    this.setData({
      scale: 16,
      longitude,
      latitude,
      polygon: [{
        points: [{// 右上
          latitude: 30.264786,
          longitude: 120.10775,
        }, {// 右下
          latitude: 30.268786,
          longitude: 120.10775,
        }, {// 左上
          latitude: 30.264786,
          longitude: 120.10575,
        }],
        fillColor: '#BB0000DD',
        width: 5,
      }],
    });

  },
  demoCircle() {
    this.setData({
      scale: 16,
      longitude,
      latitude,
      circles: [{
        longitude,
        latitude,
        color: '#BB76FF88',
        fillColor: '#BB76FF33',
        radius: 100,
        strokeWidth: 3,
      }]
    });
  },
  regionchange(e) {
    console.log('regionchange', e);

  },
  markertap(e) {
    console.log('marker tap', e);
    my.alert({
      title: "marker tap",
      content: 'markerId:' + e.markerId + '\nlatitude:' + e.latitude + '\longitude:' + e.longitude,
    });
  },

  tap(e) {
    console.log('tap');
    my.alert({
      title: "tap",
      content: 'latitude:' + e.latitude + '\longitude:' + e.longitude,
    });
  },
  callouttap(e) {
    console.log('callout tap', e);
    my.alert({
      title: "callouttap",
      content: 'markerId:' + e.markerId + '\nlatitude:' + e.latitude + '\longitude:' + e.longitude,
    });
  },

});
