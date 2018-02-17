var textarea = document.querySelector('#text');

textarea.value = "'Lore'm ipsu'm 'dolor' sit amet, consectetur adipisicing elit. Accusamu's, at atque aut 'autem', consectetur doloribu's 'dolorum' ea et iste 'iure' labore molliti'a nostrum provident qua'e quam ratione sed 'suscipit' voluptate's.'";

function doIt() {
    var Newstr = textarea.value;

    textarea.value = Newstr.replace(/('(?=\w{2,}))|('\B)|(^')|('$)/g, '"');

    //('(?=\w{2,}))|('(?=\s))|(^')|('$)

    //1.    (?=p)
    //Позитивное впередсмотрящее - требует, чтобы последующие символы соответствовали шаблону p, но не включает эти символы в найденную строку.
    //'(?=\w{2,})
    //Выделяем кавычку, после которой идет более одной буквы.

    //2.    \B
    //Крайняя правая граница слова
    //('\B)
    //Выделяем последнюю кавычку

    //3.    ^'
    //Якорь начала строки, выделяем кавычку начала строки

    //4.    '$
    //Якорь конца строки, выделяем кавычку конца строки
}

function refresh() {
    window.location.reload(false);
}