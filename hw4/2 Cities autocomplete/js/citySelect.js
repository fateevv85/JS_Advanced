(function ($) {
  $(function () {
    var $cityRE = /^[a-zа-яё]{3,}$/i;
    $('#city-range').on('keyup', function () {
      if ($cityRE.test(this.value)) {
        $(this).parent().removeClass('wrong_input');
        console.log(this.value);
        $.ajax({
          url: 'http://api.spacenear.ru/index.php',
          type: 'POST',
          data: {pattern: this.value},
          dataType: 'json',
          success: function (cities) {
            $.each(cities, function (index, value) {
              console.log(index + ': ' + value.name);
            });
            console.log(cities);
            console.log('success');
          },
          error: function () {
            console.log('cant find that city!');
          }
        });
      } else {
        $(this).parent().addClass('wrong_input');
      }
    });
  });
})(jQuery);