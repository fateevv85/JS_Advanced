//TASK #1 Придумать шаблон, который меняет одинарные кавычки на двойные.
var textarea = document.querySelector('textarea');
var text = "'Lore'm ipsu'm 'dolor' sit amet, consectetur adipisicing elit. Accusamu's, at atque aut 'autem', consectetur doloribu's 'dolorum' ea et iste 'iure' labore molliti'a nostrum provident qua'e quam ratione sed 'suscipit' voluptate's.'";

textarea.value = text;

document.querySelector('#doIt').addEventListener('click', function () {
    var newStr = textarea.value;
    textarea.value = newStr.replace(/\b'\B|\B'\b|'$/g, '"');
});

document.querySelector('#refresh').addEventListener('click', function () {
    textarea.value = text;
});

//TASK #2 Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
// При нажатии на кнопку «Отправить» произвести валидацию полей.
document.querySelector('input[type="submit"]').addEventListener('click', function () {
    var name = document.querySelector('#name');
    var tel = document.querySelector('#tel');
    var mail = document.querySelector('#mail');
    // var nameRE = /^[A-Za-zА-Яа-яЁё]{2,}$/i;
    var nameRE = /^[a-zа-яё]{2,}$/i;
    var telRE = /\+\d{1,4}\(?\d{3}\)?\d{3}-?\d{4}\b/;
    var emailRE = /(^\w+(|(\.|\-)\w+))(?=@[a-z]{2,}\.[a-z]{2,4}\b)/i;
    //e-mail validation with comments
    //     var emailRE = /(^\w+(|(\.|\-)\w+))(?=@mail\.ru\b)/gi;
    /*                1  2     3           4
    1. ищет буквы или цифры в начале строки в количестве от 1 и более;
    2. далее может идти:
    3. Или точка или дефис, после которых идет \w от 1 и более;
    4. И все это только если далее идет @mail.ru, и mail.ru является границей слова.
    */

    //if validation is false, red border appears around input (with class 'false')
    //and message too
    function classListToggle(re, data) {
        var test = re.test(data.value);
        if (test) {
            data.classList.remove('false');
            data.nextElementSibling.classList.add('hidden');
        } else {
            data.classList.add('false');
            data.nextElementSibling.classList.remove('hidden');
        }
    }

    classListToggle(nameRE, name);
    classListToggle(telRE, tel);
    classListToggle(emailRE, mail);

    //button 'reset' clears all classes 'false'
    document.querySelector('input[type="reset"]').addEventListener('click', function () {
        name.classList.remove('false');
        tel.classList.remove('false');
        mail.classList.remove('false');
    });
});

/*Comment for (old) task 1
textarea.value = newStr.replace(/('(?=\w{2,}))|('\B)|(^')|('$)/g, '"');
                                         1        2     3    4
I. Ищем сразу только нужные:
1.    (?=p)
Позитивное впередсмотрящее - требует, чтобы последующие символы соответствовали шаблону p, но не включает эти символы в найденную строку.
'(?=\w{2,})
Выделяем кавычку, после которой идет более одной буквы.
2.    \B
Крайняя правая граница слова
('\B)
Выделяем последнюю кавычку слова
3.    ^'
Якорь начала строки, выделяем кавычку начала строки
4.    '$
Якорь конца строки, выделяем кавычку конца строки
*/
