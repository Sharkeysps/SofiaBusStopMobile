var app = app || {};

(function(a) {
    var busStopLat = 0;
    var busStopLong = 0;
    
    function getNearestStop() {
        var bus = window.localStorage.getItem("bus");
        var direction = window.localStorage.getItem("direction");
        
        cordovaExt.getLocation().
        then(function(location) {
            var parsedLat = parseFloat(location.coords.latitude);
            var parsedLong = parseFloat(location.coords.longitude);
            
            var parameter = {"Bus":bus,"Direction":direction,"Latitude":parsedLat,"Longitude":parsedLong};
            
            var postData = JSON.stringify(parameter);
            return httpRequest.postJSON(postData);     
        })
        .then(function(data) {        
            var stringedData = JSON.stringify(data);
            var parsedData = jQuery.parseJSON(stringedData);
            
            busStopLat = parseFloat(parsedData.BusStopLatitude);
            busStopLong = parseFloat(parsedData.BusStopLongitude);
            
            var testDiv = $('#test');
            parsedData.DistanceToStop = Math.round(parsedData.DistanceToStop);
            var template = 
            kendo
            .template("<div id='box'>Автобус #= Bus #</div><div>Спирка #= BusStopName #</div><div>Разстояние #= DistanceToStop # метра</div><div>График #= Schedule #</div>");
            var result = template(parsedData);
            testDiv.html(result);
        });
    }
    
    var viewModel = kendo.observable({
        getNearestStop:getNearestStop
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
           
        window.localStorage.setItem("prevPage", "views/bus-schedule-view.html#bus-schedule-view");
        
        if (!checkConnection.check()) {
            navigator.notification.alert("Моля свържете се с интернет", function() {
            })
        }
        else {
            getNearestStop();
        }
    }   
    
    a.schedule = {
        init:init          
    };
}(app));