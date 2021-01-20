$().ready(function () {
    resizeAllGridItems();
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
openLight.addOverrideByClassName("darkover");
openLight.init();

var isDark = readCookie("openlightcookie") === "dark";

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
});

$(function () {
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
});

function resizeAllGridItems() {
    var grid = $("#home-posts");
    var rowHeight = parseFloat(grid.css('grid-auto-rows'));
    var rowGap = parseFloat(grid.css('row-gap'));

    $(".postcard-wrapper").each(function () {
        var rowSpan = Math.ceil(($(this).find(".home-postcard").outerHeight(true) + rowGap) / (rowHeight + rowGap));
        $(this).css('grid-row-end', 'span ' + rowSpan);
    });
}

window.addEventListener("resize", resizeAllGridItems);