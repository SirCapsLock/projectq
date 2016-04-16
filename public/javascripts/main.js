$(document).ready(function() {

    console.log("js is loading");

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#cssmenu').prepend('<div id="menu-button">Menu</div>');
    $('#cssmenu #menu-button').on('click', function(){
          var menu = $(this).next('ul');
          if (menu.hasClass('open')) {
            menu.removeClass('open');
          } else {
            menu.addClass('open');
          }
    });

    var currentPage = $('.active-page').attr('id');

    switch (currentPage) {
        case 'home': $('.page:nth-child(1)').addClass('active'); break;
        case 'about': $('.page:nth-child(2)').addClass('active'); break;
        case 'galleries': $('.page:nth-child(3)').addClass('active'); break;
        case 'prints': $('.page:nth-child(4)').addClass('active'); break;
        case 'contact': $('.page:nth-child(5)').addClass('active'); break;
    }

    console.log(currentPage);









    $('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<br/><div class="customBtn smallBtn buyBtn"><div><a  role="button"><div class="btnText">Buy</div><div class="btnIcon"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></div></a></div></div>';
			}
		}
	});

    $(document).on("click",".buyBtn",function() {
        console.log("Buy button clicked");

        $('.mfp-title').append('<hr class="shoppingDivider">buy button was clicked... <br/>add foxy cart shopping options here..');

        $('.buyBtn').addClass('hidden');
    });




});
