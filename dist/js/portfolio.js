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
    $("#opening>h1").prop("cycling_inprogress", true);
    while ($("#opening>h1").prop("cycling")) {
        let index = $("#opening>h1").prop("cycling_index");
        $("#opening .opening_background img").removeClass("show");
        $("#opening>h1").removeClass("pause_writing");
        $("#opening>h1").addClass("writing");
        let i = opening_text_h1[index].length;
        while (i > 0 && $("#opening>h1").prop("cycling")) {
            await asyncSleep(50);
            i = i - 1;
            $("#opening>h1").text(opening_text_h1[index].substring(0, i));
        }
        if (i == 0) {
            $("#opening>h1").removeClass("writing");
            $("#opening>h1").addClass("pause_writing");
            await asyncSleep(300);
            index = (index + 1) % opening_text_h1.length;
            $("#opening>h1").prop("cycling_index", index);
            $("#opening>h1").removeClass("pause_writing");
            $("#opening>h1").addClass("writing");
        }
        $("#opening .opening_background img").attr("src", "./img/" + opening_background_img[index]);
        $("#opening .opening_background img").addClass("show");
        while (i < opening_text_h1[index].length) {
            await asyncSleep(50);
            $("#opening>h1").append(opening_text_h1[index].charAt(i) + "");
            i = i + 1;
        }
        $("#opening>h1").removeClass("writing");
        $("#opening>h1").addClass("pause_writing");
        await asyncSleep(1000);
    }
    $("#opening>h1").prop("cycling_inprogress", false);
}

async function print_text_opening() {
    $("#opening").html("");
    $("#opening").append('<span class="opening_background"><img src="./img/me.png"></span>');
    $("#opening").append("<p></p>");
    $("#opening>p").addClass("pause_writing");
    await asyncSleep(500);
    $("#opening .opening_background img").addClass("show");
    $("#opening>p").removeClass("pause_writing");
    $("#opening>p").addClass("writing");
    for (var char of opening_text_p) {
        await asyncSleep(50);
        $("#opening>p").append(char);
    }

    $("#opening>p").removeClass("writing");
    $("#opening>p").addClass("pause_writing");
    await asyncSleep(2000);
    $("#opening>p").removeClass("pause_writing");

    $("#opening").append("<h2></h2>");
    $("#opening>h2").addClass("pause_writing");
    await asyncSleep(300);
    $("#opening .opening_background img").removeClass("show");
    $("#opening>h2").removeClass("pause_writing");
    $("#opening>h2").addClass("writing");
    for (var char of opening_text_h2) {
        await asyncSleep(50);
        $("#opening>h2").append(char);
    }

    $("#opening>h2").removeClass("writing");
    $("#opening>h2").addClass("pause_writing");
    await asyncSleep(1000);
    $("#opening>h2").removeClass("pause_writing");
    $("#opening>h2").addClass("writing");
    for (let length = opening_text_h2.length - 1; length >= opening_text_h2.length - 4; length--) {
        await asyncSleep(50);
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
            print_job_text();
        }
    });

    $("#opening").append($h1);
    $("#opening>h1").addClass("pause_writing");
    await asyncSleep(300);

    $("#opening .opening_background img").attr("src", "./img/" + opening_background_img[0]);
    $("#opening .opening_background img").addClass("show");
    $("#opening>h1").removeClass("pause_writing");
    $("#opening>h1").addClass("writing");
    for (let char of opening_text_h1[0]) {
        await asyncSleep(50);
        $("#opening>h1").append(char);
    }
    $("#opening>h1").removeClass("writing");
    $("#opening>h1").addClass("pause_writing");
    await asyncSleep(1000);
    if ($("#opening>h1").prop("cycling")) {
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


Vue.component('skill-cell', {
    props: ['data'],
    template: `
    {{#if (data.id%2 == 0)}}
        <tr> 
    {{/if}}
            <td>
                <table>
                    <tr>
                        <th><h2>{{data.skill_name}}</h2></th>
                        <th><div class = "lvl-bar"></div></th>
                    </tr>
                <table>
            </td>
    {{#if (data.id%2 == 1)}}
        </tr> 
    {{/if}}`
});

var navlinks = new Vue({
    el: "#nav_links",
    data: {
        items: [
            { id: 0, text: "about me", link: "" },
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

var opening = new Vue({
    el: "#opening",
    data: {

    },
    created: print_text_opening,
});