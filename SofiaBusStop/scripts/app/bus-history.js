var app = app || {};

(function(a) {
    function displayHistory() {
        var history = window.localStorage.getItem("history");
        
        var listElement = $('#history');
        
        var htmlToAdd = "";
        
        if (history != "") {
            var parsedHistory = jQuery.parseJSON(history);
        
            parsedHistory.forEach(function(log) {
                htmlToAdd = htmlToAdd + "<li>" + log + "</li>";
            });
        }
        listElement.html(htmlToAdd);
    }
    
    function deleteHistory() {
        window.localStorage.setItem("history", "");
        var listElement = $('#history');
        listElement.html("");
    }
    
    var viewModel = kendo.observable({
        deleteHistory:deleteHistory
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