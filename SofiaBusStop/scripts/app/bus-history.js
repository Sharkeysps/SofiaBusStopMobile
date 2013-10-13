var app = app || {};

(function(a) {
    function displayHistory() {
        var history = window.localStorage.getItem("history");
        
        var listElement = $('#history');
        
        var htmlToAdd = "";
        
        var parsedHistory = jQuery.parseJSON(history);
        
        parsedHistory.forEach(function(log) {
            htmlToAdd = htmlToAdd + "<li>" + log + "</li>";
        });
        
        listElement.html(htmlToAdd);
    }
    
    var viewModel = kendo.observable({
      
    });
    
    function init(e) {

        kendo.bind(e.view.element, viewModel);
           
        window.localStorage.setItem("prevPage", "views/bus-history-view.html#bus-history-view");
        displayHistory();
    }   
    
    a.history = {
        init:init          
    };
}(app));