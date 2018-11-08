$(document).ready(function(){
    $( "#date" ).datepicker();
    $( "#city" ).autocomplete({
        source: ['Новосибирск','Москва','Магадан']
    })
    //после этого момента код вообще не работает. Не понимаю почему.Диалоговое окно создалось, а вот функция проверки инпутов не пашет
    
    var pattern = /^[a-zA-Z]+$/; // не понимаю, почему в браузере если пишу эту и следующие переменные в консоль, пишет андефайнд
    var value = $("#text").val()
    $('#dialog').dialog({
	    width: 400,
	    height: 300,
	    modal: true,
        autoOpen: false,
	    buttons: {
	    	OK: function(){
	    		$(this).dialog('close');
	    	}
	    }
	});
    
    //не знаю, что делать с этим куском кода)) выглядит правильно и не могу понять, что не так. Мб где-то контекст упускаю.

    var checkFields = function(){
        if(!pattern.test(value)){
            $('#text').addClass('.red', 300);
            $('#dialog').html(  value +' - неверное значение. Используйте только буквы!' );
            $('#dialog').dialog('open');
            
        } else {
            alert('Данные отправленны');
        };
    }
    $("#submit").onclick = checkFields;
});