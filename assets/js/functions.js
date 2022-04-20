/*------------------------------------
	Theme Name: Bushcraft
	Start Date : 
	End Date : 
	Last change: 
	Version: 1.0
	Assigned to:
	Primary use:
---------------------------------------*/
/*	

	+ Responsive Caret
	+ Expand Panel Resize
	+ Google Map
	+ Sticky Menu
	
	+ Document On Ready
		- Scrolling Navigation
		- Set Sticky Menu
		- Responsive Caret
		- Expand Panel
		- Collapse Panel
		- Search
		- Contact Map
		- Quick Contact Form
	
	+ Window On Scroll
		- Set Sticky Menu
		
	+ Window On Resize
		- Expand Panel Resize
		
	+ Window On Load
		- Site Loader
		- Largest Post
		
*/

(function($) {

	"use strict"
	
	/* + Post Filter */
	function post_filter() {
		if($(".content-block .post-list").length) {
			var $container = $(".post-list");
			$container.isotope({
				layoutMode: 'fitRows',
				percentPosition: true,
				itemSelector: ".post-box",
				gutter: 0,
				transitionDuration: "0.5s",
			});
			
			$("#filters a").on("click",function(){
				$('#filters a').removeClass("active");
				$(this).addClass("active");
				var selector = $(this).attr("data-filter");
				$container.isotope({ filter: selector });		
				return false;
			});
		}
	}
	
	/* + Responsive Caret* */
	function menu_dropdown_open(){
		var width = $(window).width();
		if($(".ownavigation .nav li.ddl-active").length ) {
			if( width > 991 ) {
				$(".ownavigation .nav > li").removeClass("ddl-active");
				$(".ownavigation .nav li .dropdown-menu").removeAttr("style");
			}
		} else {
			$(".ownavigation .nav li .dropdown-menu").removeAttr("style");
		}
	}
	
	/* + Expand Panel Resize * */
	function panel_resize(){
		var width = $(window).width();
		if( width > 991 ) {
			if($("[id*='slidepanel-']").length ) {
				$("[id*='slidepanel-']").removeAttr("style");
			}
		}
	}
	
	/* + Google Map* */
	function initialize(obj) {
		var lat = $("#"+obj).attr("data-lat");
        var lng = $("#"+obj).attr("data-lng");
		var contentString = $("#"+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image =  $("#"+obj).attr("data-pin");
		var zoomLevel = parseInt($("#"+obj).attr("data-zoom") ,10);		
		var styles = [{"featureType": "road.local","elementType": "labels.text","stylers": [{"visibility": "on"},{"color": "#0e0e0e"}]}]
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});	
		
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);	
		
		map.mapTypes.set("map_style", styledMap);
		map.setMapTypeId("map_style");
		
		if( contentString != "" ) {
			infowindow = new google.maps.InfoWindow({
				content: contentString
			});
		}		
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, "click", function() {
			infowindow.open(map,marker);
		});
	}
	
	/* + Sticky Menu */
	function sticky_menu() {
		var menu_scroll = $(".header_s").offset().top;
		var scroll_top = $(window).scrollTop();
		
		if ( scroll_top > menu_scroll ) {
			$(".header_s .menu-block").addClass("navbar-fixed-top animated fadeInDown");
		} else {
			$(".header_s .menu-block").removeClass("navbar-fixed-top animated fadeInDown"); 
		}
	}
	
	/* + Document On Ready */
	$(document).on("ready", function() {

		/* - Scrolling Navigation* */
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/* - Set Sticky Menu* */
		if( $(".header_s").length ) {
			sticky_menu();
		}
		
		$('.navbar-nav li a[href*="#"]:not([href="#"]), .site-logo a[href*="#"]:not([href="#"])').on("click", function(e) {
	
			var $anchor = $(this);
			
			$("html, body").stop().animate({ scrollTop: $($anchor.attr("href")).offset().top - 49 }, 1500, "easeInOutExpo");
			
			e.preventDefault();
		});

		/* - Responsive Caret* */
		$(".ddl-switch").on("click", function() {
			var li = $(this).parent();
			if ( li.hasClass("ddl-active") || li.find(".ddl-active").length !== 0 || li.find(".dropdown-menu").is(":visible") ) {
				li.removeClass("ddl-active");
				li.children().find(".ddl-active").removeClass("ddl-active");
				li.children(".dropdown-menu").slideUp();
			}
			else {
				li.addClass("ddl-active");
				li.children(".dropdown-menu").slideDown();
			}
		});
		
		/* - Expand Panel * */
		$("#slideit-1").on("click", function() {
			$("#slidepanel-1").slideDown(1000);
			$("html").animate({ scrollTop: 0 }, 1000);
		});
		$("#slideit-2").on ("click", function() {
			$("#slidepanel-2").slideDown(1000);
			$("html").animate({ scrollTop: 0 }, 1000);
		});

		/* - Collapse Panel * */
		$("#closeit-1").on("click", function() {
			$("#slidepanel-1").slideUp("slow");
			$("html").animate({ scrollTop: 0 }, 1000);
		});	
		$("#closeit-2").on("click", function() {
			$("#slidepanel-2").slideUp("slow");
			$("html").animate({ scrollTop: 0 }, 1000);
		});	
		
		/* Switch buttons from "Log In | Register" to "Close Panel" on click * */
		$("#toggle-1 a").on("click", function() {
			$("#toggle-1 a").toggle();
		});
		$("#toggle-2 a").on("click", function() {
			$("#toggle-2 a").toggle();
		});
		
		/* - Search * */
		if($(".search-box").length){
			$("#search").on("click", function(){
				$(".search-block1").addClass("active")
			});
			$(".search-box span").on("click", function(){
				$(".search-block1").removeClass("active")
			});
		}
		if($(".search-box").length){
			$("#search2").on("click", function(){
				$(".search-block2").addClass("active")
			});
			$(".search-box span").on("click", function(){
				$(".search-block2").removeClass("active")
			});
		}
		if($(".search-box").length){
			$("#search3").on("click", function(){
				$(".search-block3").addClass("active")
			});
			$(".search-box span").on("click", function(){
				$(".search-block3").removeClass("active")
			});
		}
		
		panel_resize();
		
		/* - Slider Carousel */
		if( $(".slider-carousel-1").length ) {
			if($('html[dir="rtl"]').length) {
				$(".slider-carousel-1").owlCarousel({
					loop: true,
					margin: 2,
					nav: false,
					dots: false,
					rtl: true,
					autoplay: true,
					responsive:{
						0:{
							items: 1
						},
						480:{
							items: 2
						},
						768 : {
							items: 3
						}
					}
				});
			} else {
				$(".slider-carousel-1").owlCarousel({
					loop: true,
					margin: 2,
					nav: false,
					dots: false,
					autoplay: true,
					responsive:{
						0:{
							items: 1
						},
						480:{
							items: 2
						},
						768 : {
							items: 3
						}
					}
				});
			}
		}

		/* - Slider Carousel */
		if( $(".slider-carousel-2").length ) {
			if($('html[dir="rtl"]').length) {
				$(".slider-carousel-2").owlCarousel({
					loop: true,
					margin: 2,
					nav: false,
					dots: false,
					rtl: true,
					autoplay: true,
					responsive:{
						0:{
							items: 1
						},
						640:{
							items: 2
						}
					}
				});
			} else {
				$(".slider-carousel-2").owlCarousel({
					loop: true,
					margin: 2,
					nav: false,
					dots: false,
					autoplay: true,
					responsive:{
						0:{
							items: 1
						},
						640:{
							items: 2
						}
					}
				});
			}
		}	

		/* - Price Filter */
		$( "#slider-range" ).slider({
			range: true,
			min: 2,
			max: 200,
			values: [ 2, 200 ],
			slide: function( event, ui ) {
				$( "#amount" ).html( "$" + ui.values[ 0 ] )
				$( "#amount2" ).html( "$" + ui.values[ 1 ] );
			}
		});
		$( "#amount" ).html( "$" + $( "#slider-range" ).slider( "values", 0 ) );
		$( "#amount2" ).html( " $" + $(  "#slider-range" ).slider( "values", 1 ) );
		
		if( $( "#map-canvas-event").length == 1 ){
			initialize( "map-canvas-event" );
		}
		
		if( $( "#contact-map-canvas").length == 1 ){
			initialize( "contact-map-canvas" );
		}
		
		/* - Quick Contact Form* */
		$( "#btn_submit" ).on( "click", function(event) {
		  event.preventDefault();
		  var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact.php",
				data: mydata,
				success: function(data) {
					if( data["type"] == "error" ){
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").removeClass("alert-msg-success");
						$("#alert-msg").addClass("alert-msg-failure");
						$("#alert-msg").show();
					} else {
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").addClass("alert-msg-success");
						$("#alert-msg").removeClass("alert-msg-failure");					
						$("#input_fname").val("");
						$("#input_lname").val("");
						$("#input_email").val("");												
						$("#input_website").val("");										
						$("#textarea_message").val("");
						$("#alert-msg").show();				
					}			
				},
				error: function(xhr, textStatus, errorThrown) {
					alert(textStatus);
				}
			});
		});
		
		if($(".type-product").length){
			var url;
			$(".type-product .woocommerce-product-gallery").magnificPopup({
				delegate: "a.zoom",
				type: "image",
				tLoading: "Loading image #%curr%...",
				mainClass: "mfp-img-mobile",
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: "<a href="%url%">The image #%curr%</a> could not be loaded.",				
				}
			});
		}
		
		/* -- Woocommerce Tabs */
		$( '.wc-tabs-wrapper, .woocommerce-tabs' )
			.on( 'init', function() {
				$( '.wc-tab, .woocommerce-tabs .panel:not(.panel .panel)' ).hide();

				var hash  = window.location.hash;
				var url   = window.location.href;
				var $tabs = $( this ).find( '.wc-tabs, ul.tabs' ).first();

				if ( hash.toLowerCase().indexOf( 'comment-' ) >= 0 || hash === '#reviews' ) {
					$tabs.find( 'li.reviews_tab a' ).trigger("click");
				} else if ( url.indexOf( 'comment-page-' ) > 0 || url.indexOf( 'cpage=' ) > 0 ) {
					$tabs.find( 'li.reviews_tab a' ).trigger("click");
				} else {
					$tabs.find( 'li:first a' ).trigger("click");
				}
			})
			.on( 'click', '.wc-tabs li a, ul.tabs li a', function() {
				var $tab          = $( this );
				var $tabs_wrapper = $tab.closest( '.wc-tabs-wrapper, .woocommerce-tabs' );
				var $tabs         = $tabs_wrapper.find( '.wc-tabs, ul.tabs' );

				$tabs.find( 'li' ).removeClass( 'active' );
				$tabs_wrapper.find( '.wc-tab, .panel:not(.panel .panel)' ).hide();

				$tab.closest( 'li' ).addClass( 'active' );
				$tabs_wrapper.find( $tab.attr( 'href' ) ).show();

				return false;
			})
			.trigger( 'init' );

		$( 'a.woocommerce-review-link' ).on("click", function() {
			$( '.reviews_tab a' ).trigger("click");
			return true;
		});
		
		/* - Quantity */
		/* This button will increment the value*/
		$(".qtyplus").on( "click", function(e){
			e.preventDefault();
			var fieldName = $(this).attr('data-field');
			var currentVal = parseInt($('input[name='+fieldName+']').val());
			if (!isNaN(currentVal)) {
				$('input[name='+fieldName+']').val(currentVal + 1);
			} else {
				$(this).find('input[name='+fieldName+']').val(0);
			}
		});

		/* This button will decrement the value till 0 */
		$(".qtyminus").on( "click" , function(e) {		
			e.preventDefault();		
			var fieldName = $(this).attr('data-field');		
			var currentVal = parseInt($('input[name='+fieldName+']').val());		
			if (!isNaN(currentVal) && currentVal > 0) {			
				$('input[name='+fieldName+']').val(currentVal - 1);
			} else {			
				$('input[name='+fieldName+']').val(0);
			}
		});
		
		/* - CheckOut * */			
		$(".showlogin").on("click", function(){
			$("form.login").slideToggle();
		});
		$(".showcoupon").on("click", function(){
			$("form.checkout_coupon").slideToggle();
		});
			
	});	/* - Document On Ready /- */
	
	/* + Window On Scroll */
	$(window).on("scroll",function() {
		/* - Set Sticky Menu* */
		if( $(".header_s").length ) {
			sticky_menu();
		}
	});
	
	/* + Window On Resize */ 
	$( window ).on("resize",function() {
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/* - Expand Panel Resize */
		panel_resize();
		menu_dropdown_open();
		post_filter();
	});
	
	/* + Window On Load */
	$(window).on("load",function() {
		/* - Site Loader* */
		if ( !$("html").is(".ie6, .ie7, .ie8") ) {
			$("#site-loader").delay(1000).fadeOut("slow");
		}
		else {
			$("#site-loader").css("display","none");
		}
		post_filter();
	});

})(jQuery);