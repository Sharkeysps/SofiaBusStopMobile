var app = app || {};

(function(a) {
    /*function getAllPlaces(options){
    httpRequest.getJSON(app.servicesBaseUrl  + "places")
    .then(function(places){
    ret
    });
    }*/
    function getAlphabetically() {
        httpRequest.getJSON(app.servicesBaseUrl  + "places")
        .then(function(places) {
            viewModel.set("places", places); 
            console.log(places);
        });
    }
    
    
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
            testdiv.innerText=obj.Bus;
           
            
        });
    }
    
    
    function getByLocation() {
        
        cordovaExt.getLocation().
        then(function(location) {
            var locationString = location.coords.latitude + "," + location.coords.longitude;            
            return httpRequest.getJSON(app.servicesBaseUrl  + "places?location=" + locationString);     
        })
        .then(function(places) {
            viewModel.set("places", places); 
            console.log(places);
        });
    }
    
    var viewModel = kendo.observable({
        places:[],
        getAlphabetically: getAlphabetically,
        getByLocation: getByLocation,
        getNearestStop:getNearestStop
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
     //  getAlphabetically();
    }   
    
    a.places = {
        init:init          
    };
}(app));