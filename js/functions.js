(function ($) {
  $(document).ready(function () {
    if ($(window).width() <= 600) {
      $('input.trackingFormName').attr('placeholder', 'Nhập họ và tên');
      $('input.trackingFormPhone').attr('placeholder', 'Nhập số điện thoại');
      $('input.trackingFormEmail').attr('placeholder', 'Nhập email công ty');
    }

    $('.js-check-email').click(function (e) {
      e.preventDefault();
      $('.otp-success').css('display', 'block');
      $('.text-1').hide();
    })

    $(".of-iconmntop").click(function () {
      $(".of-menutop").toggleClass("of-mnshow");
    });

    $(".of-search").click(function () {
      $(".of-searchbox").show(200);
    });

    $(".of-closesearch").click(function () {
      $(".of-searchbox").hide(200);
    });

    $(document).on("click", "[toscroll]", function (e) {
      e.preventDefault();
      var link = $(this).attr("toscroll");
      if ($(link).length > 0) {
        var posi = $(link).offset().top - 50;
        $("body,html").animate({
          scrollTop: posi
        }, 1000);
      }
    });

    $(".cs-dropdown").cDropdown();
    $(".js--wrap-item").each(function () {
      var child = $(this).children();
      child.click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      });
    });
    //modal
    $(".js--open-modal").each(function () {
      var btn = $(this).find(".btn-more");
      btn.click(function () {
        var dataTaget = $(this).attr("data-target");
        $("." + dataTaget).show();
        $("html").addClass("no-scroll");
      });
    });
    $(".js--close-modal").click(function () {
      $(".popup-modal").hide();
      $("html").removeClass("no-scroll");
    });

    const fnNavgivation = (params) => {
      var scrollLink = $('.scroll');

      var listWrap = $('.nav__list-wrap'), listNav = $('.nav__list'), navItem = $('.nav__item');

      listWrap.removeClass('swiper mySwiper').find('.swiper-wrapper').removeClass('swiper-wrapper').addClass('swiper swiper-nav');
      listNav.removeClass('swiper-slide');
      listNav.addClass('swiper-wrapper');
      navItem.addClass('swiper-slide').css('width', 'auto');
      var slideNav = new Swiper('.swiper-nav', {
        slidesPerView: 'auto'
      });

      // Smooth scrolling
      scrollLink.click(function (e) {
        e.preventDefault();

        $('body,html').animate({
          scrollTop: $(this.hash).offset().top - 60
        }, 1000);
      });

      // Cache selectors
      var topMenu = $(".section__nav"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find(".swiper-slide .scroll"),
        swiperWrapper = $('.swiper-nav .swiper-wrapper');

      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

      // Bind click handler to menu items
      // so we can get a fancy scroll animation
      menuItems.off('click').on('click', function (e) {
        e.preventDefault();

        var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;

        $('html, body').stop().animate({
          scrollTop: offsetTop
        }, 1000);

      });

      // Bind to scroll
      $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
          if ($(this).offset().top < fromTop)
            return this;
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        var slideIndex = menuItems.filter("[href='#" + id + "']").parent().index();
        slideNav.slideTo(slideIndex);
        if (slideIndex > 0) {
          swiperWrapper.css('padding-left', '40px');
          menuItems.removeClass('active');
          menuItems.filter("[href='#" + id + "']").addClass('active');
        } else {
          swiperWrapper.css('padding-left', '0');
          menuItems.removeClass('active');
          $(".swiper-slide:first-child .scroll").addClass('active');
        }
      });
    }
    fnNavgivation();
    // // Active link switching

    var swiper = new Swiper(".ecosystem-swiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {

          slidesPerView: "auto",
          spaceBetween: 8,
        },
        640: {
          slidesPerGroup: 3,
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });

    $('.iframe-mask').click(function () {
      $('.frame-youtube').show();
      $(this).hide();
    })
    $('.js-view-content').click(function () {
      let animate = function (position) {
        $('body,html').animate({ scrollTop: position }, 900);
      }
      var position = $(this).offset().top - 50;
      $('.para-content').toggleClass('full-content-intro');
      $(this).toggleClass('full-para');
    })

    $('.js-view-full').click(function () {
      // $(this).removeClass('view-less');
      let animate = function (position) {
        $('body,html').animate({ scrollTop: position }, 900);
      }
      var position = $(this).offset().top - 50;
      $('.inner-content-intro').toggleClass('full-content-intro');
      $(this).toggleClass('view-less');
    })


    $('.js-tab-item').click(function () {
      var rel = $(this).attr('rel');
      $('.js-tab-item').removeClass('tabs-item-active');
      $(this).addClass('tabs-item-active')

      if (rel === "ip14-pro") {
        $('.section__tab').addClass('dark-themes')
        $(this).addClass('dark')
        $(".selector").addClass('dark')
      } else {
        $('.section__tab').removeClass('dark-themes')
        $('.js-tab-item, .selector').removeClass('dark');
      }

      $('.tab-ip14').removeClass('active');
      $(`#${rel}`).addClass('active')
    })

    //tab elastic
    //tab section link
    function targetTab() {
      var tabItem = $('.js-tab-item');

      elasticSelector('.tabs');

      tabItem.click(function () {
        var that = $(this);
        elasticTab(that);
      });
    }

    //Elastic
    function elasticSelector(parent) {

      var parent = $(parent);

      var activeItem = parent.find('.tabs-item-active');
      var activeWidth = activeItem.innerWidth();

      $(".selector").css({
        "left": activeItem.position.left + "px",
        "width": activeWidth + "px"
      });
    }

    function elasticTab(that) {
      var activeWidth = that.innerWidth();

      var itemPos = that.position();

      $(".selector").css({
        "left": itemPos.left + "px",
        "width": activeWidth + "px"
      });
    }

    if ($(window).width() > 992) {
      targetTab();
    }

  });
})(window.jQuery);

jQuery.fn.extend({
  cDropdown: function () {
    return this.each(function () {
      var containermenu = $(this);
      var button = containermenu.find(".cs-dropdown-button");
      var menu = containermenu.find(".cs-dropdown-menu");
      var list = containermenu.find(".cs-dropdown-menu-wrapper");
      var item = list.children();
      var option = button.find("span");
      button.click(function (e) {
        menu.addClass("open");
      });
      item.click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        var txt = $(this).find("span").text();
        option.text(txt);
        menu.removeClass("open");
      });
      $(document).click(function (e) {
        e.stopPropagation();
        var container = containermenu;
        if (container.has(e.target).length === 0) {
          menu.removeClass("open");
        }
      });
    });
  }
});


// Animation
let windowBrowser = $(window), widthBrowser = windowBrowser.width();
//console.log("windowBrowser", widthBrowser);
function pageAnimation() {
  if (widthBrowser > 992) {
    document.addEventListener("DOMContentLoaded", function () {
      gsap.registerPlugin(ScrollTrigger);

      function gsapTrigger(x = 0, y = 0, nameAnimate, scale = 0, duration = 1, delay, trigger, start, toggleActions) {
        gsap.from(nameAnimate, {
          x: x,
          y: y,
          opacity: 0,
          pin: true,
          scale: scale,
          duration: duration,
          delay: delay,
          scrollTrigger: {
            trigger: trigger,
            toggleActions: toggleActions,
            start: start,
          },
        });
      };

      var bannerBottom = '.ld__col-left.slide-in-bottom';
      var bannerCenter = '.ld__col-right.slide-in-fwb-center';
      var navBottom = '.section__nav.slide-in-bottom';
      var timelineBottom = '.section__timeline.slide-in-bottom';
      var creditBottom = '.section__credit.slide-in-bottom';
      //Banner
      gsapTrigger(0, 150, bannerBottom, 1, 1.2, .3, bannerBottom, 'top bottom', 'play none none none');
      gsapTrigger(0, 0, bannerCenter, .3, 1.2, 1, bannerCenter, 'top bottom', 'play none none none');
      //Nav
      gsapTrigger(0, 150, navBottom, 1, 1, 1.2, navBottom, 'top bottom', 'play none none none');
      //Timeline
      gsapTrigger(0, 150, timelineBottom, 1, 1.2, 1.7, timelineBottom, 'top bottom', 'play none none none');
      //Credit
      gsapTrigger(0, 100, creditBottom, 1, 1.2, 0, creditBottom, 'top bottom', 'play none none none');


      //Scrollpage
      function gsapScrollpage(x, y, nameAnimate, scale = 1, delay, trigger, start, end) {
        gsap.from(nameAnimate, {
          x: x,
          y: y,
          opacity: 0,
          scale: scale,
          duration: 1.2,
          delay: delay,
          scrollTrigger: {
            trigger: trigger,
            start: start,
            end: end,
            scrub: 1,
            // markers: true
          },
        });
      };

      var evoBottom = '.ld-col-right.scrollBottom';
      var evoRight = '.ld-col-left.scrollRight';
      var preBottom = '.ld__row.scrollBottom';
      var preBoxBottom = '.box-product-order.scrollBottom';
      var ruleBottom = '.section-rules.scrollBottom';
      var ecoBottom = '.section__ecosystem.scrollBottom';
      var introBottom = '.section__introduction-1.scrollBottom';
      var featLeft = '.section-1 .content-1.scrollLeft';
      var featCenter = '.section-1 .des-1.scrollCenter';
      var featCenter2 = '.section-1 .des-4.scrollCenter';
      var featLeft2 = '.section-1 .des-2.scrollLeft';
      var featRight = '.section-1 .des-3.scrollRight';
      var feat2Left = '.section-2 .content-1.scrollLeft';
      var feat2Right = '.section-2 .content-2.scrollRight';
      var feat3Left = '.section-3.scrollLeft';
      var feat4Left = '.section-4 .content-1.scrollLeft';
      var feat4Left_1 = '.section-4 .photo-1.scrollLeft';
      var feat4Left_2 = '.section-4 .photo-2.scrollLeft';
      var feat4Right = '.section-4 .photo-3.scrollRight';
      var feat5Right = '.section-5 .content-1.scrollRight';
      var feat5Right_1 = '.section-5 .video-1.scrollRight';
      var feat5Right_2 = '.section-5 .video-2.scrollRight';
      var feat6Top = '.section-6 .content-1.scrollTop';
      var feat6Top_1 = '.section-6 .chip-1.scrollTop';
      var feat6Top_2 = '.section-6 .chip-2.scrollTop';

      //Evo
      gsapScrollpage(0, 500, evoBottom, 1, .5, '.section__evo', '-300 70%', '20% 70%');
      gsapScrollpage(-500, 0, evoRight, 1, .5, '.section__evo', '30% 80%', '80% 70%');
      //Preorder
      gsapScrollpage(0, 500, preBottom, 1, .5, '.section__preorder', '-300 70%', '20% 70%');
      gsapScrollpage(0, 500, preBoxBottom, 1, .5, '.section__preorder', 'top 80%', 'center center');
      //Rules
      gsapScrollpage(0, 500, ruleBottom, 1, .5, '.section__preorder', '30% 90%', '80% center');
      //Ecosystem
      gsapScrollpage(0, 200, ecoBottom, 1, .5, '.section__ecosystem', '-200 80%', '10% 70%');
      //Introduction
      gsapScrollpage(0, 500, introBottom, 1, .5, '.section__introduction-1', '-500 bottom', '30% 70%');
      //Features
      gsapScrollpage(-500, 0, featLeft, 1, .5, '.section-1', '10% 90%', '20% 60%');
      gsapScrollpage(-500, 0, featLeft2, 1, .5, '.section-1', '500 90%', '800 100%');
      gsapScrollpage(0, -100, featCenter, .3, .5, '.section-1', '10% 90%', '30% 40%');
      gsapScrollpage(0, 100, featCenter2, .3, .5, '.section-1', '60% 80%', '80% 75%');
      gsapScrollpage(800, 0, featRight, .3, .5, '.section-1', '400 85%', '80% 75%');
      //Features - section 2
      gsapScrollpage(-500, 0, feat2Left, 1, .5, '.section__introduction-2 .section-2', '-300 90%', '80% 80%');
      gsapScrollpage(1000, 0, feat2Right, 1, 1.5, '.section__introduction-2 .section-2', 'top 90%', '500 70%');
      //Features - section 3
      $('.js-view-full').click(function (e) {
        gsapScrollpage(-500, 0, feat3Left, 1, .5, '.section__introduction-2 .section-3', '-500 80%', '50% 70%');
        //Features - section 4
        gsapScrollpage(-500, 0, feat4Left, 1, .5, '.section__introduction-2 .section-4', '10% 100%', '10% 80%');
        gsapScrollpage(-500, 0, feat4Left_1, 1, .5, '.section__introduction-2 .section-4', '5% 80%', '45% 80%');
        gsapScrollpage(-500, 0, feat4Left_2, 1, .5, '.section__introduction-2 .section-4', '50% 80%', '70% 83%');
        gsapScrollpage(500, 0, feat4Right, 1, .5, '.section__introduction-2 .section-4', '60% 80%', '65% 70%');
        //Features - section 5
        gsapScrollpage(500, 0, feat5Right, 1, .5, '.section__introduction-2 .section-5', '10% 100%', '30% 80%');
        gsapScrollpage(500, 0, feat5Right_1, 1, .5, '.section__introduction-2 .section-5', '50% 100%', '80% 80%');
        gsapScrollpage(500, 0, feat5Right_2, 1, .5, '.section__introduction-2 .section-5', '50% 80%', '90% 75%');
        //Features - section 6
        gsapScrollpage(0, -200, feat6Top, 1, .5, '.section__introduction-2 .section-6', 'top 100%', '30% 80%');
        gsapScrollpage(0, -200, feat6Top_1, 1, .5, '.section__introduction-2 .section-6', '20% 100%', '30% 65%');
        gsapScrollpage(0, -200, feat6Top_2, 1, .5, '.section__introduction-2 .section-6', '30% 90%', '30% 50%');
      })
    });
  }
}
pageAnimation();

// function fnVideo() {
//   const $video = $('#video');

//   $video.click(function(){
//     if(this.paused){
//       $(this).trigger('play');
//     }else{
//       $(this).trigger('pause');
//     }
//   });
// }

// $(document).ready(function(){
//   fnVideo();
// });


