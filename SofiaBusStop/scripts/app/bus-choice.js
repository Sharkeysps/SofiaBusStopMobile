var app = app || {};

(function(a) {
    
    function saveChoice(){
        
    }
    
    
    
    var viewModel = kendo.observable({
       saveChoice:saveChoice
    });
    
    function init(e) {
        
          var p=5;
          kendo.bind(e.view.element, viewModel);
       // getNearestStop();
    }   
    
    a.choice = {
        init:init          
    };
}(app));