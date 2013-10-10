var app = app || {};

(function(a) {
    
    function getNearestStop(){
        

        cordovaExt.getLocation().
        then(function(location) {
            var locationString = location.coords.latitude + "," + location.coords.longitude;
            var parsedLat=parseFloat(location.coords.latitude);
            var parsedLong=parseFloat(location.coords.longitude);
            var parameter={"Bus":"88","Direction":1,"Latitude":parsedLat,"Longitude":parsedLong};
            var test=JSON.stringify(parameter);
            return httpRequest.postJSON(test);     
        })
        .then(function(data) {        
            var test=JSON.stringify(data);
           var obj = jQuery.parseJSON(test);
           var testDiv = $('#test');
           obj.DistanceToStop=Math.round(obj.DistanceToStop);
            var template = 
            kendo
            .template("<div id='box'>Автобус #= Bus #</div><div>Спирка #= BusStopName #</div><div>Разстояние #= DistanceToStop # метра</div><div>График #= Schedule #</div>");
            var result=template(obj);
            var test=testDiv.html(result);
           // var test=testDiv.html("<div>Avtobus " + obj.Bus+"</div>"+"<div>Spirka "+obj.BusStopName+"</div>");
            
        });
    }
    
    
    
    var viewModel = kendo.observable({
        getNearestStop:getNearestStop
    });
    
    function init(e) {
        
          var p=5;
          kendo.bind(e.view.element, viewModel);
       // getNearestStop();
    }   
    
    a.schedule = {
        init:init          
    };
}(app));