(function($) {
    /**
     * Language selection box
     */

    $(function () {
        $(".language-select").change(function () {
            var newPath = $(this).val();
            window.location.assign(newPath);
        });
    });
})(jQuery);