function Container() {
  this.id = '';
  this.className = '';
  this.element = null;
}

Container.prototype.render = function () {
  if (this.element) {
    return this.element;
  } else {
    var div = document.createElement('div');
    div.id = this.id;
    div.classList.add(this.className);
    this.element = div;
    return div;
  }
};

function Cart(options) {
  Container.call(this);

  this.id = options.id;
  this.className = options.className;
  this.userId = options.userId;

  var content;
  //чтобы в дальнейшем не терять контекст
  var that = this;
  //этот метод создаем не через прототип, потому что
  //хотим сделать его приватным, недоступным извне
  this.init = function (callback) {
    var request = new XMLHttpRequest();

    // GET
    //так все работает
    request.open('GET', Cart.endpoint + '/basket', true);
    request.send(null);

    // POST
    /*
    что-то я не так здесь делаю, не пойму что.

        request.open('POST', Cart.endpoint + '/basket', true);
        var str = {
          'userId': options.userId};
        console.log(str);
        var body = JSON.stringify(str);

        //возвращает ответ 201, и удлаяет данные на сервере.
        var body = ('userId:' + options.userId);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send('userId' + options.userId);

        //если делать так, то возвращает ответ 400
        request.setRequestHeader("Content-Type", "application/json");
        console.log(body);
        request.send(body);
    */

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          try {
            var response = JSON.parse(request.responseText);
            content = response.basket;
            if (typeof callback === 'function') {
              //передаем массив и контекст в функцию
              callback(content, that);
            }
            //parse possible errors in data
            if (!response.basket) {
              throw new SyntaxError('Incorrect data!');
            }
          } catch (err) {
            console.log('There is an error in request: ' + err.name + err.message + '\nTrying to request one more time!');
          }
        } else {
          console.log(this.status)
        }
      }
    };
  };

  this.getContent = function () {
    return content;
  };

  this.getTotalSum = function () {
    if (content && content.length) {
      return content.reduce(function (prevSum, curNum) {
        return prevSum + curNum.price;
      }, 0)
    } else {
      return 0;
    }
  }
}

Cart.prototype = Object.create(Container.prototype);

Cart.prototype.render = function () {
  if (this.getContent()) {
    var div = document.createElement('div');
    div.innerHTML = content[0].id_product + content[1].id_product + this.getTotalSum();
    div.id = this.id;
    div.classList.add(this.className);
    this.element = div;
    return div;
  } else {
    this.init(function (content, that) {
      var div = document.createElement('div');
      div.innerText = content[0].id_product + content[1].id_product + that.getTotalSum();
      div.id = that.id;
      div.classList.add(that.className);
      that.element = div;
      return div;
    })
  }
};

Cart.endpoint = 'http://localhost:3000';
