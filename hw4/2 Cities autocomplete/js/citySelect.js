//construction for jQuery
(function ($) {
  //starts on document.ready
  $(function () {
    //regular expression for input field
    var $cityRE = /^[а-яё]+$/i;
    //input field
    var $cityInput = $('#city_input');
    //parent div
    var $divParent = $('#city_input_form');
    //add events on keyup in input field
    $cityInput.on('keyup', function () {
      //if input text according to reg.expr.
      if ($cityRE.test(this.value) && $cityInput.value.length > 2) {
        $divParent.removeClass('wrong_input');
        $divParent.removeClass('wrong_city');
        var $citiesArr = [];
        $.ajax({
          url: 'http://api.spacenear.ru/index.php',
          type: 'POST',
          data: {pattern: this.value},
          dataType: 'json',
          success: function (cities) {
            $.each(cities, function (index, value) {
              $citiesArr.push(value.name);
            });
          },
          error: function () {
            console.log('error!');
          },
          //add progress indicator
          xhr: function(){
            // get the native XmlHttpRequest object
            var xhr = $.ajaxSettings.xhr() ;
            // set the onprogress event handler
            xhr.upload.onprogress = function(evt){ console.log('progress', evt.loaded/evt.total*100) } ;
            // set the onload event handler
            xhr.upload.onload = function(){ console.log('DONE!') } ;
            // return the customized object
            return xhr ;
          }
          //when server return answer
        }).done(function () {
          //if 'city list' non existing, create it
          if (!$('#city_list').length && $citiesArr.length > 0) {
            //create 'select' element
            var $select = $('<select size="5" />').attr('id', 'city_list').hide();
            for (var i = 0; i < $citiesArr.length; i++) {
              var $option = $('<option />');
              //create list of cities and add events on double click
              $option.attr('value', $citiesArr[i]).text($citiesArr[i]).dblclick(function () {
                $cityInput.val(this.value);
                $(this).parent().slideUp(function () {
                  $(this).remove();
                });
              });
              $select.append($option);
            }
            $divParent.append($select);
            //add animation when select menu appearing (city list)
            $($select).slideDown();
            //if array of cities names is empty then
          } else if ($citiesArr.length === 0) {
            //show message 'No such city'
            $divParent.addClass('wrong_city');
            //remove city list
            $('#city_list').slideUp(function () {
              $(this).remove();
            });
          }
        });
      } else {
        //if input text disaccording with reg.expr. add red border and message
        //'only russian letters!'
        $divParent.addClass('wrong_input');
        //removing city list
        $('#city_list').slideUp(function () {
          $(this).remove();
        });
      }
    });
  });
})(jQuery);
