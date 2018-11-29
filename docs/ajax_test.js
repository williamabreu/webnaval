$(document).on("submit", "#form1", function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/ajax/post/",
        data: {
            text: $("#input1").val(),
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
        },
        success: function() {
            alert("AJAX OK!");
        }
    })
})