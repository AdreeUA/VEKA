/*
 * Calc
 */

$(function(){
	var calcPanel = $('.calc-panel');

	$(document).on('click', '.js-favToggleLink', function(){
		calcPanel.toggleClass('is-open');
	});

	$(document).on('click', '.js-favHideLink', function(){
		calcPanel.removeClass('is-open');
	});
});


var calculator = {
	windows: [],
	data: {
		//решение Века
		decisions: [ // http://joxi.ru/Q2KDPpqI40nloA - вот это говно должно падать туда
			{
				id: 1,
				title: "Окно для загородного дома"
			},
			{
				id: 2,
				title: "Окно для защиты от шума"
			},
			{
				id: 3,
				title: "Окно для детской"
			},
			{
				id: 4,
				title: "Окно с защитой от взлома"
			},
			{
				id: 5,
				title: "Энергоэффективное окно"
			},
			{
				id: 6,
				title: "Простое окно"
			}
		],
		// Профиль Века
		profiles: [
			{
				id: 1,
				title: "EUROLINE"
			},
			{
				id: 2,
				title: "VEKASLIDE"
			},
			{
				id: 3,
				title: "PROLINE"
			},
			{
				id: 4,
				title: "SOFTLINE"
			},
			{
				id: 5,
				title: "SOFTLINE 82"
			}, 
			{
				id: 6,
				title: "ALPHALINE"
			}
		],
		// Стеклопакет
		glazed: [
			{
				id: 1,
				title: "Двухкамерные стеклопакеты"
			},
			{
				id: 2,
				title: "Однокамерные стеклопакеты"
			},
			{
				id: 3,
				title: "Энергосберегающие стеклопакеты"
			},
			{
				id: 4,
				title: "Декоративная раскладка"
			}
		],
		//цвет
		colors: [ //http://veka.demo.notamedia.ru/bitrix/admin/iblock_element_admin.php?IBLOCK_ID=30&type=production&lang=ru&find_el_y=Y
			{
				id: 1,
				title: 'Белый',
				image: 'http://veka.demo.notamedia.ru/upload/iblock/cc8/cc87f8cf7e604311b4c5fe6c7f254bda.jpg'
			},
			{
				id: 2,
				title: 'вариант 2',
				image: 'http://veka.demo.notamedia.ru/upload/iblock/799/7991090fb7daa42fb921fdeb1687386c.jpg'
			},
			{
				id: 3,
				title: 'вариант 3',
				image: 'http://veka.demo.notamedia.ru/upload/iblock/761/761b000ebb2caad0e170c8b05e1194cc.jpg'
			},
			{
				id: 4,
				title: 'вариант 4',
				image: 'http://veka.demo.notamedia.ru/upload/iblock/e4d/e4df667da1aae044ec3c12c1433ab7cf.jpg'
			},
			{
				id: 5,
				title: 'вариант 5',
				image: 'http://veka.demo.notamedia.ru/upload/iblock/74d/74d414fbb234859ca284a85673322d57.jpg'
			},
			{
				id: 6,
				title: 'вариант 6',
				image: 'http://veka.demo.notamedia.ru/upload/iblock/7b9/7b9e01fdca59498c43e93bd6c1f580b1.jpg'
			},
			{
				id: 7,
				title: 'вариант 7',
				image: 'http://veka.demo.notamedia.ru/upload/iblock/b0a/b0a5b28bf00c3f5aea09b2475ead1f2b.jpg'
			}
		],
		sashes: [
			{
				id: 'g',
				title: "Глухое"
			},
			{
				id: 'po',
				title: "Поворотно-откидное"
			},
			{
				id: 'p',
				title: "Поворотное"
			},
			{
				id: 'o',
				title: "Откидное"
			}
		],
		formats: [
			{
				id: 1,
				title: "Одностворчатое окно",
				sashes: ['p']
			},
			{
				id: 2,
				title: "Двухстворчатое окно",
				sashes: ['g','po']
			},
			{
				id: 3,
				title: "Трехстворчатые окна",
				sashes: ['g','po','g']
			},
			{
				id: 4,
				title: "Трехстворчатые окна с фрамугой",
				sashes: ['o','g','po','g']
			},
			{
				id: 5,
				title: "Балконный блок двухстворчатый",
				sashes: ['po','g','po']
			},
			{
				id: 6,
				title: "Балконный блок одностворчатый",
				sashes: ['po','po']
			},
			{
				id: 7,
				title: "Нестандартная конструкция",
				sashes: ['g','po','g']
			}
		]
	},
	inputs: {
		decisions: $('select[name="decisions"]'),
		profiles:  $('select[name="profiles"]'),
		glazed:    $('select[name="glazed"]'),
		colors:    $('select[name="color"]'),
		weight:    $('input[name="weight"]'),
		height:    $('input[name="height"]'),
		name:      $('input[name="name"]')
	},
	init: function () {
		this.getBuffer();

		for (input in this.inputs) {
			watchInput(input);
		};
		$('.js-new-window').click(function () {
			calculator.newWindow();
			calculator.renderPage();
		});
		$('.window-type__elem').click(function () {
			calculator.current.formats = $(this).data('id');

			for (var i = 0; i < calculator.data.formats.length; i++) {
				if (calculator.data.formats[i].id == calculator.current.formats) {
					calculator.current.sashes = calculator.data.formats[i].sashes;
				}
			}

			calculator.saveBuffer();
			calculator.renderPage();
		});
	},
	renderPage: function () {
		this.inputs.name.val(this.current.name);
		renderText('.section__title', this.current.name);

		this.inputs.weight.val(this.current.weight);
		renderText('.window-image__size.width span', this.current.weight+' мм');
		this.inputs.height.val(this.current.height);
		renderText('.window-image__size.height span', this.current.height+' мм');

		renderHtml(this.data.decisions, this.inputs.decisions, this.current.decisions);
		renderHtml(this.data.profiles, this.inputs.profiles, this.current.profiles);
		renderHtml(this.data.glazed, this.inputs.glazed, this.current.glazed);
		renderHtml(this.data.colors, this.inputs.colors, this.current.colors, 'c');

		$('.window-type__elem').removeClass('is-active');
		$('.window-type__elem[data-id="'+this.current.formats+'"]').addClass('is-active');

		$('.js-favToggleLink .calc-panel__count').html('- '+this.windows.length+decles(this.windows.length,[' ок','он','но','на']));
		
		var html = '';
		for (var i = 0; i < this.windows.length; i++) {		
			html += '<div class="window-fav__elem">\
			    <div onclick="calculator.openWindow('+this.windows[i].id+')" class="window-fav__icon">\
			        <svg class="icon icon-window-type'+(this.windows[i].formats!=1?'-'+this.windows[i].formats:'')+'">\
			            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-window-type'+(this.windows[i].formats!=1?'-'+this.windows[i].formats:'')+'"></use>\
			        </svg>\
			    </div>\
			    <div onclick="calculator.openWindow('+this.windows[i].id+')" class="window-fav__info">\
			        <div class="window-fav__title">'+this.windows[i].name+'</div>\
			        <div class="window-fav__size">'+this.windows[i].weight+' х '+this.windows[i].height+' мм</div>\
			    </div>\
			    <div class="window-fav__controls">\
			        <div onclick="calculator.copyWindow('+this.windows[i].id+')" class="window-fav__control">\
			            <svg class="icon icon-doc ">\
			                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-doc"></use>\
			            </svg>\
			        </div>\
			        <div onclick="calculator.removeWindow('+this.windows[i].id+')" class="window-fav__control">\
			            <svg class="icon icon-trash ">\
			                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>\
			            </svg>\
			        </div>\
			    </div>\
			</div>';
			$('.calc-panel__window .window-fav').html(html);
		}

		if (this.current.sashes.length) {
			console.log(this.current.sashes);
			var sashes = '';
			$('.sashes-bl').html('');
			for (var i = 0; i < this.current.sashes.length; i++) {
				sashes = '<select data-ind="'+i+'" class="select select-sashes js-select">';
				for (var k = 0; k < this.data.sashes.length; k++) {
					sashes +='<option value="'+this.data.sashes[k].id+'">'+this.data.sashes[k].title+'</option>'
				}
				sashes += '</select>';
				$('.sashes-bl').append(sashes);
				$('.select-sashes[data-ind="'+i+'"]').val(this.current.sashes[i]);
			}
			$('.select-sashes').styler({
				singleSelectzIndex: 1,
				selectSmartPositioning: false,
				selectSearch: $(this).data('search') || false,
				onSelectClosed: function () {
					var ind = $(this).data('ind');
					for (var i = 0; i < calculator.current.sashes.length; i++) {
						if (ind == i) {
							calculator.current.sashes[i] = $(this).find('select').val();
							break;
						}
					}
					calculator.saveBuffer();
					calculator.getImage();
				}
			});
		}
		else {
			$('.sashes-bl').html('<textarea placeholder="описание конструкции в произвольной форме"></textarea>');
		}
		this.getImage();
	},
	getImage: function () {
		var link = '/local/templates/.default/markup_veka/build/images/windows/'+this.current.formats+'/'+this.current.colors+'/';
		console.log(this.current.sashes);
		for (var i = 0; i < this.current.sashes.length; i++) {
			link += this.current.sashes[i];
			if (i != this.current.sashes.length-1) {
				link +='_';
			}
		}
		link +='.jpg';
		console.log(link);
		$('.window-image__elem img').attr({'src':link});
	},
	copyWindow: function (id) {
		for (var i = 0; i < this.windows.length; i++) {
			if(this.windows[i].id == id) {
				var copiedObject = $.extend({}, this.windows[i])
				copiedObject.id = Date.now();
				copiedObject.name += ' - копия';
				this.windows.push(copiedObject);
				this.saveBuffer();
				this.renderPage();
			}
		}
	},
	removeWindow: function (id) {
		if (this.windows.length == 1) {
			alert('Должно быть минимум одно окно');
			return false;
		}
		for (var i = 0; i < this.windows.length; i++) {
			if(this.windows[i].id == id) {
				this.windows.splice(i,1);
				this.saveBuffer();
				this.renderPage();
			}
		}
	},
	openWindow: function (id) {
		for (var i = 0; i < this.windows.length; i++) {
			if(this.windows[i].id == id) {
				this.current = this.windows[i];
				this.saveBuffer();
				this.renderPage();
				$('.calc-panel').toggleClass('is-open');
			}
		}
	},
	initWindow: function (window) {
		for (var i = 0; i < this.data.formats.length; i++) {
			if (this.data.formats[i].id == window.formats) {
				window.sashes = this.data.formats[i].sashes;
			}
		}
		this.windows.push(window);
		this.current = this.windows[this.windows.length-1];
	},
	newWindow: function () {
		this.initWindow({
			id: Date.now(),
			name: "Окно на кухню",
			weight: 1300,
			height: 1460,
			decisions: 1,
			profiles: 1,
			glazed: 1,
			formats: 2,
			colors: 1
		});
		this.saveBuffer();
	},
	getBuffer: function () {
		this.windows = JSON.parse(sessionStorage.getItem('windows'));
		if (!this.windows) {
			this.windows = [];
			this.newWindow();
		}
		else {
			this.current = this.windows[this.windows.length-1];
		}
		this.renderPage();
	},
	saveBuffer: function () {
		var windows = JSON.stringify(this.windows)
		sessionStorage.setItem('windows', windows);
	},
	current: {}
}

function watchInput (input){
	var type = '';
	if (calculator.inputs[input].attr('type') == 'text') {
		type = 'keyup';
	}
	else {
		type = 'change';	
	}

	calculator.inputs[input].on(type, function () {
		var val = $(this).val();
		if (calculator.inputs[input].attr('name') == 'weight' || calculator.inputs[input].attr('name') == 'height') {
			console.log(213);
			var rep = /[-\.;":'a-zA-Zа-яА-Я]/; 
		    if (rep.test(val)) { 
		    	console.log(33)
		        val = val.replace(rep, '');  
		    } 
		}
		calculator.current[input] = val;
		calculator.renderPage();
		calculator.saveBuffer();
	});
}

function renderText (selector, text) {
	$(selector).html(text);
}

function renderHtml (data, input, current, type) {
	var decisionHtml = '';
	for (var i = 0; i < data.length; i++) {
		decisionHtml += '<option '+(data[i].image?'data-img="'+data[i].image+'"':'')+' value="'+data[i].id+'">'+data[i].title+'</option>'
	}
	input.html(decisionHtml).val(current).trigger('refresh');
	if (type) {
		var c = '';
		for (var i = 0; i < data.length; i++) {
			if (data[i].id == current) {
				c = data[i].image;
			}
		}
		$('.select__color .jq-selectbox__select').prepend('<img class="color-p" src="'+c+'">');

		$('.select__color .jq-selectbox__dropdown li').each(function () {
			var img = $(this).data('img');
			$(this).prepend('<img class="color-p" src="'+img+'">');
		});
	}
}

$(document).ready(function () {
	calculator.init();
});