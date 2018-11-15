// взаимодействие с интерфейсом на клиенет (клики по кнопкам)
// запрос к API
// API отвечает на наши запросы
// в зависимости от ответов - перерисовываем интерфейс с учетом ответов
let Api = {
	load: 'cart/php/cart.php?method=get',
	add: 'cart/php/cart.php?method=add',
	remove: 'cart/php/cart.php?method=remove',
	clear: 'cart/php/cart.php?method=clear'
};
class Cart {
	constructor() {
		this.itemsCount = 0;
		this.totalAmount = 0;
		this.items = [];
		this.request(Api.load);
		this.setEvents();
	}
	onAdd(event, cb){
		let id = (typeof event == 'number') ? event : parseInt($(event.currentTarget).attr('data-id'));

		if (id) {
			this.request(Api.add, 'id=' + id, cb);
		}
	}
	onRemove(event){
		let id = parseInt($(event.currentTarget).attr('data-id'));

		if (id) {
			this.request(Api.remove, 'id=' + id)
		}
	}
	onClear(cb) {
		this.request(Api.clear, cb);
	}
	setEvents() {
		$('.btn-add').on('click', this.onAdd.bind(this));
		$('.btn-remove').on('click', this.onRemove.bind(this));
		$('.btn-clear').on('click', this.onClear.bind(this));
	}
	getProduct(productId) {
		return this.items.find(function(item){
			return item.id == productId;
		});
	}
	removeProduct(productId) {
		let item = this.getProduct(productId);
		if (item) {
			if (item.count > 0) {
				--item.count;
			}
			if (item.count <= 0) {
				let index = this.items.indexOf(item);
				if (index !== -1) {
					this.items.splice(index, 1);
				}
			}
		} 
	}
	addProduct(product) {
		let item = this.getProduct(product.id);

		if (!item) {
			this.items.push(product);
		} else {
			++item.count;
		}
	}
	process(url, response){
		if (response.result) {
			switch (url) {
				case Api.load:
					this.items = response.items;
					break;
				case Api.add:
					this.addProduct(response.item);
					break;
				case Api.remove:
					this.removeProduct(response.id);
					break;
				case Api.clear:
					this.items = [];
					break;
			}
			this.calc();
			this.render();
		}
	}
	calc() {
		this.itemsCount = 0;
		this.totalAmount = 0;

		this.items.forEach(function(item){
			if (item.count > 0) {
				this.itemsCount += item.count;
				this.totalAmount += item.price * item.count;
			}
		}, this);
	}
	render() {
		$('#cart .items').html(this.itemsCount); // общее число товаров
		$('#cart .amount').html(this.totalAmount); // общая сумма по всем товарам

		// для всех продуктов
		$('.product').find('.count').html('0');
		this.items.forEach(function(item){
			$('#products .product-' + item.id).find('.count').html(item.count);

		}, this);
	}
	request(url, data, cb) {
		$.get({
			url: url,
			data: data,
			dataType: 'json',
			context: this,
			success: function(response) {
				this.process(url, response);
				if (cb) {
					cb();
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
};

$(document).ready(function(){
	window.cart = new Cart();
});