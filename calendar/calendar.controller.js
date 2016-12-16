angular.module('coffee-time', ['mwl.calendar'])
  .controller('calendarCtlr', function() {

    this.events = [{
      title: 'No event end date',
      startsAt: moment().hours(3).minutes(0).toDate(),
      // color: calendarConfig.colorTypes.info
    }, {
      title: 'No event end date',
      startsAt: moment().hours(5).minutes(0).toDate(),
      // color: calendarConfig.colorTypes.warning
    }];

    this.calendarView = 'month';
    this.viewDate = new Date();

  });
