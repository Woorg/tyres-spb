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

		// var $factsSlider = $('.facts__slider');

		// if( $factsSlider.length > 0 ) {
		// 	$factsSlider.slick({
		// 		dots: true,
		// 		arrows: true,
		// 		infinite: true,
		// 		slidesToShow: 1,
		// 		speed: 500,
		// 		adaptiveHeight: false,
		// 	});
		// }

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
		

		// Nav more

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
		let $hHeader = $('.header').outerHeight();
		let $page = $('.page');
		let $windowWidth = $(window).width();

		if ( $windowWidth <= 576 )  {
			$page.css({
				'padding-top': $hHeader
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
					'padding-top': $hHeader
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


	});


})(jQuery);
