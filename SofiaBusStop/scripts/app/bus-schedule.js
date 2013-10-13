var app = app || {};

(function(a) {
    var busStopLat = 0;
    var busStopLong = 0;
    
    function getNearestStop() {
        var testDiv = $('#test');
        testDiv.html("");
        
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
          
            parsedData.DistanceToStop = Math.round(parsedData.DistanceToStop);
            var template = 
            kendo
            .template("<div id='box'>Автобус #= Bus #</div><div>Спирка #= BusStopName #</div><div>Разстояние #= DistanceToStop # метра</div><div>График #= Schedule #</div>");
            var result = template(parsedData);
            testDiv.html(result);
            calculateDirection()
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
    
    function toDeg(rad) {
        return rad * 180 / Math.PI;
    }
    
    function calculateDirection() {
        //1
        var lat1 = 0;
        var long1 = 0;
        
        
        //2
        var lat2=busStopLat;
        var lon2=busStopLong;
        
        var currentHeading = 0;
        
        cordovaExt.getLocation().
        then(function(location) {
            lat1 = parseFloat(location.coords.latitude);
            long1 = parseFloat(location.coords.longitude);  
        });
        
        navigator.compass.getCurrentHeading(function(heading) {
            currentHeading = parseInt(heading.magneticHeading);
        }, function() {
        });
        
        //math magic
        var dLon = (lon2 - long1);
        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1)*Math.sin(lat2) -
                Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        var brng = toDeg(Math.atan2(y, x));
        
        var arrowDeg =(toDeg(((brng + 360)%360))+toDeg(currentHeading));
        
        arrowPosition(arrowDeg);
    }
    
    function arrowPosition(degree) {
        degree = Math.round(degree);
        var arrow = " <div id=\"arrow\" style=\"-webkit-transform: rotate(" + degree + "deg);\">" + "<img src=\"img/Arrow.png\"/>" + "</div>";
        var divArrow = $('#container');
        divArrow.html(arrow);
    }
    
    a.schedule = {
        init:init          
    };
}(app));