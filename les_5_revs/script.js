//изначально мне не совсем понятна идея выводить отзывы из существующего конфига. Я решил попробовать добавлять их и удалять динамически, но что-то пошло не так))


let Api = {
	load: 'json/review.list.json',
	add: 'json/review.add.json',
	remove: 'json/review.delete.json',
	send: 'json/review.submit.json',
	qeue: 'json/qeue.submit.json'
};

class reviewRaw {
    constructor(){
        this.comitOrNot();
		this.fetchRevs(Api.load);
		//this.fetchQueue(Api.qeue) // должно подтягивать список отзывов на модерации
		this.setQeue();
		this.revCount();
		this.setEvent();
    }


	comitOrNot(){ //будет либо удалять, либо одобрять отзывы
		
	}

	setEvent(){ // начать решил с одного, котоырый должен отдавать значение textarea в новый блок для модерации. Не сложно догадаться, что не работает.
		$('#send').onclick = function(){
			$('.checkContent').append('<div class="checkRev" data-queue="" ><p>'+ $('#textarea').val() +'</p></div><a class="modBtn" data-result="1" href="#">Одобрить</a>'+'<a class="modBtn" data-result="0" href="#">Отклонить</a>');
			$('#textarea').val()='';
		};
	}

	revCount() {
		let revs = $('.checkRev');
		$('h3').text("Отзывов на модерации: " + revs.length);
	}

	setQeue(){
		var qeueRevs = $('.checkRev');
		for (var i = 0; i < qeueRevs.length; i++){
			qeueRevs[i].setAttribute('data-qeue', i);	
		}
	}

    createRev(response) {
        var review = '<div class="comitRev"><span>#'+ response.id_comment + '</span><p>' + response.text + '</p></div>';
        $('.comited').html(review);
        $('.comited div').addClass('comitRev');
	}

	//так и не смог реализовать свитч в зависимости от загружаемого конфига. Совсем запутался куда и какой контекст нужно передавать. Поэтому сделал только вывод отзыва из конфига.
		
    fetchRevs(url, data) {
		$.get({
			url: url,
			data: data,
			dataType: 'json',
			context: this,
			success: function(response) {
				this.createRev(response);
			},
			error: function(error) {
				console.log(error);
			}
		});
	}
};

$(document).ready(function(){
	window.cart = new reviewRaw();
});