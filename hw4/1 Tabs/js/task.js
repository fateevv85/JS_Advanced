(function ($) {
  $(function () {
    $('.tab').on('click', function () {
      $(this).parent().find('.tab.active').toggleClass('active').next().hide();
      $(this).toggleClass('active').next().show();
    })
  });
})(jQuery);
