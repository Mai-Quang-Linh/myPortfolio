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

async function print_text(print_into, text, delay) {
    for (var char of text) {
        await asyncSleep(delay);
        $(print_into).append(char);
    }
}

const about_me_text_p = "Hi, I'm Linh";
const about_me_text_h2 = "I can be your";
const about_me_text_h1 = ["SYSTEM ENGINEER", "FULL-STACK WEB DEVELOPER", "MOBILE DEVELOPER", "DESKTOP APPLICATION DEVELOPER", "SYSTEM ARCHITECT"];

async function print_job_text() {
    let index = 0;
    while ($("#about_me>h1").prop("cycling") == "true") {
        for (let char of about_me_text_h1[index]) {
            await asyncSleep(50);
            $("#about_me>h1").append(char);
        }
        await asyncSleep(1000);
        for (let i in about_me_text_h1[index]) {
            await asyncSleep(50);
            $("#about_me>h1").text(about_me_text_h1[index].substring(0, about_me_text_h1[index].length - i - 1));
        }
        await asyncSleep(100);
        index = (index + 1) % about_me_text_h1.length;
    }
}

async function print_text_about_me() {
    $("#about_me").html("");
    await asyncSleep(200);
    $("#about_me").append("<p></p>");
    for (var char of about_me_text_p) {
        await asyncSleep(50);
        $("#about_me>p").append(char);
    }
    await asyncSleep(1000);
    $("#about_me").append("<h2></h2>");
    for (var char of about_me_text_h2) {
        await asyncSleep(50);
        $("#about_me>h2").append(char);
    }
    await asyncSleep(1000);
    $("#about_me").append("<h1></h1>");
    $("#about_me>h1").prop("cycling", "true");
    print_job_text();
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