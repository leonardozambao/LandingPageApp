function scrollTo(e) {
    var $target = $(e);
    $('html, body').animate(
        {
            scrollTop: $target.offset().top 
        }, {
        duration: 2000,
        step: function (now, fx) {
            var newOffset = $target.offset().top - 70;
            if (fx.end !== newOffset)
                fx.end = newOffset;
        }
    }
    );

    return false;
}
function changeState(e, eClass) {
    if ($(e).hasClass(eClass)) {
        return false;
    } else {
        // $('article').removeClass(eClass);
        $(e).addClass(eClass);
    }
}

var lastScrollTop = 0;
function divSelect(scroll) {
    $('article:not(.mobile)').each(function () {
        var posDiv = $(this).offset().top;
        var divHeight = $(this).innerHeight();
        var divPosition = posDiv + divHeight;
        var windowHeight = $(window).innerHeight();
        var scrollPosition = scroll;

        if (scrollPosition > posDiv) {
            changeState($(this), 'state-one');
        }
        if (scrollPosition > posDiv - (windowHeight / 2) && scrollPosition < divPosition + (windowHeight / 2)) {
            changeState($(this), 'state-two');
        }
        if (scrollPosition > posDiv - ((windowHeight / 2) + 200) && scrollPosition < divPosition - windowHeight) {
            changeState($(this), 'state-three');
        }
    });

    if (scroll > lastScrollTop) {
        //descendo scroll
        if (scroll > $('header').innerHeight()) {
            $('header').removeClass('show').addClass('no-top');
        } else {
            $('header').addClass('show').removeClass('no-top');
        }
        // changeValue('down');
    } else {
        //subindo scroll
        if (scroll > $('header').innerHeight()) {
            $('header').addClass('no-top');
        } else {
            $('header').removeClass('no-top');
        }
        $('header').addClass('show')
        // changeValue('up');
    }
    lastScrollTop = scroll;
};

$(window).scroll(function (e) {
    var scroll = $(this).scrollTop();
    divSelect(scroll);
});

function video() {
    var options = {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth
    };
    var video1Player = new Vimeo.Player('video1', options);
}

$(document).ready(function () {
    video();

    $('.go-next').click(function () {
        var target = $(this).attr('href');
        scrollTo(target);
        return false;
    });
    $('nav a').click(function () {
        var target = $(this).attr('href');
        scrollTo(target);
        setTimeout(() => {
            $('nav a').blur();
        }, 2000);
        return false;
    });

    $('header .menu-button').on('click', () => {
        $('header').toggleClass('menu-opened');
        return false;
    })

    if (window.innerWidth <= 768){
        $('header nav a').on('click', () => {
            $('header').removeClass('menu-opened');
        });
    }

    $('.loading-box').fadeOut();
    $('body').removeClass('loading');

    var scroll = $('html').scrollTop();
    divSelect(scroll);
    jQuery(window).resize();
})
