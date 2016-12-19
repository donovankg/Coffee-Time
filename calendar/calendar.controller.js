
angular.module('coffee-time', ['mwl.calendar', 'ui.bootstrap']);
angular
    .module('coffee-time')
    .controller('calendarCtlr', function(moment, calendarConfig) {
this.showAdd = true;
        this.events;

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
        console.log(this.events);


        this.deleteEntry = function(index) {

            this.events.splice(index, 1)
            localStorage.setItem('events', JSON.stringify(this.events));

        }
        this.calendarView = 'month';
        this.viewDate = new Date();
        this.title;
        this.closeWindow= function(){
          localStorage.setItem('events', JSON.stringify(this.events));

          this.showAdd = true;
          // this.applyEvent();

        }
        this.addEvent = function() {

            // this.applyEvent();
            this.showAdd =false;
        }

        this.applyEvent = function() {
            var newEvent = {
                title: 'newTitle',
                startsAt: new Date(2016, 11, 15, 1),
                endsAt: new Date(2016, 11, 16, 15),
                color: calendarConfig.colorTypes.info
            }

            this.events[this.events.length] = newEvent;
            console.log('- this.events-->', this.events);
            localStorage.setItem('events', JSON.stringify(this.events));

            this.loadData();
        }
    });
