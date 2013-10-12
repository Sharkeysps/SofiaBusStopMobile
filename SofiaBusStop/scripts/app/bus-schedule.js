var app = app || {};

(function(a) {
    function getNearestStop() {
        var bus = window.localStorage.getItem("bus");
        var direction = window.localStorage.getItem("direction");
        
        cordovaExt.getLocation().
        then(function(location) {
            var parsedLat = parseFloat(location.coords.latitude);
            var parsedLong = parseFloat(location.coords.longitude);
            var parameter = {"Bus":bus,"Direction":direction,"Latitude":parsedLat,"Longitude":parsedLong};
            var test = JSON.stringify(parameter);
            return httpRequest.postJSON(test);     
        })
        .then(function(data) {        
            var test = JSON.stringify(data);
            var obj = jQuery.parseJSON(test);
            var testDiv = $('#test');
            obj.DistanceToStop = Math.round(obj.DistanceToStop);
            var template = 
            kendo
            .template("<div id='box'>Автобус #= Bus #</div><div>Спирка #= BusStopName #</div><div>Разстояние #= DistanceToStop # метра</div><div>График #= Schedule #</div>");
            var result = template(obj);
            var test = testDiv.html(result);
        });
    }
    
    var viewModel = kendo.observable({
        getNearestStop:getNearestStop
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
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