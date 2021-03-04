$().ready(function () {
    resizeAllGridItems();
    allAutoScrolls();
});

$(function () {
    setNavigation();
});

function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);

    $(".navbar-start .navbar-item").each(function () {
        var href = $(this).attr('href');
        if (path.substring(0, href.length) === href) {
            $(this).addClass('is-active');
        }
    });
}

var currentHash = "links"

if (window.location.pathname.substring(0, 1) === "/#" || window.location.pathname === "/") 
{
    //console.log(location.href.replace(/(.+\w\/)(.+)/, "/$2"));
    var path = location.href.replace(/(.+\w\/)(.+)/, "/$2");

    // SET THE HASH
    $(function () {
        $(document).scroll(function () {
            uiNavigation(false);
        });

        $().ready(function () {
            uiNavigation(true);

            setTimeout(() => {
                var button = $('a[href="' + path + '"]');
                animateHashtag(button[0], 250);
                sessionStorage.setItem('recentThis', button[0]);
            }, 1);
        });
    });
}

function uiNavigation(first) {
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

    if (first || closestHash !== currentHash && closestHash !== "") {
        //console.log(closestHash + " " + currentHash);
        currentHash = closestHash;
        
        if (history.replaceState) {
            history.replaceState(null, null, '#' + currentHash);
        }
        else {
            location.hash = '#myhash';
        }

        $(".navbar-end .navbar-item").each(function () {
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
openLight.addOverrideByClassName("mode-none");
openLight.init();

/*var isDark = readCookie("openlightcookie") === "dark";

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        //console.log(c.substring(nameEQ.length, c.length));
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

$(function () {
    if (isDark) {
        $("#darkmode a").addClass("is-dark");
        $("#darkmode a").removeClass("is-warning");
        $("#darkmode svg").replaceWith(feather.icons.sun.toSvg());
    }
    else {
        $("#darkmode a").addClass("is-warning");
        $("#darkmode a").removeClass("is-dark");
        $("#darkmode svg").replaceWith(feather.icons.moon.toSvg());
    }

    $("#darkmode a").click(function () {
        if (isDark) {
            isDark = false;
            $("#darkmode svg").replaceWith(feather.icons.moon.toSvg());

            $(this).addClass("is-warning");
            $(this).removeClass("is-dark");
        }
        else {
            isDark = true;
            $("#darkmode svg").replaceWith(feather.icons.sun.toSvg());

            $(this).removeClass("is-warning");
            $(this).addClass("is-dark");
        }

        //darkmode.toggle();
        openLight.toggleMode();
    });
});*/

$("#toggle-mode").click(function () {
    //console.log("hy");
    openLight.toggleMode();
});

$("a[href*=\\#]:not([href=\\#])").click(function () {
    //console.log(this)

    animateHashtag(this, 500);
    sessionStorage.setItem('recentThis', this);
});

function animateHashtag(param, speed)
{
    if (location.pathname.replace(/^\//, '') == param.pathname.replace(/^\//, '')
        || location.hostname == param.hostname) {

        var target = $(param.hash),
            headerHeight = 100; // Get fixed header height

        target = target.length ? target : $('[name=' + param.hash.slice(1) + ']');

        if (target.length) {
            $('html,body').stop().dequeue().animate({
                scrollTop: target.offset().top - headerHeight
            }, speed);
            return false;
        }
    }
}

function resizeAllGridItems() {
    var grid = $("#grid-posts");
    var rowHeight = parseFloat(grid.css('grid-auto-rows'));
    var rowGap = parseFloat(grid.css('row-gap'));

    $(".postcard-wrapper").each(function () {
        var rowSpan = Math.ceil(($(this).find(".home-postcard").outerHeight(true) + rowGap) / (rowHeight + rowGap));
        $(this).css('grid-row-end', 'span ' + rowSpan);
    });
}

window.addEventListener("resize", resizeAllGridItems);

// Horizontal Scroll
jQuery(function (e) { e.fn.hScroll = function (l) { l = l || 120, e(this).bind("DOMMouseScroll mousewheel", function (t) { var i = t.originalEvent, n = i.detail ? i.detail * -l : i.wheelDelta, o = e(this).scrollLeft(); o += n > 0 ? -l : l, e(this).scrollLeft(o), t.preventDefault() }) } })

$(document).ready(function () {
    $(".is-hor-scroll").hScroll(25); // You can pass (optionally) scrolling amount
});

// Auto Scroll
function allAutoScrolls() {
    $(".is-auto-scroll").each(function () {
        if ($(this)[0].clientWidth < $(this)[0].scrollWidth) {
            $(this).scroll();
            loopAnimation($(this), true, 0);

            $(this).hover(function () {
                $(this).dequeue().stop();
            }, function () {
                loopAnimation($(this), true, 0);
            });
        }        
    });
}

function loopAnimation(chosen, goRight, prevVal) {
    if (goRight == true)
    {
        chosen.animate({
            scrollLeft: '+=100'
        }, 2500, "linear",
            function () {
                if (chosen.scrollLeft() - prevVal < 95) {
                    //console.log("reached end!");
                    loopAnimation(chosen, false, chosen.scrollLeft());
                }
                else
                {
                    loopAnimation(chosen, true, chosen.scrollLeft());
                }
            });
    }
    else
    {
        chosen.animate({
            scrollLeft: '-=100'
        }, 2500, "linear",
            function () {
                if (chosen.scrollLeft() == 0) {
                    //console.log("reached start!");
                    loopAnimation(chosen, true, chosen.scrollLeft());
                }
                else {
                    loopAnimation(chosen, false, chosen.scrollLeft());
                }
            });
    }
}