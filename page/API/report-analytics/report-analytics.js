Page({
  reportAnalytics() {
    my.reportAnalytics('click', {spmId:'MiniApp_2168010000013806.page/API/report-analytics/report-analytics'});
    my.alert({
      content: 'upload success',
    });
  },
  reportAnalyticsExposure() {
    my.reportAnalytics('exposure', {spmId:'MiniApp_2168010000013806.page/API/report-analytics/report-analytics'});
    my.alert({
      content: 'upload success',
    });
  },
  reportAnalyticsCustom() {
    my.reportAnalytics('custom_click', {spmId:'MiniApp_2168010000013806.page/API/report-analytics/report-analytics'});
    my.alert({
      content: 'upload success',
    });
  },
  runtimeException() {
    // wrong javascrip
    a.b;
  }
});
