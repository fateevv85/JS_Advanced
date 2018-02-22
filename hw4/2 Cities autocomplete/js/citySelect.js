//construction for jQuery
(function ($) {
  //starts on document.ready
  $(function () {
    //regular expression for input field
    var $cityRE = /^[a-zа-яё]{3,}$/i;
    //var input field
    var $cityRange = $('#city_range');
    //add events on keyup in input field
    $cityRange.on('keyup', function () {
      //if input text according to reg.expr.
      if ($cityRE.test(this.value)) {
        $(this).parent().removeClass('wrong_input');
        var $citiesArr = [];
        $.ajax({
          url: 'http://api.spacenear.ru/index.php',
          type: 'POST',
          data: {pattern: this.value},
          dataType: 'json',
          success: function (cities) {
            $.each(cities, function (index, value) {
              console.log(index + ': ' + value.name);
              console.log('111');
              $citiesArr.push(value.name);
            });
            console.log(cities);
            console.log('success');
          },
          error: function () {
            console.log('cant find that city!');
          }
        }).done(function () {
          //if 'city list' non existing, create it
          if (!$('#city_list').length && $citiesArr.length > 0) {
            //create 'select' element
            var $select = $('<select size="5" />').attr('id', 'city_list').hide();
            for (var i = 0; i < $citiesArr.length; i++) {
              var $option = $('<option />');
              $option.attr('value', $citiesArr[i]).text($citiesArr[i]).dblclick(function () {
                $cityRange.val(this.value);
                $(this).parent().slideUp(function () {
                  $(this).remove();
                });
              });
              $select.append($option);
            }
            $('#city_input').append($select);
            //add animation when select menu appearing (city list)
            $($select).slideDown();
          }
        });
      } else {
        //if input text disaccording with reg.expr. add red border and message
        $(this).parent().addClass('wrong_input');
        //removing city list
        $('#city_list').slideUp(function () {
          $(this).remove();
        });
      }
    });
  });
})(jQuery);