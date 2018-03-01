function Container() {
  this.userId = '';
  this.text = '';
  this.commentId = '';
}

function Review(options) {
  Container.call(this);
  this.userId = options.id_user;
  this.text = options.text;
  this.commentId = options.commentId;
  //метод добавления отзыва
  this.addReview = function (callback) {
    //данные для передачи на сервер
    data = {
      add_review: true,
      id_user: this.userId,
      text: this.text
    };
    //метод обращения к серверу
    this.xmlRequest(callback);
  };
  //метод одобрения отзыва
  this.approveReview = function (callback) {
    data = {
      approve_review: true,
      id_comment: this.commentId
    };
    this.xmlRequest(callback);
  };
  //метод вывода отзывов
  this.showReview = function () {
    //обновляем таблицу
    if (document.querySelector('table')) {
      document.querySelector('table').remove();
    }
    data = {
      show_reviews: true
    };
    this.xmlRequest();
  };
  //метод удаления отзывов
  this.deleteReview = function (callback) {
    data = {
      delete_review: true,
      id_comment: this.commentId
    };
    this.xmlRequest(callback);
  };
}

//метод отправления данных на сервер и заодно рендера таблицы
Review.prototype.xmlRequest = function (callback) {
  //т.к. данные - обьект, а на сервер должна передаваться строка вида:
  //add_review=true&id_user=1&text=text,
  //то преобразуем обьект в строку:
  var result = Object.keys(data).map(function (key) {
    return key + '=' + this[key];
  }, data);
  //сам запрос
  var xml = new XMLHttpRequest();
  xml.open('POST', Review.endpoint, true);
  //обязателен заголовок для POST-запроса
  xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xml.send(result.join('&'));
  xml.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        //т.к. рендер происходит только при выполнении showReview(),
        // то делаем проверку на существование свойства:
        if (data.show_reviews) {
          //и в нем помещаем рендер
          var content = JSON.parse(xml.responseText);
          //проверка на content
          if (!content.length && !content) {
            //информация для поля status
            document.querySelector('#status').value = 'Incorrect data';
          } else {
            //информация для поля status
            document.querySelector('#status').value = document.querySelector('#status').value + '\n' + xml.status + ': ' + xml.statusText + '\nReviews received';
            //start render
            //создаем таблицу с отзывами
            var table = document.createElement('table');
            for (var i = 0; i < content.length; i++) {
              var tr = document.createElement('tr');
              var th = document.createElement('th');
              //создаем порядковый номер отзыва
              th.textContent = content.length - i;
              tr.appendChild(th);
              //content - это массив обьектов, перебираем массив,
              // из каждого обьекта достаем значения и заполняем ими ячейки
              for (var prop in content[i]) {
                var td = document.createElement('td');
                //если у свойства есть имя "approve" и в нем стоит 1,
                // то присваиваем ему класс approved, для стилей css
                if (prop === 'approve' && content[i].approve === '1') {
                  td.classList.add('approved');
                  //если 0
                } else if (prop === 'approve' && content[i].approve === '0') {
                  td.classList.add('disapproved');
                  //для остальных свойств добавляем значения в ячейки
                } else {
                  td.innerText = content[i][prop];
                }
                tr.appendChild(td);
              }
              table.appendChild(tr);
            }
            document.querySelector('#tableMessage').appendChild(table);
          }
          //если метод не showReview(), то
        } else {
          //для поля status
          document.querySelector('#status').value = xml.responseText;
          //очищаем inputs
          document.querySelectorAll('.input_field').forEach(function (element) {
            element.value = '';
          });
          if (typeof callback === 'function') {
            callback();
          }
        }
        //при ошибке сервера
      } else {
        console.log('Error:' + xml.status + xml.statusText);
      }
    }
  }
};

Review.endpoint = 'http://api.spacenear.ru/comments.php';

window.onload = function () {
  //событие на кнопку addReview
  document.querySelector('#addReview').addEventListener('click', function () {
    var id_user = document.querySelector('#id_user').value;
    var text = document.querySelector('#text').value;
    //проверка на заполненность input
    if (id_user.trim() === '' || text.trim() === '') {
      console.log('Id or text is empty!')
    } else {
      //если inputs заполнены, то:
      a = new Review({
        id_user: id_user,
        text: text
      });
      //после добавления сообщения
      a.addReview(function () {
          //рендерим таблицу
          return a.showReview();
        }
      );
    }
  });
//событие на кнопку approveReview
  document.querySelector('#approveReview').addEventListener('click', function () {
    var idCommentField = document.querySelector('#id_comment').value;
    if (idCommentField.trim() === '') {
      document.querySelector('#status').value = 'Comment ID is empty!';
    } else {
      a = new Review({
        commentId: idCommentField
      });
      a.approveReview(function () {
          return a.showReview();
        }
      );
    }
  });
//событие на кнопку deleteReview
  document.querySelector('#deleteReview').addEventListener('click', function () {
    var idCommentField = document.querySelector('#id_comment').value;
    if (idCommentField.trim() === '') {
      document.querySelector('#status').value = 'Comment ID is empty!';
    } else {
      a = new Review({
        commentId: idCommentField
      });
      a.deleteReview(function () {
        return a.showReview();
      });
    }
  });
//событие на кнопку showReview
  document.querySelector('#showReview').addEventListener('click', function () {
    document.querySelector('#status').value = '';
    a = new Review({});
    a.showReview();
  });
};
