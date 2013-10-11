var app = app || {};

(function(a) {
    var busNumber = 0;
    
    var viewModel = kendo.observable({
        categories:[],
        selectedCategory:null,
        change:onCategoryChanged,
        getSearchData:getSearchData
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        httpRequest.getJSON("http://sofiabusapi.apphb.com/api/bus/")
        .then(function (categories) {
            viewModel.set("categories", categories.Busses);            
        });   
    }
    
    function getSearchData() {
        var busValue = busNumber;
        var direction = $('#category-info').val();
        //Pass these two variables to the other view
       
        window.localStorage.setItem("bus", busValue);
        window.localStorage.setItem("direction", direction);
      
    }
    
    function onCategoryChanged(e) {             
        busNumber = e.sender._selectedValue;
        
        httpRequest.getJSON("http://sofiabusapi.apphb.com/api/bus/" + e.sender._selectedValue)
        .then(function(category) {
            viewModel.set("selectedCategory", category);
        });
    }
    
    a.choice = {
        init:init          
    };
}(app));