import svg4everybody from 'svg4everybody';
// import $ from 'jquery';
import slick from 'slick-carousel';
// import select2 from 'select2';
import SimpleBar from 'simplebar';
import 'magnific-popup';
import niceScroll from 'nicescroll';
import 'selectize';


(function ($) {

	svg4everybody();

	$(function() {

		let styles = [
			'padding: 2px 9px',
			'background: #82B93C',
			'color: #fff',
			'display: inline-block',
			'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2)',
			'box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.2) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
			'line-height: 1.56',
			'text-align: left',
			'font-size: 16px',
			'font-weight: 400'
		].join(';');

		console.log('%c developed by igor gorlov https://webjeb.ru', styles);


		// Toggle buttons


		$('.form__field_buttons .form__button').on('click', function () {
			$(this).toggleClass('form__button_active');
			$(this).siblings().removeClass('form__button_active');
		});


		// Placeholders

		// $('.form__select, .form__field_buttons').each(function () {
		//  let placeholder = $(this).data('placeholder');
		//  $(this).next().text(placeholder);
		// });

		// $('.form__field_buttons').each(function () {
		//  let placeholder = $(this).data('placeholder');
		//  $(this).find('.form__placeholder').text(placeholder);
		// });


		// Style fields

		let $select = $('.form__select').selectize({
			maxItems: 1,
			onDropdownOpen: function($dropdown) {
				$('.selectize-dropdown-content').niceScroll({
					cursorborder: "none",
					cursorcolor: "#268AE1",
					cursorwidth: "4px",
					autohidemode: false,
					cursorborderradius: '4px',
					hwacceleration: true, 
					railpadding: { top: 0, right: 2, left: 0, bottom: 0 },
					horizrailenabled: false,
				})
			}
		});

		// fetch the instance
		// let selectize = $select.selectize.destroy();

		$(window).on('resize load',function(){
			if ( $(window).width() < 768 )  {

				let selectize = $select.each(function () { // do this for every select with the 'combobox' class
					$(this)[0].selectize.destroy(); // destroys selectize()
				});
				
			}
		});


		// if ( $(window).width() > 576 )  {

		// 	let selectize = $select.each(function () { // do this for every select with the 'combobox' class
		// 		$(this)[0].selectize.destroy(); // destroys selectize()
		// 	});
				
		// }




		$('.map__list').niceScroll({
			cursorborder: "none",
			cursorcolor: "#268AE1",
			cursorwidth: "4px",
			background:"#EEEEEE",
			autohidemode: false,
			cursorborderradius: '4px',
			hwacceleration: true, 
			railpadding: { top: -2, right: -2, left: 0, bottom: 0 },
			horizrailenabled: false,
		});




		// Tabs


		$('.tabs__nav li').click(function(e) {
			var a = $(this),
			parent = a.parents('.tabs'),
			nav = parent.children('.tabs__nav').children('li'),
			box = parent.children('.tabs__content').children('div');

			if (!a.hasClass('active')) {
				a.addClass('active')
					.siblings().removeClass('active');

				box.eq(a.index()).addClass('active')
					.siblings().removeClass('active');
			}

			e.preventDefault();

			// $('.form__select').selectize.destroy().selectize();
		});



		// Trigger main menu

		let $navTrigger = $('.nav__trigger');
		let $navOpenBg = $('.page__nav-bg');

		$navTrigger.on('click', function () {
			$(this).parent('.nav').toggleClass('nav_open');
			$navOpenBg.toggleClass('page__nav-bg_active');
		});

		$navOpenBg.on('click', function () {
			$(this).removeClass('page__nav-bg_active');
			$navTrigger.parent('.nav').toggleClass('nav_open');
		});

		$(window).resize(function() {
			if ( $(window).width() > 576 )  {
				$('.header__nav').removeClass('nav_open');
				$('.page__nav-bg').removeClass('page__nav-bg_active');

			} 
		});


		// Trigger topmenu

		let $navTriggerTop = $('.nav__trigger-top');

		$navTriggerTop.on('click', function () {
			$(this).parent('.nav').toggleClass('nav_open');
		});


		// Close topmenu 

		let $navTop = $('.nav_top');

		$(document).on('click', function(e) {
			if (!$(e.target).closest('.nav_top').length) {
				$navTop.removeClass('nav_open');
			}
		});
		

		// Priority Nav

		function calcWidth() {
			let navwidth = 0;
			let morewidth = $('.nav__item_more').outerWidth(true);
			$('.nav__list_main > li:not(.nav__item_more)').each(function() {
				navwidth += $(this).outerWidth( true );
			});
			let availablespace = $('.nav__list_main').outerWidth(true) - morewidth;
		  
			if (navwidth > availablespace) {
				let lastItem = $('.nav__list_main > li:not(.nav__item_more)').last();
				lastItem.attr('data-width', lastItem.outerWidth(true));
				lastItem.prependTo($('.nav__list_main .nav__item_more ul'));
				calcWidth();
			} else {
				let firstMoreElement = $('.nav__list_main li.nav__item_more li').first();
				if (navwidth + firstMoreElement.data('width') < availablespace) {
					firstMoreElement.insertBefore($('.nav__list_main .nav__item_more'));
				}
			}
		  
			if ($('.nav__item_more li').length > 0) {
				$('.nav__item_more').css('display','inline-block');
			} else {
				$('.nav__item_more').css('display','none');
			}
		}

		calcWidth();

		$(window).on('resize load',function(){
			if ( $(window).width() > 576 )  {
				calcWidth();
			}
		});



		$('.nav__item_more').on('click', function () {
			$(this).toggleClass('nav__item-show');
		});


		// Close more nav 

		let $navMore = $('.nav__item_more');

		$(document).on('click', function(e) {
			if (!$(e.target).closest('.nav_main').length) {
				$navMore.removeClass('nav__item-show');
			}
		});


		


		


		// Popup

		let $openPopup = $('.open-popup');

		$openPopup.magnificPopup({
			type:'inline',
			midClick: true,
			mainClass: 'page__popup-bg'
		});

		// Fixed header

		let $header = $('.header');
		let $page = $('.page');
		let $windowWidth = $(window).width();

		if ( $windowWidth <= 576 )  {
		 $page.css({
		     'padding-top': $('.header').outerHeight()
		 });
		 $header.addClass('header_fixed_true');
		} else {
		 $page.css({
		     'padding-top': 0
		 });
		 $header.removeClass('header_fixed_true');
		}

		$(window).resize(function() {
		 if ( $(window).width() <= 576 )  {
		     $page.css({
		         'padding-top': $('.header').outerHeight()
		     });
		     $header.addClass('header_fixed_true');
		 } else {
		     $page.css({
		         'padding-top': 0
		     });
		     $header.removeClass('header_fixed_true');
		 }
		});


		// Search input

		const $fieldSearchDrop = $('.form__drop-w');
		const $formInputDrop = $('.form__input_drop');

		$fieldSearchDrop.on('click', function () {
			$formInputDrop.toggleClass('form__input_hide');
		});


		$(document).on('click', function(e) {
			if (!$(e.target).closest('.form_search').length) {
				$formInputDrop.addClass('form__input_hide');
			}
		});


		// Sizes Show more

		const $popularSizesMoreButton = $('.popular-sizes__more');
		const $popularSizesList = $('.popular-sizes__list');


		$('.popular-sizes__more').on('click', function (e) {
			e.preventDefault();
			$(this).toggleClass('popular-sizes__more_true');
			$popularSizesList.toggleClass('popular-sizes__list_full');
		});


		// Popular auto carousel


		const $popularAuto = $('.popular-cars__carousel');

		if( $popularAuto.length > 0 ) {
			$popularAuto.slick({
				mobileFirst: true,
				dots: false,
				arrows: true,
				infinite: true,
				slidesToShow: 2,
				speed: 300,
				adaptiveHeight: false,

				prevArrow: '<button class="popular-cars__arrow popular-cars__arrow_prev"><svg class="popular-cars__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
				nextArrow: '<button class="popular-cars__arrow popular-cars__arrow_next"><svg class="popular-cars__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',

				responsive: [{
					breakpoint: 577,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 6
					}
				}]
			});
		}



		// News carousel


		const $newsCarousel = $('.news__articles');

		if( $newsCarousel.length > 0 ) {
			$newsCarousel.slick({
				mobileFirst: true,
				dots: false,
				arrows: true,
				infinite: true,
				slidesToShow: 1,
				speed: 300,
				adaptiveHeight: false,

				prevArrow: '<button class="news__arrow news__arrow_prev"><svg class="news__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
				nextArrow: '<button class="news__arrow news__arrow_next"><svg class="news__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',

				responsive: [{
					breakpoint: 321,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2,
						// arrows: false
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
						// arrows: false
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 4,
						arrows: false
					}
					// settings: "unslick"
				}]
			});
		}


		// Popular carousel


		let $popularSlider = $('#popularSlider');

		if( $popularSlider.length > 0 ) {
			$popularSlider.slick({
				mobileFirst: true,
				dots: false,
				arrows: true,
				infinite: true,
				slidesToShow: 1,
				speed: 300,
				adaptiveHeight: false,
				appendArrows: '#popularNav',
				prevArrow: '<button class="featured__arrow featured__arrow_prev"><svg class="featured__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
				nextArrow: '<button class="featured__arrow featured__arrow_next"><svg class="featured__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',

				responsive: [{
					breakpoint: 321,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 4,
					}
				}]
			});
		}


		// Sale carousel

		let $salesSlider = $('#salesSlider');

		if( $salesSlider.length > 0 ) {
			$salesSlider.slick({
				mobileFirst: true,
				dots: false,
				arrows: true,
				infinite: true,
				slidesToShow: 1,
				speed: 300,
				adaptiveHeight: false,
				appendArrows: '#salesNav',
				prevArrow: '<button class="featured__arrow featured__arrow_prev"><svg class="featured__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
				nextArrow: '<button class="featured__arrow featured__arrow_next"><svg class="featured__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',

				responsive: [{
					breakpoint: 321,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 4,
					}
				}]
			});
		}

		// Recommend carousel

		let $recommendSlider = $('#recommendSlider');

		if( $recommendSlider.length > 0 ) {
			$recommendSlider.slick({
				mobileFirst: true,
				dots: false,
				arrows: true,
				infinite: true,
				slidesToShow: 1,
				speed: 300,
				adaptiveHeight: false,
				appendArrows: '#recommendNav',
				prevArrow: '<button class="featured__arrow featured__arrow_prev"><svg class="featured__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
				nextArrow: '<button class="featured__arrow featured__arrow_next"><svg class="featured__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',

				responsive: [{
					breakpoint: 321,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 4,
					}
				}]
			});
		}

		// Tyres carousel

		let $tyresSlider = $('#tyresSlider');

		if( $tyresSlider.length > 0 ) {
			$tyresSlider.slick({
				mobileFirst: true,
				dots: false,
				arrows: true,
				infinite: true,
				slidesToShow: 1,
				speed: 300,
				adaptiveHeight: false,
				appendArrows: '#tyresNav',
				prevArrow: '<button class="featured__arrow featured__arrow_prev"><svg class="featured__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
				nextArrow: '<button class="featured__arrow featured__arrow_next"><svg class="featured__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',

				responsive: [{
					breakpoint: 321,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 4,
					}
				}]
			});
		}

		// Disks carousel

		let $disksSlider = $('#disksSlider');

		if( $disksSlider.length > 0 ) {
			$disksSlider.slick({
				mobileFirst: true,
				dots: false,
				arrows: true,
				infinite: true,
				slidesToShow: 1,
				speed: 300,
				adaptiveHeight: false,
				appendArrows: '#disksNav',
				prevArrow: '<button class="featured__arrow featured__arrow_prev"><svg class="featured__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
				nextArrow: '<button class="featured__arrow featured__arrow_next"><svg class="featured__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',

				responsive: [{
					breakpoint: 321,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 4,
					}
				}]
			});
		}

		// ToggleFav


		const $fav = $('.card__fav'); 

		$fav.on('click', function (e) {
			e.preventDefault();

			$(this).toggleClass('card__fav_active');

		});


		// Brands carousel

		const $brandsCarousel = $('.brands__list');

		if( $brandsCarousel.length > 0 ) {
			$brandsCarousel.slick({
				mobileFirst: true,
				dots: false,
				arrows: true,
				infinite: true,
				slidesToShow: 2,
				speed: 300,
				adaptiveHeight: false,
				appendArrows: '.brands__list-nav',

				prevArrow: '<button class="brands__arrow brands__arrow_prev"><svg class="brands__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
				nextArrow: '<button class="brands__arrow brands__arrow_next"><svg class="brands__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',

				responsive: [{
					breakpoint: 321,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 4,
						// arrows: false
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 4,
						// arrows: false
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 6,
						// arrows: false
					}
					// settings: "unslick"
				}]
			});
		}

		var myMap;
		var placemarkCollections = {};
		var placemarkList = {};
		 
		// Список городов и магазинов в них
		var shopList = [
			{
				// 'cityName': 'Санкт-Петербург',
				'shops': [
					{'coordinates': [59.861446, 30.287999], 'name': 'Краснопутиловская улица, 46А', 'phone': '+7 (812) 320-91-40', 'hours': 'пн.-пт. 09:00 - 21:00, сб.-вс. 10:00 - 20:00'},
					{'coordinates': [59.894119, 30.301628], 'name': 'Митрофаньевское шоссе, 20В', 'phone': '+7 (812) 320-91-40', 'hours': 'пн.-пт. 09:00 - 21:00, сб.-вс. 10:00 - 20:00'},
					{'coordinates': [59.901983, 30.282529], 'name': 'улица Ивана Черных, 16', 'phone': '+7 (812) 320-91-40', 'hours': 'пн.-пт. 09:00 - 21:00, сб.-вс. 10:00 - 20:00'},
					{'coordinates': [59.904629, 30.269219], 'name': 'Бумажная улица, 10', 'phone': '+7 (812) 320-91-40', 'hours': 'пн.-пт. 09:00 - 21:00, сб.-вс. 10:00 - 20:00'},
					{'coordinates': [59.908481, 30.260225], 'name': 'Лифляндская улица, 3М', 'phone': '+7 (812) 320-91-40', 'hours': 'пн.-пт. 09:00 - 21:00, сб.-вс. 10:00 - 20:00'}

				]
			}
		];
		 
		ymaps.ready(init);
		 
		function init() {
		 
			// Создаем карту
			myMap = new ymaps.Map("map", {
				center: [59.861446, 30.287999],
				zoom: 13,
				controls: [ 'smallMapDefaultSet'],
				// zoomMargin: [20],
				behaviors: ['default', 'scrollZoom']
			});

			// Создание макета балуна
			var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
				'<div class="address address_balloon"><div class="address__w">' +
				'<a class="address__close" href="#"><svg class="address__close-icon"><use xlink:href="assets/images/icon.svg#icon_close-icon"></use></svg></a><div class="address__arrow"></div>' +         
				 '$[[options.contentLayout observeSize ]]' +
				 '' +
				'</div></div>', {
				/**
				* Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
				* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
				* @function
				* @name build
				*/
				build: function () {
					 this.constructor.superclass.build.call(this);
					 this._$element = $('.address_balloon', this.getParentElement());
					 this.applyElementOffset();
				this._$element.find('.address__close')
							 .on('click', $.proxy(this.onCloseClick, this));
				},

				/**
				* Удаляет содержимое макета из DOM.
				* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
				* @function
				* @name clear
				*/
				 clear: function () {
					 this._$element.find('.address__close')
							.off('click');
					 this.constructor.superclass.clear.call(this);
				},

				/**
				* Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
				* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
				* @function
				* @name onSublayoutSizeChange
				*/
				onSublayoutSizeChange: function () {
					 MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

					 if(!this._isElement(this._$element)) {
							 return;
						}
						this.applyElementOffset();
						this.events.fire('shapechange');
				 },

				/**
				* Сдвигаем балун, чтобы середина указывала на точку привязки.
				* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
				* @function
				* @name applyElementOffset
				*/
				 applyElementOffset: function () {
						this._$element.css({
							 left: -(this._$element[0].offsetWidth / 2),
							 top: -(this._$element[0].offsetHeight + this._$element.find('.address__close')[0].offsetHeight)
						});
				 },

				/**
				* Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
				* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
				* @function
				* @name onCloseClick
				*/
				 onCloseClick: function (e) {
						e.preventDefault();
						this.events.fire('userclose');
				 },

				/**
				* Используется для автопозиционирования (balloonAutoPan).
				* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
				* @function
				* @name getClientBounds
				* @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
				*/
				 getShape: function () {
						if(!this._isElement(this._$element)) {
							 return MyBalloonLayout.superclass.getShape.call(this);
						}
						var position = this._$element.position();
						return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
							 [position.left, position.top], [
							 position.left + this._$element[0].offsetWidth,
							 position.top + this._$element[0].offsetHeight + this._$element.find('.address__arrow')[0].offsetHeight]
						]));
				 },
				/**
				* Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
				* @function
				* @private
				* @name _isElement
				* @param {jQuery} [element] Элемент.
				* @returns {Boolean} Флаг наличия.
				*/
				 _isElement: function (element) {
						return element && element[0] && element.find('.address__arrow')[0];
				 }
			});

			// Создание вложенного макета содержимого балуна.
			var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
				 '$[properties.balloonContentHeader]' +
				 '$[properties.balloonContentBody]' +
				 '$[properties.balloonContentFooter]'
			);

		 
			for (var i = 0; i < shopList.length; i++) {
		 
				// Добавляем название города в выпадающий список
				$('.map__list').append('<div class="map__item" data-value="' + i + '" data-city="' + shopList[i].cityName + '"></div>');
		 
				// Создаём коллекцию меток для города
				var cityCollection = new ymaps.GeoObjectCollection();
		 

				for (var c = 0; c < shopList[i].shops.length; c++) {
					var shopInfo = shopList[i].shops[c];
		 
					var shopPhone = shopInfo.phone.replace(/[-+()\s]/g, '');

					// shopInfo.coordinates

					var shopPlacemark = new ymaps.Placemark(shopInfo.coordinates, {
							balloonContentHeader: '<a href="#" class="address__street">' + shopInfo.name + '</a>',

							// Зададим содержимое основной части балуна.
							balloonContentBody: '<div class="address__phone"><svg class="address__phone-icon"><use xlink:href="assets/images/icon.svg#icon_phone"></use></svg>' + shopInfo.phone + '</div>' +
							'<div class="address__work"><svg class="address__work-icon"><use xlink:href="assets/images/icon.svg#icon_work"></use></svg>' +
									shopInfo.hours + '</div>',

							// Зададим содержимое нижней части балуна.
							balloonContentFooter: '<div class="address__buttons"><a href="#" class="address__button button">Маршрут</a>' +
												'<a href="tel:+' + shopPhone + '" class="address__button button">Позвонить</a></div>',

							// Зададим содержимое всплывающей подсказки.
							hintContent: shopInfo.name,
							balloonContent: shopInfo.name


						}, {

							iconLayout: 'default#imageWithContent',
							// Своё изображение иконки метки.
							iconImageHref: 'assets/images/general/marker-icon.png', // картинка иконки
							iconImageSize: [52, 52], // размеры картинки
							iconImageOffset: [-52, -52], // смещение картинки
							balloonShadow: false,
							balloonLayout: MyBalloonLayout,
							balloonContentLayout: MyBalloonContentLayout,
							// balloonContentSize: [300, 170],
							balloonOffset: [-70, -238],
							// balloonImageSize: [282, 170],
							balloonPanelMaxMapArea: 0,
							// balloonAutoPan: true,

							// Не скрываем иконку при открытом балуне.
							hideIconOnBalloonOpen: false,
							// И дополнительно смещаем балун, для открытия над иконкой.

						}
					);
		 
					if (!placemarkList[i]) placemarkList[i] = {};
					placemarkList[i][c] = shopPlacemark;
		 
					// Добавляем метку в коллекцию
					cityCollection.add(shopPlacemark);
		 
				}
		 
				placemarkCollections[i] = cityCollection;
		 
				// Добавляем коллекцию на карту
				myMap.geoObjects.add(cityCollection);

				myMap.geoObjects.events.add('click', function (e) {

					var geoObject = e.get('target');
					var projection = myMap.options.get('projection');
					var position = geoObject.geometry.getCoordinates();
					var position_global_px = myMap.converter.pageToGlobal(projection.fromGlobalPixels(position, myMap.getZoom()));
					var position_local_px = myMap.converter.globalToPage(projection.toGlobalPixels(position,myMap.getZoom()));
					myMap.setGlobalPixelCenter([position_global_px[0] + position_local_px[0]  , position_global_px[1] + position_local_px[1]   ]);
				}, this);

		 
			}
		 
			$('select#cities').trigger('change');
		}
		 
		 
		// Переключение города
		$(document).on('change', $('select#city'), function () {
			var cityId = $('select#cities').val();
		 
			// Масштабируем и выравниваем карту так, чтобы были видны метки для выбранного города
			myMap.setBounds(placemarkCollections[cityId].getBounds(), {checkZoomRange:true}).then(function(){
				if(myMap.getZoom() > 15) myMap.setZoom(15); // Если значение zoom превышает 15, то устанавливаем 15.
			});
		 
			$('#shops').html('');
			for (var c = 0; c < shopList[cityId].shops.length; c++) {
				$('#shops').append('<li value="' + c + '">' + shopList[cityId].shops[c].name + '</li>');
			}
		 
		});
		 

		// Клик на адрес
		$(document).on('click', '.map__addresses .address__street', function (e) {
			e.preventDefault();
		 
			$('.map__close').toggleClass('map__close_active');
			$('.map__addresses').toggleClass('map__addresses_hide');
			$('.map__close').text('Развернуть');


			var cityId = $('select#cities').val();
			var shopId = $(this).data('shop');
		 
			placemarkList[0][shopId].events.fire('click');
		});

		// Клик на кнопку
		$(document).on('click', '.map__addresses .address__button_route', function () {

			$('.map__close').toggleClass('map__close_active');
			$('.map__addresses').toggleClass('map__addresses_hide');
			$('.map__close').text('Развернуть');

		 
			var cityId = $('select#cities').val();
			var shopId = $(this).data('shop');
		 
			placemarkList[0][shopId].events.fire('click');
		});


		$(document).on('click', '.address_balloon .address__street', function (e) {
			
			e.preventDefault();

		});




		// Hide addresses

		$('.map__close').on( 'click', function () {
			$(this).toggleClass('map__close_active');
			// $(this).next('.map__w').toggleClass('map__w_hide');
			$(this).parent().toggleClass('map__addresses_hide');
			$(this).text('Развернуть');

		});


		// Banner slider

		let $bannerSlider = $('.banner__slider');

		if( $bannerSlider.length > 0 ) {
			$bannerSlider.slick({
				mobileFirst: true,
				dots: true,
				arrows: true,
				infinite: false,
				slidesToShow: 1,
				speed: 300,
				adaptiveHeight: false,
				appendArrows: '.banner__nav',

				prevArrow: '<button class="banner__arrow banner__arrow_prev"><svg class="banner__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
				nextArrow: '<button class="banner__arrow banner__arrow_next"><svg class="banner__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',

				appendDots: '.banner__dots'

				
			}).on('setPosition', function (event, slick) {
				slick.$slides.css('height', slick.$slideTrack.height() + 'px');
			});
		}



	});


})(jQuery);
