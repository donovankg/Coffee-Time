angular.module("coffee-time",[])
.factory('alert',function(){

  function show(action, event){
    return $modal.open({
      templateUrl: 'event.html',
      controller: function(){
        this.action = action;
        this.event = event;
      },
      controllerAs: 'vm'
    });
  }
  return {
    show: show
  }
});
