window.httpRequest = (function(){
  
        function getJSON(url){
        var promise = new RSVP.Promise(function(resolve, reject){
            $.ajax({
                url:url,
                type:"GET",
                dataType:"json",
                contentType:"application/json",
                timeout:5000,
                success:function(data){
                    resolve(data);
                },
                error:function(err){
                    reject(err);
                }
            });
        });
        return promise;
    }
    
    function postJSON(parameter){
        var promise = new RSVP.Promise(function(resolve, reject){
            $.ajax({
                url:"http://sofiabusapi.apphb.com/api/bus/",
                type:"POST",
                dataType:"json",
                contentType:"application/json",
                data:parameter,
                timeout:5000,
                success:function(data){
                    resolve(data);
                },
                error:function(err){
                    reject(err);
                }
            });
        });
        return promise;
    }
    
    return {
        getJSON:getJSON,
        postJSON:postJSON
    };    
}());