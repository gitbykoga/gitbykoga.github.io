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

var currentHash = "wtf"

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

$(".mode-toggle").click(function () {
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
            headerHeight = 95; // Get fixed header height

        target = target.length ? target : $('[name=' + param.hash.slice(1) + ']');

        if (target.length) {
            $('html,body').stop().dequeue().animate({
                scrollTop: target.offset().top - headerHeight
            }, speed);
            return false;
        }
    }
}

function delayResize() {
    setTimeout(() => {
        resizeAllGridItems();
    }, 50);
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

// Horizontal Scroll
$(function (e) {
    e.fn.hScroll = function (l) {
        l = l || 120, e(this).bind(
            "DOMMouseScroll mousewheel",
            function (t) {
                var i = t.originalEvent, n = i.detail ? i.detail * -l : i.wheelDelta, o = e(this).scrollLeft(); o += n > 0 ? -l : l, e(this).scrollLeft(o), t.preventDefault()
            }
        )
    }
})

window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

// Auto Scroll
function allAutoScrolls() {
    $(".is-auto-scroll").each(function () {
        if ($(this)[0].clientWidth < $(this)[0].scrollWidth) {
            $(this).scroll();
            loopAnimation($(this), true, 0);
            
            $(this).click(function () {
                $(this).dequeue().stop();
            }, function () {
                loopAnimation($(this), true, 0);
            });
            
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
            scrollLeft: '+=25'
        }, 500, "linear",
            function () {
                if (chosen.scrollLeft() - prevVal < 24) {
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
            scrollLeft: '-=25'
        }, 500, "linear",
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