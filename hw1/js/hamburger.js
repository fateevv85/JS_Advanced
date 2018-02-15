//for errors
var throws;
//array of toppings
var arrToping = [];

/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(size, stuffing) {
    if (size in Hamburger.SIZE && stuffing in Hamburger.STUFFING) {
        this.size = size;
        this.stuffing = stuffing;
    }
    else if (!(size in Hamburger.SIZE)) {
        throw new HamburgerException('We don\'t have size like that: ' + size);
    }
    else {
         return throws = new HamburgerException('We don\'t have stuffing like that: ' + stuffing);
    }
}

Hamburger.SIZE = {
    small: {
        cost: 50,
        cal: 20
    },
    large: {
        cost: 100,
        cal: 40
    }
};

Hamburger.STUFFING = {
    cheese: {
        cost: 10,
        cal: 20
    },
    salad: {
        cost: 20,
        cal: 5
    },
    potato: {
        cost: 15,
        cal: 10
    }
};

Hamburger.TOPPING = {
    mayo: {
        cost: 20,
        cal: 5
    },
    spice: {
        cost: 15,
        cal: 0
    }
};

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 *
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function (topping) {
    if (topping in Hamburger.TOPPING) {
        //check up if the stated topping exist
        //if there is no stated topping, adding it
        if (!this.toppingExists(topping)) {
            arrToping.push(topping);
            this.topping = arrToping;
            // console.log('Adding topping: ' + topping);
        }
        else {
            throws = new HamburgerException(topping + ' topping already exist!');
        }
    }
    else {
        throws = new HamburgerException('We don\'t have topping like that:' + topping);
    }
};

/**
 * check if topping already exist
 */
Hamburger.prototype.toppingExists = function (topping) {
    var isMutchedToppings = arrToping.some(function (value) {
        return value == topping;
    });
    return isMutchedToppings;
};

/**
 * Убрать добавку, при условии, что она ранее была
 * добавлена.
 *
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
    if (this.toppingExists(topping)) {
        for (i = 0; i < this.topping.length; i++) {
            if (this.topping[i] == topping) {
                // console.log('Deleting topping: ' + topping);
                this.topping.splice(i, 1);
            }
        }
    }
    else {
        throws = new HamburgerException('Can\'t remove non-existent topping: ' + topping);
    }
};

/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
    return console.log('Existing toppings: ' + arrToping.join(', ') + '.');
};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
    return console.log('Size of hamburger: ' + this.size);
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
    console.log('Stuffing of hamburger: ' + this.stuffing);
};

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {

    var price = 0;
    var costTop = 0;
    //finding cost of size and stuffing
    var costSize = Hamburger.SIZE[this.size].cost;
    var costStuf = Hamburger.STUFFING[this.stuffing].cost;

    //calculating topping price
    arrToping.forEach(sum);
    function sum(topping) {
        costTop += Hamburger.TOPPING[topping].cost;
        return costTop;
    }

    price = costSize + costStuf + costTop;
    console.log('Size price: ' + costSize + '\n' + 'Stuf price: ' + costStuf + '\n' + 'Top price: ' + costTop + '\n' + '----------------' + '\n' + 'Total price: ' + price);
};

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {

    var cal = 0;
    var calTop = 0;
    var calSize = Hamburger.SIZE[this.size].cal;
    var calStuf = Hamburger.STUFFING[this.stuffing].cal;

    arrToping.forEach(sum);
    function sum(topping) {
        calTop += Hamburger.TOPPING[topping].cal;
        return calTop;
    }

    cal = calSize + calStuf + calTop;
    console.log('Size cal: ' + calSize + '\n' + 'Stuf cal: ' + calStuf + '\n' + 'Top cal: ' + calTop + '\n' + '----------------' + '\n' + 'Total cal: ' + cal);
};

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
/*
function HamburgerException(message) {
    console.log(message);
}*/

function HamburgerException(message) {
    Error.call(this, message);
    this.name = 'BurgerError';
    this.message = message;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, HamburgerException);
    } else {
        this.stack = (new Error()).stack;
    }
}
