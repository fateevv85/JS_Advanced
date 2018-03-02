(function ($) {
  $(function () {
    $('#date').datepicker({
      firstDay: 1,
      dateFormat: 'dd.mm.yy',
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
    });
    $('#dialogW').dialog({
      width: 100,
      height: 100
    });
  });
})(jQuery);