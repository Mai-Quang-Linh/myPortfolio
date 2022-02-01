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

const about_me_text_p = "Hi, I'm Linh";
const about_me_text_h2 = "I can be your ...";
const about_me_text_h1 = ["SYSTEM ENGINEER", "FULL-STACK WEB DEVELOPER", "MOBILE APP DEVELOPER", "DESKTOP APP DEVELOPER", "SYSTEM ARCHITECT"];
const about_me_background_img = ["system_engineer.png", "web.png", "mobile_app.png", "desktop_app.png", "system_architect.png"];

async function print_job_text() {
    while ($("#about_me>h1").prop("cycling")) {
        $("#about_me>h1").prop("cycling_inprogress", true);
        let index = $("#about_me>h1").prop("cycling_index");
        $("#about_me .about_me_background img").removeClass("show");
        $("#about_me>h1").removeClass("pause_writing");
        $("#about_me>h1").addClass("writing");
        for (let i in about_me_text_h1[index]) {
            await asyncSleep(50);
            $("#about_me>h1").text(about_me_text_h1[index].substring(0, about_me_text_h1[index].length - i - 1));
        }
        $("#about_me>h1").removeClass("writing");
        $("#about_me>h1").addClass("pause_writing");
        await asyncSleep(300);
        if ($("#about_me>h1").prop("cycling")) {
            index = (index + 1) % about_me_text_h1.length;
            $("#about_me>h1").prop("cycling_index", index);
        }
        $("#about_me .about_me_background img").attr("src", "./img/" + about_me_background_img[index]);
        $("#about_me .about_me_background img").addClass("show");
        $("#about_me>h1").removeClass("pause_writing");
        $("#about_me>h1").addClass("writing");
        for (let char of about_me_text_h1[index]) {
            await asyncSleep(50);
            $("#about_me>h1").append(char);
        }
        $("#about_me>h1").removeClass("writing");
        $("#about_me>h1").addClass("pause_writing");
        await asyncSleep(1000);
        $("#about_me>h1").prop("cycling_inprogress", false);
    }
}

async function print_text_about_me() {
    $("#about_me").html("");
    $("#about_me").append('<span class="about_me_background"><img src="./img/me.png"></span>');
    $("#about_me").append("<p></p>");
    $("#about_me>p").addClass("pause_writing");
    await asyncSleep(500);
    $("#about_me .about_me_background img").addClass("show");
    $("#about_me>p").removeClass("pause_writing");
    $("#about_me>p").addClass("writing");
    for (var char of about_me_text_p) {
        await asyncSleep(50);
        $("#about_me>p").append(char);
    }

    $("#about_me>p").removeClass("writing");
    $("#about_me>p").addClass("pause_writing");
    await asyncSleep(3000);
    $("#about_me>p").removeClass("pause_writing");

    $("#about_me").append("<h2></h2>");
    $("#about_me>h2").addClass("pause_writing");
    await asyncSleep(300);
    $("#about_me .about_me_background img").removeClass("show");
    $("#about_me>h2").removeClass("pause_writing");
    $("#about_me>h2").addClass("writing");
    for (var char of about_me_text_h2) {
        await asyncSleep(50);
        $("#about_me>h2").append(char);
    }

    $("#about_me>h2").removeClass("writing");
    $("#about_me>h2").addClass("pause_writing");
    await asyncSleep(1000);
    $("#about_me>h2").removeClass("pause_writing");
    $("#about_me>h2").addClass("writing");
    for (let length = about_me_text_h2.length - 1; length >= about_me_text_h2.length - 4; length--) {
        await asyncSleep(50);
        $("#about_me>h2").text(about_me_text_h2.substring(0, length));
    }
    $("#about_me>h2").removeClass("writing");

    let $h1 = $(document.createElement("h1"));
    $h1.prop("cycling", true);
    $h1.prop("cycling_index", 0);
    $h1.on("mouseover", function() {
        $("#about_me>h1").prop("cycling", false);
    });
    $h1.on("mouseleave", function() {
        $("#about_me>h1").prop("cycling", true);
        if (!$("#about_me>h1").prop("cycling_inprogress")) {
            print_job_text();
        }
    });

    $("#about_me").append($h1);
    $("#about_me>h1").addClass("pause_writing");
    await asyncSleep(300);

    $("#about_me .about_me_background img").attr("src", "./img/" + about_me_background_img[0]);
    $("#about_me .about_me_background img").addClass("show");
    $("#about_me>h1").removeClass("pause_writing");
    $("#about_me>h1").addClass("writing");
    for (let char of about_me_text_h1[0]) {
        await asyncSleep(50);
        $("#about_me>h1").append(char);
    }
    $("#about_me>h1").removeClass("writing");
    $("#about_me>h1").addClass("pause_writing");
    await asyncSleep(1000);
    if ($("#about_me>h1").prop("cycling")) {
        print_job_text();
    }
}

function showIconTitle(id) {
    $("#" + id).addClass("show");
    $("#" + id).removeClass("hide");
}

function hideIconTitle(id) {
    $("#" + id).addClass("hide");
    $("#" + id).removeClass("show");
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
            { id: 0, text: "me", link: "" },
            { id: 1, text: "my works", link: "./project.html" },
            { id: 2, text: "why me", link: "./cv.html" }
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

var about_me = new Vue({
    el: "#about_me",
    data: {

    },
    created: print_text_about_me,
});