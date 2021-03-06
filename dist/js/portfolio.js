let cyclingOpeningH1 = null;
let showingOpening = false;

function showIcon(target) {
    target.parentElement.parentElement.classList.add("activated");
    target.parentElement.parentElement.classList.remove("deactivated");
    setTimeout(
        () => {
            $(target.parentElement).on("mouseover", function() {
                $(this).off("mouseover");
                $(this).on("mouseleave", function() {
                    for (var i = 0; i < 4; i++) {
                        hideIconTitle("icon_title" + i);
                    }
                    this.parentElement.classList.remove("activated");
                    this.parentElement.classList.add("deactivated");
                    $(this).off("mouseleave");
                });
            });
        },
        1000
    );
}

function asyncSleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const opening_text_p = "Hi, I'm Linh";
const opening_text_h2 = "I can be your ...";
const opening_text_h1 = ["SYSTEM ENGINEER", "FULL-STACK WEB DEVELOPER", "MOBILE APP DEVELOPER", "DESKTOP APP DEVELOPER", "SYSTEM ARCHITECT"];
const opening_background_img = ["system_engineer.png", "web.png", "mobile_app.png", "desktop_app.png", "system_architect.png"];

async function print_job_text() {
    try {
        $("#opening>h1").prop("cycling_inprogress", true);
        while ($("#opening>h1").prop("cycling")) {
            let index = $("#opening>h1").prop("cycling_index");
            $("#opening .opening_background img").removeClass("show");
            $("#opening>h1").removeClass("pause_writing");
            $("#opening>h1").addClass("writing");
            let i = opening_text_h1[index].length;
            while (i > 0 && $("#opening>h1").prop("cycling")) {
                await asyncSleep(50);
                if ($("#opening").hasClass("abortCycle")) {
                    $("#opening").removeClass("abortCycle");
                    return;
                }
                i = i - 1;
                $("#opening>h1").text(opening_text_h1[index].substring(0, i));
            }
            if (i == 0) {
                $("#opening>h1").removeClass("writing");
                $("#opening>h1").addClass("pause_writing");
                await asyncSleep(300);
                if ($("#opening").hasClass("abortCycle")) {
                    $("#opening").removeClass("abortCycle");
                    return;
                }
                index = (index + 1) % opening_text_h1.length;
                $("#opening>h1").prop("cycling_index", index);
                $("#opening>h1").removeClass("pause_writing");
                $("#opening>h1").addClass("writing");
            }
            $("#opening .opening_background img").attr("src", "./img/" + opening_background_img[index]);
            $("#opening .opening_background img").addClass("show");
            while (i < opening_text_h1[index].length) {
                await asyncSleep(50);
                if ($("#opening").hasClass("abortCycle")) {
                    $("#opening").removeClass("abortCycle");
                    return;
                }
                $("#opening>h1").append(opening_text_h1[index].charAt(i) + "");
                i = i + 1;
            }
            $("#opening>h1").removeClass("writing");
            $("#opening>h1").addClass("pause_writing");
            await asyncSleep(1000);
            if ($("#opening").hasClass("abortCycle")) {
                $("#opening").removeClass("abortCycle");
                return;
            }
        }
        $("#opening>h1").prop("cycling_inprogress", false);
    } catch (e) {
        console.log(e);
        return;
    }
}

async function print_text_opening() {
    showingOpening = true;
    $("#opening").replaceWith('<div id="opening" class="opening scrollShow"></div>');
    $("#opening").append('<span class="opening_background"><img src="./img/me.png"></span>');
    $("#opening").append("<p></p>");
    $("#opening>p").addClass("pause_writing");
    await asyncSleep(500);
    if ($("#opening").hasClass("abort")) {
        $("#opening").removeClass("abort");
        return;
    }
    $("#opening .opening_background img").addClass("show");
    $("#opening>p").removeClass("pause_writing");
    $("#opening>p").addClass("writing");
    for (var char of opening_text_p) {
        await asyncSleep(50);
        if ($("#opening").hasClass("abort")) {
            $("#opening").removeClass("abort");
            return;
        }
        $("#opening>p").append(char);
    }

    $("#opening>p").removeClass("writing");
    $("#opening>p").addClass("pause_writing");
    await asyncSleep(2000);
    if ($("#opening").hasClass("abort")) {
        $("#opening").removeClass("abort");
        return;
    }
    $("#opening>p").removeClass("pause_writing");

    $("#opening").append("<h2></h2>");
    $("#opening>h2").addClass("pause_writing");
    await asyncSleep(300);
    if ($("#opening").hasClass("abort")) {
        $("#opening").removeClass("abort");
        return;
    }
    $("#opening .opening_background img").removeClass("show");
    $("#opening>h2").removeClass("pause_writing");
    $("#opening>h2").addClass("writing");
    for (var char of opening_text_h2) {
        await asyncSleep(50);
        if ($("#opening").hasClass("abort")) {
            $("#opening").removeClass("abort");
            return;
        }
        $("#opening>h2").append(char);
    }

    $("#opening>h2").removeClass("writing");
    $("#opening>h2").addClass("pause_writing");
    await asyncSleep(1000);

    $("#opening>h2").removeClass("pause_writing");
    $("#opening>h2").addClass("writing");
    for (let length = opening_text_h2.length - 1; length >= opening_text_h2.length - 4; length--) {
        await asyncSleep(50);
        if ($("#opening").hasClass("abort")) {
            $("#opening").removeClass("abort");
            return;
        }
        $("#opening>h2").text(opening_text_h2.substring(0, length));
    }
    $("#opening>h2").removeClass("writing");

    let $h1 = $(document.createElement("h1"));
    $h1.prop("cycling", true);
    $h1.prop("cycling_index", 0);
    $h1.prop("cycling_inprogress", true);
    $h1.on("mouseover", function() {
        $("#opening>h1").prop("cycling", false);
    });
    $h1.on("mouseleave", function() {
        $("#opening>h1").prop("cycling", true);
        if (!$("#opening>h1").prop("cycling_inprogress")) {
            cyclingOpeningH1 = print_job_text();
        }
    });

    $("#opening").append($h1);
    $("#opening>h1").addClass("pause_writing");
    await asyncSleep(300);
    if ($("#opening").hasClass("abort")) {
        $("#opening").removeClass("abort");
        return;
    }

    $("#opening .opening_background img").attr("src", "./img/" + opening_background_img[0]);
    $("#opening .opening_background img").addClass("show");
    $("#opening>h1").removeClass("pause_writing");
    $("#opening>h1").addClass("writing");
    for (let char of opening_text_h1[0]) {
        await asyncSleep(50);
        if ($("#opening").hasClass("abort")) {
            $("#opening").removeClass("abort");
            return;
        }
        $("#opening>h1").append(char);
    }
    $("#opening>h1").removeClass("writing");
    $("#opening>h1").addClass("pause_writing");
    await asyncSleep(1000);
    if ($("#opening").hasClass("abort")) {
        $("#opening").removeClass("abort");
        return;
    }
    if ($("#opening>h1").prop("cycling")) {
        cyclingOpeningH1 = print_job_text();
    }
    showingOpening = false;
}

function showIconTitle(id) {
    $("#" + id).addClass("show");
    $("#" + id).removeClass("hide");
}

function hideIconTitle(id) {
    $("#" + id).addClass("hide");
    $("#" + id).removeClass("show");
}

async function animateDecode() {

}

async function showAboutMe() {
    //encode every thing
    var crypticChar = '????????????????"#$%&*@????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????';
    var h1Text = $("#about_me>h1").text();
    let h1Newtext = "";
    for (var char of h1Text) {
        if (char != ' ') {
            h1Newtext += (crypticChar.charAt(Math.floor(Math.random() * crypticChar.length)));
        } else {
            h1Newtext += char;
        }
    }
    $("#about_me>h1").text(h1Newtext);

    var pText = [];
    for (var p of $("#about_me>p")) {
        pText.push($(p).text())
        let pNewText = "";
        for (var char of $(p).text()) {
            if (char != ' ') {
                pNewText += (crypticChar.charAt(Math.floor(Math.random() * crypticChar.length)));
            } else {
                pNewText += char;
            }
        }
        $(p).text(pNewText);
    }
    $("#about_me").removeClass("scrollHide");
    $("#about_me").addClass("scrollShow");
    //decode h1

}

function showHandler(item) {
    if (item.id == "opening") {
        $(item).removeClass("scrollHide");
        $(item).addClass("scrollShow");
        (async() => {
            while ($("#opening").hasClass("abortCycle") || $("#opening").hasClass("abort")) {
                await asyncSleep(50);
            }
            print_text_opening();
        })();
    } else if (item.id == "about_me") {
        showAboutMe();
    } else {
        $(item).removeClass("scrollHide");
        $(item).addClass("scrollShow");
    }
}

function hideHandler(item) {
    if (item.id == "opening") {
        $("#opening").replaceWith('<div id="opening" class="opening ' + (cyclingOpeningH1 == null ? "" : "abortCycle ") + (showingOpening ? 'abort ' : '') + 'scrollHide"></div>');
    } else {
        $(item).removeClass("scrollShow");
        $(item).addClass("scrollHide");
    }
}

function onScrollHandler() {
    for (let item of $(".scrollHide")) {
        if (item.getBoundingClientRect().top < window.innerHeight * 0.9 && item.getBoundingClientRect().bottom > window.innerHeight * 0.1) {
            showHandler(item);
        }
    }
    for (let item of $(".scrollShow")) {
        if (item.getBoundingClientRect().top >= window.innerHeight * 0.9 || item.getBoundingClientRect().bottom <= window.innerHeight * 0.1) {
            hideHandler(item);
        }
    }
}

Vue.component('navlink-item', {
    props: ['data'],
    template: ` <div class="a_holder">
                    <a :href="data.link">{{data.text}}</a>
                </div>`
});

Vue.component('contact-icon', {
    props: ['data'],
    template: ` <li v-on:mouseover="data.mouseOver" v-on:mouseleave="data.mouseLeave">
                    <img :src="data.imgSrc" class="contact icon">
                </li>`
});

Vue.component('contact-icon-title', {
    props: ['data'],
    template: ` <li :id="'icon_title' + data.id">
                    <span>{{data.text}}</span>
                </li>`
});

var navlinks = new Vue({
    el: "#nav_links",
    data: {
        items: [
            { id: 0, text: "about me", link: "#about_me" },
            { id: 1, text: "why me", link: "#why_me" },
            { id: 2, text: "my works", link: "#projects" }
        ]
    }
});

var contactbox = new Vue({
    el: '#contact_box',
    data: {
        items: [{
                id: 0,
                imgSrc: "./img/mail_icon.png",
                text: "mai.quang.linh.hl97@gmail.com",
                mouseOver: function() { showIconTitle('icon_title0') },
                mouseLeave: function() { hideIconTitle('icon_title0') }
            },
            {
                id: 1,
                imgSrc: "./img/linkedin_icon.png",
                text: "linkedin",
                mouseOver: function() { showIconTitle('icon_title1') },
                mouseLeave: function() { hideIconTitle('icon_title1') }
            },
            {
                id: 2,
                imgSrc: "./img/facebook_icon.png",
                text: "facebook",
                mouseOver: function() { showIconTitle('icon_title2') },
                mouseLeave: function() { hideIconTitle('icon_title2') }
            },
            {
                id: 3,
                imgSrc: "./img/github_icon.png",
                text: "github",
                mouseOver: function() { showIconTitle('icon_title3') },
                mouseLeave: function() { hideIconTitle('icon_title3') }
            },
        ]
    }
})

var opening = new Vue({
    el: "#opening"
});

var skill = new Vue({
    el: "#skills",
    data: {
        items: [{
                skillName: 'HTML<br/>CSS',
                lvl: "lvl60",
            },
            {
                skillName: "JS<br/>JQuery",
                lvl: "lvl70",
            },
            {
                skillName: "React",
                lvl: "lvl50",
            },
            {
                skillName: "Flutter",
                lvl: "lvl40",
            },
            {
                skillName: "Swift",
                lvl: "lvl40",
            },
            {
                skillName: "SQL",
                lvl: "lvl70",
            },
            {
                skillName: "Java<br/>Spring",
                lvl: "lvl60",
            },
            {
                skillName: "Node<br/>Express",
                lvl: "lvl60",
            },
            {
                skillName: "AWS",
                lvl: "lvl60",
            }
        ],
        lvls: [{
                lvlName: "<strong>Super&nbsp;Advance:</strong><br/>I'm an all knowing God."
            },
            {
                lvlName: "<strong>Advance:</strong><br/>I'm somewhat of an expert."
            },
            {
                lvlName: "<strong>Upper&nbsp;Intermediate:</strong><br/>I have experience working with it."
            },
            {
                lvlName: "<strong>Intermediate:</strong><br/>I know all of the basic."
            },
            {
                lvlName: "<strong>Beginner:</strong><br/>I just started learning it."
            },
            {
                lvlName: "<strong>Uhh...:</strong><br/>This thing existed ??!"
            }
        ]
    }
});

window.addEventListener("scroll", onScrollHandler);
onScrollHandler();