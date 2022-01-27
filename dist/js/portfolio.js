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