function showIcon(target) {
    target.parentElement.parentElement.classList.add("activated");
    target.parentElement.parentElement.classList.remove("deactivated");
    setTimeout(
        () => {
            $(target.parentElement).on("mouseover", function() {
                $(this).off("mouseover");
                $(this).on("mouseleave", function() {
                    for (var i = 1; i <= 4; i++) {
                        hideIconTitle("icon_title" + i);
                    }
                    this.parentElement.classList.remove("activated");
                    this.parentElement.classList.add("deactivated");
                    var new_element = this.cloneNode(true);
                    this.parentNode.replaceChild(new_element, this);
                });
            });
        },
        1000
    );
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
    template: ` li id="icon_title{{data.id}}">
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
                mouseOver: function() { showIconTitle('icon_title1') },
                mouseLeave: function() { hideIconTitle('icon_title1') }
            },
            {
                id: 1,
                imgSrc: "./img/linkedin_icon.png",
                text: "linkedin",
                mouseOver: function() { showIconTitle('icon_title2') },
                mouseLeave: function() { hideIconTitle('icon_title2') }
            },
            {
                id: 2,
                imgSrc: "./img/facebook_icon.png",
                text: "facebook",
                mouseOver: function() { showIconTitle('icon_title3') },
                mouseLeave: function() { hideIconTitle('icon_title3') }
            },
            {
                id: 3,
                imgSrc: "./img/github_icon.png",
                text: "github",
                mouseOver: function() { showIconTitle('icon_title4') },
                mouseLeave: function() { hideIconTitle('icon_title4') }
            },
        ]
    }
})