(function ($) {
  "use strict";

  // Form
  var quickForm = function () {
    if ($("#quickForm").length > 0) {
      $("#quickForm").validate({
        rules: {
          email: {
            required: true,
            email: true,
          },
          message: {
            required: true,
            minlength: 5,
          },
        },
        messages: {

          email: "Please enter a valid email address",
          message: "Please let me know how i can help you",
        },
        /* submit via ajax */

        submitHandler: function (form) {
          var $submit = $(".submitting"),
            waitText = "Submitting...";

          $.ajax({
            type: "POST",
            url: "php/quickEmail.php",
            data: $(form).serialize(),

            beforeSend: function () {
              $submit.css("display", "block").text(waitText);
            },
            success: function (msg) {
              if (msg == "OK") {
                $("#form-message-warning").hide();
                setTimeout(function () {
                  $("#quickForm").fadeIn();
                }, 1000);
                setTimeout(function () {
                  $("#form-message-success").fadeIn();
                }, 1400);

                setTimeout(function () {
                  $("#form-message-success").fadeOut();
                }, 8000);

                setTimeout(function () {
                  $submit.css("display", "none").text(waitText);
                }, 1400);

                setTimeout(function () {
                  $("#quickForm").each(function () {
                    this.reset();
                  });
                }, 1400);
              } else {
                $("#form-message-warning").html(msg);
                $("#form-message-warning").fadeIn();
                $submit.css("display", "none");
              }
            },
            error: function () {
              $("#form-message-warning").html(
                "Something went wrong. Please try again."
              );
              $("#form-message-warning").fadeIn();
              $submit.css("display", "none");
            },
          });
        }, // end submitHandler
      });
    }
  };
  quickForm();
})(jQuery);
