var self = this;


$.ajax({
    url: 'citylist.json',             
    type : 'GET',
    dataType : 'json',                     
    success: function (data, textStatus) { 
        console.log(data, textStatus);
        var cityList = data;
        self.pushData(cityList);
    },
    error: function(e){
        console.log(e);
    } 
});

var pushData = function(cityList){
    var datalist = "";
    for (var i=0; i<cityList.length; i++){
        $('datalist').html(
            datalist += cityList[i].option
        )
    };
};
