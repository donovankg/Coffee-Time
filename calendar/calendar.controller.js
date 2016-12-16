angular.module('coffee-time', ['mwl.calendar', 'ui.bootstrap']);
angular
    .module('coffee-time')
    .controller('calendarCtlr', function(moment, calendarConfig) {

        this.event;
        // this.seed = [{
        //   title: 'work on this ',
        //   startsAt: moment().hours(3).minutes(0).toDate(),
        //   endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        //   color: calendarConfig.colorTypes.info
        // }, {
        //   title: 'No event end date',
        //   startsAt: moment().hours(5).minutes(0).toDate(),
        //   endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        //   color: calendarConfig.colorTypes.warning
        // }];

        this.loadData = function() {
            var retrievedData = localStorage.getItem('events');
            this.events = JSON.parse(retrievedData);
        }
        this.toggle = function($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
        };
        this.loadData();



        this.calendarView = 'month';
        this.viewDate = new Date();
        this.title;
        this.addEvent = function() {

            this.applyEvent();
        }
        this.applyEvent = function() {
            var newEvent = {
                title: 'newTitle',
                startsAt: moment().hours(3).minutes(0).toDate(),
                endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),

                color: calendarConfig.colorTypes.info
            }

            this.events[this.events.length] = newEvent;
            console.log('- this.events-->', this.events);
            localStorage.setItem('events', JSON.stringify(this.events));

            this.loadData();
        }
    });
