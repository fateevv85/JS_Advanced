//creating record in localstorage because server often is in 503 error;
if (!('pokemons' in localStorage)) {

    var request = new XMLHttpRequest();

    request.open('GET', 'https://pokeapi.co/api/v2/pokemon/?limit=151', true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState !== 4) {
            console.log(request.responseText);
        } else {
            if (request.status !== 200) {
                console.log(request.status + ': ' + request.statusText);
            } else {
                //add data to local storage
                localStorage.setItem('pokemons', request.responseText);
                console.log('Data received');
            }
        }
    };

    request.timeout = 10000;

    request.ontimeout = function () {
        console.log('Request exceed max time! (10s)');
    };
}

function Table(id, className, data) {
    this.id = id;
    this.className = className;
    this.data = data;
}

var pokemonsNames = [];

//creating array with only pokemons names
JSON.parse(localStorage.getItem('pokemons'), function (key, value) {
    if (key == 'name') {
        return pokemonsNames.push(value);
    }
});

//creating table with "render" method
Table.prototype.render = function () {
    var table = document.createElement('table');
    table.id = this.id;
    table.classList.add(this.className);
    //adding rows
    for (i = 0; i < pokemonsNames.length; i++) {
        var row = document.createElement('tr');
        //adding cells
        for (j = 0; j < 3; j++) {
            var cell = document.createElement('td');
            if (j == 0) {
                cell.innerText = i + 1;
            } else if (j == 1) {
                //inserting names into cell
                cell.innerText = pokemonsNames[i];
            } else {
                var img = document.createElement('img');
                img.src = 'img/sprites/' + (i + 1) + '.png';
                cell.appendChild(img);
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    document.body.insertBefore(table, document.querySelector('script'));
};
 