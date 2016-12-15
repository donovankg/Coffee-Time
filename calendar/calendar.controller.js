
 angular.module("coffee-time", ['ui.calendar']).controller("calendarCtlr", function($scope) {

this.calendarMonth = 'place holder';
/* config object */
   $scope.uiConfig = {
     calendar:{
       height: 450,
       editable: true,
       header:{
         left: 'month basicWeek basicDay agendaWeek agendaDay',
         center: 'title',
         right: 'today prev,next'
       },
       eventClick: $scope.alertEventOnClick,
       eventDrop: $scope.alertOnDrop,
       eventResize: $scope.alertOnResize
     }
   };


});
