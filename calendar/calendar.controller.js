
angular.module('coffee-time', ['mwl.calendar','ui.bootstrap']);
angular
  .module('coffee-time')
  .controller('calendarCtlr', function(moment, calendarConfig) {


    this.events = [{
      title: 'No event end date',
      startsAt: moment().hours(3).minutes(0).toDate(),
      color: calendarConfig.colorTypes.info
    }, {
      title: 'No event end date',
      startsAt: moment().hours(5).minutes(0).toDate(),
      color: calendarConfig.colorTypes.warning
    }];

    this.calendarView = 'month';
    this.viewDate = new Date();
    this.addEvent = function(){
      console.log('add new');
    }
  });
