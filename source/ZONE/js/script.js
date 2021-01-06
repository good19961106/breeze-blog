$(function () {

	$(window).stellar({
		horizontalScrolling: false
	});

	// Custom Scrollbar
	var nice = $("html").niceScroll({
		cursorwidth: 8,
		cursorborder: "0px solid #fff",
		cursorborderradius: '0'
	});

	$('.main-nav a:not(.dropdown-toggle)').bind('click', function(event) {
		var $anchor = $(this);

		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');

		event.preventDefault();
	});
	/*
	* Fun Fact with Count Animation
	*/
	$('.st-ff-count').appear();
	$(document.body).on('appear', '.st-ff-count', function(e, $affected) {
		$affected.each(function(i) {
			if (parseInt($(this).data('runit'))) {
				$(this).countTo({
					speed: 3000,
					refreshInterval: 50
				});
				$(this).data('runit', "0");
			};

		});
	});

	$('[data-toggle="tooltip"]').tooltip();




	function home_height () {
		var element = $('.st-home-unit'),
			elemHeight = element.height(),
			winHeight = $(window).height()
			padding = (winHeight - elemHeight - 200) /2;

		if (padding < 1 ) {
			padding = 0;
		};
		element.css('padding', padding+'px 0');
	}
	home_height ();

	$(window).resize(function () {
		home_height ();
	});


	var fadeStart=$(window).height()/3 // 100px scroll or less will equiv to 1 opacity
	,fadeUntil=$(window).height() // 200px scroll or more will equiv to 0 opacity
	,fading = $('.st-home-unit')
	,fading2 = $('.hero-overlayer')
	;

	$(window).bind('scroll', function(){
		var offset = $(document).scrollTop()
			,opacity=0
			,opacity2=1
		;
		if( offset<=fadeStart ){
			opacity=1;
			opacity2=0;
		}else if( offset<=fadeUntil ){
			opacity=1-offset/fadeUntil;
			opacity2=offset/fadeUntil;
		}
		fading.css({'opacity': opacity});

		if (offset >= 120) {
			$('.st-navbar').addClass("st-navbar-mini");
		} else if (offset <= 119) {
			$('.st-navbar').removeClass("st-navbar-mini");
		}
	});

	/*
	 * Contact Form Validation Code
	 */
	function checkEmpty(selector) {
		if (selector.val()=="" || selector.val()==selector.prop("placeholder")) {
			selector.addClass('formFieldError',500);
			return false;
		} else {
			selector.removeClass('formFieldError',500);
			return true;
		}
	}
	function validateEmail(email) {
		var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
		if (!regex.test(email.val())) {
			email.addClass('formFieldError',500);
			return false;
		} else {
			email.removeClass('formFieldError',500);
			return true;
		}
	}
	function isChecked(checkbox){
		if (!checkbox.is(':checked')) {
			$(".checkTitle").addClass('checkedError',500);
			return false;
		} else {
			$(".checkTitle").removeClass('checkedError',500);
			return true;
		}
		return ;
	}
	
	$("#chkPersonal").change(function(){
		$(".checkTitle").removeClass('checkedError',500);
	});

	$('.contact-form').submit(function () {
		var $this = $(this),
			result = true;

		if (!checkEmpty($this.find('#fname'))){
		result=false;
		}
		if (!validateEmail($this.find('#email'))) {
		result=false;
		}
		if (!checkEmpty($this.find('#mssg'))) {
		result=false;
		}
		
		if (!isChecked($("#chkPersonal"))) {
		if (result) {
			$.infoDialog("個人情報の取り扱いについて、「同意する」にチェックをお願いします。");
		}
		result=false;
		}

		if(result==false) {
		return false;
		}

		var $btn = $("#btnSendMail").button('loading');

		var data = $this.serialize();

		$.ajax({
			url: "sendMail.htm",
			type: "POST",
			data: data,
			cache: false,
			success: function (html) {
				console.log(html);
				if (html==1) {
					$('#result-message').addClass('alert alert-success').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Success!</strong> Message Send. We will contact with you soon.').delay(500).slideDown(500).delay(10000).slideUp('slow');

					$btn.button('reset');

				} else {
					$('#result-message').addClass('alert alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> Message Sending Error! Please try again').delay(500).slideDown(500).delay(10000).slideUp('slow');
					$btn.button('reset');
				}
			},
			error: function (a, b) {
			if (b == 'error') {
				$('#result-message').addClass('alert alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> Message Sending Error! Please try again').delay(500).slideDown(500).delay(10000).slideUp('slow');
			};
			$btn.button('reset');
			}
		});

		return false;
	});

	$("#a_ksgy").click(function(){
		showCompInfo(this, 0);
	});
	$("#a_enkk").click(function(){
		showCompInfo(this, 1);
	});
	$("#a_sskz").click(function(){
		showCompInfo(this, 2);
	});
	$("#a_kern").click(function(){
		showCompInfo(this, 3);
	});
	$("#a_accs").click(function(){
		showCompInfo(this, 4);
	});
	$("#a_hszz").click(function(){
		showCompInfo(this, 5);
	});
	$("#a_siik").click(function(){
		unActiveTabClass(this);
	});
//	$("#a_dhas").click(function(){
//		showCompInfo(this, 4);
//	});
//	$("#a_sysk").click(function(){
//		showCompInfo(this, 5);
//	});

	function showCompInfo(obj, flag) {
		$("#div_ksgy").hide();
		$("#div_enkk").hide();
		$("#div_sskz").hide();
		$("#div_kern").hide();
		$("#div_accs").hide();
		$("#div_hszz").hide();
//		$("#div_dhas").hide();
//		$("#div_sysk").hide();

		unActiveTabClass($("#a_ksgy,#a_enkk,#a_sskz,#a_kern,#a_dhas,#a_hszz,#a_siik,#a_accs"));
		activeTabClass(obj);

		switch (flag) {
			case 0 : $("#div_ksgy").fadeIn(500);break;
			case 1 : $("#div_enkk").fadeIn();break;
			case 2 : $("#div_sskz").fadeIn();break;
			case 3 : $("#div_kern").fadeIn();break;
			case 4 : $("#div_accs").fadeIn();break;
			case 5 : $("#div_hszz").fadeIn();break;
//			case 4 : $("#div_dhas").show();
//					 $("#div_dhas_photo").hide();
//					 $("#div_dhas_photo").fadeIn(2000);break;
//			case 5 : $("#div_sysk").show("slow");break;
		}
	}

	function activeTabClass(obj) {
		$(obj).css({"background-color":"#5ab9b2", "color":"#fff"});
	}

	function unActiveTabClass(obj) {
		$(obj).css({"background-color":"#fff", "color":"#757575"});
	}


	$("#a_ksgy").click();

	$("#a_new").click(function(){
		showEmployInfo(this, 0);
	});
	$("#a_new2").click(function(){
		showEmployInfo(this, 1);
	});
	$("#a_kra").click(function(){
		showEmployInfo(this, 2);
	});

	function showEmployInfo(obj, flag) {
		$("#div_new").hide();
		$("#div_new2").hide();
		$("#div_kra").hide();

		unActiveTabClass($("#a_new,#a_new2,#a_kra"));
		activeTabClass(obj);

		switch (flag) {
			case 0 : $("#div_new").fadeIn(500);break;
			case 1 : $("#div_new2").fadeIn(500);break;
			case 2 : $("#div_kra").fadeIn(500);break;
		}
	}

	$("#a_kra").click();

	$("#a_fre").click(function(){
		showPartnerInfo(this, 0);
	});
	$("#a_cpn").click(function(){
		showPartnerInfo(this, 1);
	});

	function showPartnerInfo(obj, flag) {
		$("#div_cpn").hide();
		$("#div_fre").hide();

		unActiveTabClass($("#a_fre,#a_cpn"));
		activeTabClass(obj);

		switch (flag) {
			case 0 : $("#div_fre").fadeIn(500);break;
			case 1 : $("#div_cpn").fadeIn(500);break;
		}
	}

	$("#a_fre").click();

//	var carrousel = $( ".carrousel" );
//	$( ".portrait" ).click( function(e){
//		var src = $(this).find(".pic").attr( "data-src-wide" );
//		carrousel.find("img").attr( "src", src );
//		carrousel.fadeIn( 200 );
//	});
//
//	carrousel.find( ".close" ).click( function(e){
//		carrousel.find( "img" ).attr( "src", '' );
//		carrousel.fadeOut( 200 );
//	} );

	$("#a_zenmoji").click(function(){
		$("#div_ksgy_part").fadeIn();
	});

	$(".ksgy_title").each(function(i){
		$(this).click(function(){
			$(this).next().slideToggle();
		});
	});
});


$(window).load(function () {
	// footer
	$('.footer-container').load('pages/common/footer.html');
	
	var $grid = $('.grid'),
		$sizer = $grid.find('.shuffle__sizer'),
		$filterType = $('#filter input[name="filter"]');

	$grid.shuffle({
		itemSelector: '.portfolio-item',
		sizer: $sizer
	});

	$filterType.change(function(e) {
		var group = $('#filter input[name="filter"]:checked').val();

		$grid.shuffle('shuffle', group);

		$('label.btn-main').removeClass('btn-main');
		$('input[name="filter"]:checked').parent().addClass('btn-main');
	});

	$.ajax({
			url:'xml/info.xml',
			type: 'GET',
			dataType: 'xml',
			timeout: 5000,
			cache:false,
			error: function(xml){
				$.errorDialog('基本情報読取異常');
			},
			success: function(xml){
			var frag=$("#tbody_ennkaku");
			// 沿革
			var html = "";
			$(xml).find("ennkaku").each(function(i){
				var date = $(this).children("date").text();
				var event = $(this).children("event").text();
				html += "<tr>";
				html += "<th style=\"width:35%\" >" + date + "</th>";
				html += "<td style=\"word-wrap:break-word;\">" + event + "</td>";
				html += "</tr>";
			});
			frag.html(html);

			// 事列紹介（支援）
			frag=$("#sien");
			html = "";
			$(xml).find("sien").each(function(i){
				var title = $(this).children("title").text();
				var content = $(this).children("content").text();
				var imgUrl = $(this).children("imgUrl").text();
				html += "<div class=\"intr_mr\">";
				html += "<h3>・" + title + "</h3>";
				html += "<div class=\"clearfix\" >";
				html += "<img src=\"" + imgUrl + "\" style=\" float:right;width:280px;height:130px;background:#1485B9;\">";
				html += "<p class=\"p-intro_content\">" + content + "</p>";
				html += "</div>";
				html += "</div>";
			});
			frag.html(html);

			// 事列紹介（自社）
			frag=$("#jisya");
			html = "";
			$(xml).find("jisya").each(function(i){
				var title = $(this).children("title").text();
				var content = $(this).children("content").text();
				var imgUrl = $(this).children("imgUrl").text();
				html += "<div class=\"intr_mr\">";
				html += "<h3>・" + title + "</h3>";
				html += "<div class=\"clearfix\">";
				html += "<img src=\"" + imgUrl + "\" style=\" float:right;width:280px;height:130px;background:#1485B9;\">";
				html += "<p class=\"p-intro_content\">" + content + "</p>";
				html += "</div>";
				html += "</div>";
			});
			frag.html(html);
			//C
			
			frag=$("#lion");
			html = "";
			$(xml).find("lion").each(function(i){
				var title = $(this).children("title").text();
				var content = $(this).children("content").text();
				var imgUrl = $(this).children("imgUrl").text();
				html += "<div class=\"intr_mr\">";
				html += "<h3>・" + title + "</h3>";
				html += "<div class=\"clearfix\">";
				html += "<img src=\"" + imgUrl + "\" style=\" float:right;width:280px;height:130px;background:#1485B9;\">";
				html += "<p class=\"p-intro_content\">" + content + "</p>";
				html += "</div>";
				html += "</div>";
			});
			frag.html(html);
			
			

			// 社員生活
			frag=$("#gallery");
			html = "";
			$(xml).find("gallery").each(function(i){
				var date = $(this).children("date").text();
				var type = $(this).children("type").text();
				var event = $(this).children("event").text();
				var className = "";
				var typeName = "";

				switch(type) {
				case "0": className = "span_notice";typeName = "お知らせ";break;
				case "1": className = "span_event";typeName = "イベント";break;
				case "2": className = "span_employ";typeName = "採用情報";break;
				case "3": className = "span_partner";typeName = "パートナ";break;
				}

				html += "<li>";
				html += date + "	<span class=\"" + className + "\">" + typeName + "</span>	" + event;
				html += "</li>";
			});
			frag.html(html);

			AOS.init({
				duration: 1200,
				disable: 'mobile'
			});
			}
		});
});

function gotoAbout(flag) {
	$("#aTitleAbout").click();
	switch(flag) {
		case 0: $("#a_ksgy").click();break;
		case 1: $("#a_enkk").click();break;
		case 2: $("#a_sskz").click();break;
		case 3: $("#a_kern").click();break;
		case 4: $("#a_dhas").click();break;
		case 5: $("#a_sysk").click();break;
	}
}

function gotoService(flag) {
	$("#aTitleService").click();
	switch(flag) {
		case 0: $("#aTitleService").click();break;
		case 1: $("#aTitleService").click();break;
	}
}

function gotoPortfolio(flag) {
	$("#aTitlePortfolio").click();
	switch(flag) {
		case 0: $("#a_kra").click();break;
		case 1: $("#a_new2").click();break;
		case 2: $("#a_new").click();break;
	}
}

function gotoParter(flag) {
	$("#aTitleParter").click();
	switch(flag) {
		case 0: $("#a_fre").click();break;
		case 1: $("#a_cpn").click();break;
	}
}