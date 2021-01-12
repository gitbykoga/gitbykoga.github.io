$().ready(function () {
    $("body").css({ visibility: 'visible' })
});

$(function () {
    setNavigation();
});

function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);

    $("#navstart .navbar-item").each(function () {
        var href = $(this).attr('href');
        if (path.substring(0, href.length) === href) {
            $(this).addClass('is-active');
        }
    });
}

if (window.location.pathname.substring(0, 1) === "/#" || window.location.pathname === "/") 
{
    // SET THE HASH
    $(function () {
        var currentHash = "#recent"

        $(document).scroll(function () {
            uiNavigation(currentHash);
        });

        $().ready(function () {
            uiNavigation(currentHash);
        });
    });
}

function uiNavigation(currentHash) {
    var minDist = $(window).height() * 0.8;
    var closestHash = "";

    $('h1[id]').each(function () {
        var distance = $(this).offset().top - $(window).scrollTop() + 100;
        var hash = $(this).attr('id');

        if (distance > 70 && distance < ($(window).height() * 0.8) && minDist > distance) {
            minDist = distance;
            closestHash = hash;
        }
    });

    if (closestHash != currentHash && closestHash != "") {
        currentHash = closestHash;
        
        if (history.pushState) {
            history.pushState(null, null, '#' + currentHash);
        }
        else {
            location.hash = '#' + currentHash;
        }

        $("#navend .navbar-item").each(function () {
            var href = $(this).attr('href');

            if ("/#" + currentHash === href) {
                $(this).addClass('is-active');
            }
            else {
                $(this).removeClass('is-active');
            }
        });
    }
}

/*const darkmode = new Darkmode({
    time: '0.5s'
});*/
openLight = new OpenLight("auto");
openLight.init();
openLight.addOverrideByClassName("darkover");

var isDark = false;

$(function () {
    $("#darkmode a").click(function () {
        if (isDark) {
            isDark = false;
            $("#darkmode svg").replaceWith(feather.icons.moon.toSvg());
        }
        else {
            isDark = true;
            $("#darkmode svg").replaceWith(feather.icons.sun.toSvg());
        }

        $(this).toggleClass("is-dark");
        $(this).toggleClass("is-warning");
        //darkmode.toggle();
        openLight.toggleMode();
    });
});

(function ($) {
    $("a[href*=\\#]:not([href=\\#])").click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            || location.hostname == this.hostname) {

            var target = $(this.hash),
                headerHeight = 100; // Get fixed header height

            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                $('html,body').stop().dequeue().animate({
                    scrollTop: target.offset().top - headerHeight
                }, 500);
                return false;
            }
        }
    });
})(jQuery);