var textarea = document.querySelector('textarea');

var text = "'Lore'm ipsu'm 'dolor' sit amet, consectetur adipisicing elit. Accusamu's, at atque aut 'autem', consectetur doloribu's 'dolorum' ea et iste 'iure' labore molliti'a nostrum provident qua'e quam ratione sed 'suscipit' voluptate's.'";

textarea.value = text;

function doIt() {
    var Newstr = textarea.value;

    textarea.value = Newstr.replace(/('(?=\w{2,}))|('\B)|(^')|('$)/g, '"');
    /*                                      1        2     3    4
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

    //one more solution
    //II. Сначала меняем все одиночные кавычки,
    //'/g, '"'
    //затем возвращаем на место одиночные, которые подчиняются правилу:
    //"(?=\w(?=\s|\.|\,|'))/g, "'"
    //после которой идет буква, после которой или пробел, или точка, или запятая
}

function refresh() {
    textarea.value = text;
}
