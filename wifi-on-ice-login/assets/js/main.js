function gup(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
};

(function ($) {
    $(document).ready(function () {
        checkErrors();
        updateUserInfo();
        setInterval(updateUserInfo, 30000);
    });

    /**
     * Check if portal is responding, display button if available
     */

    this.updateContent = function (fraction) {
        var percentage = Math.floor(fraction * 100);

        $(".progress-bar").attr("aria-valuenow", percentage);
        $(".progress-bar").css({
            "width": percentage + "%"
        });

        if (fraction == 1) {
            $(".throttled").show();
            $(".unthrottled").hide();
        } else {
            $(".throttled").hide();
            $(".unthrottled").show();
        }
    }

    this.updateUserInfo = function () {
        $.ajax({
            url: "/usage_info/",
            error: function (response) {
                console.log(response.responseText);
                console.log("Data usage bar is being hidden.")
                $(".throttled, .unthrottled").hide();
            },
            success: function (response) {
                updateContent(parseFloat(response));
            }
        });
    }

    /**
     * Check errors
     * Method for toggling visibility of eventual errors
     * Parses error code to an int
     */
    this.checkErrors = function () {
        if (gup("error") != "") {
            try {
                var errorCode = gup("error");
                switch (errorCode) {
                    case 'payment':
                        showError('payment');
                        break;
                    case 'email':
                        showError('email');
                        break;
                    case 'login':
                        showError('voucher');
                        break;
                    case 'logout':
                        showError('voucher');
                        break;
                    case 'create_voucher':
                        showError('create_voucher');
                        break;
                    case 'no_voucher':
                        showError('no_voucher');
                        break;
                    case 'invalid_voucher':
                        showError('invalid_voucher');
                        break;
                    default:
                        showError("default");
                        break;
                }
            } catch (e) {}
        } else {
            $(".error").hide();
        }
    };
    this.showError = function (errorCode) {
        $("#error-" + errorCode).show();
    };
})(jQuery);