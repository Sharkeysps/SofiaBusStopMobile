var app = app || {};

(function() {
    document.addEventListener("deviceready", function() {
        var history = window.localStorage.getItem("history");
        if (history===null) {
            var logs = [];
            window.localStorage.setItem("history", JSON.stringify(logs));
        }
        
        app.application = new kendo.mobile.Application(document.body);
        
    });
    
    document.addEventListener("pause", function () {
        var prevPage = window.localStorage.getItem("prevPage");
            
        if (prevPage != null) {
            app.application.navigate(prevPage);
        }
    }, false);
}());