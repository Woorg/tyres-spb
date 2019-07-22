import svg4everybody from 'svg4everybody';
// import $ from 'jquery';
import slick from 'slick-carousel';
import select2 from 'select2';
import scrollbar from 'jquery.scrollbar/jquery.scrollbar.min.js';
import 'magnific-popup';

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


		// Tabs

		let $tabsNav = $('.tabs__nav');

		$tabsNav.on('click', 'li:not(.tabs__item_active)', function(e) {
			e.preventDefault();
			$(this)
				.addClass('tabs__item_active')
				.siblings()
				.removeClass('tabs__item_active')
				.closest('.tabs')
				.find('.tabs__tab')
				.removeClass('tabs__tab_active').eq($(this).index())
				.addClass('tabs__tab_active');
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


		$('.popular-sizes__more').on('click', function () {
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



		// Popular auto carousel


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
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 3,
						arrows: false
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 4,
						arrows: false
					}
					// settings: "unslick"
				}]
			});
		}



	});


})(jQuery);
