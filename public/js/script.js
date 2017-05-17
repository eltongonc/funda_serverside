var axios = require('axios');
var jsonp = require('fetch-jsonp');

var suggestList = document.querySelector('#autocomplete-list');

/*****************
** Active nav
*****************/
var links = document.querySelectorAll('header li');
links.forEach(function(item){
    if(item.firstChild.href === location.href){
        item.firstChild.classList.add("active");
    }else{
        item.firstChild.classList.remove("active");
    }
});


/****************
** Autosuggest
*****************/
var input = document.querySelector('#autocomplete-input');
if (input) {
    input.setAttribute("autocomplete","off");
    input.addEventListener("keyup", function(e){
        jsonp("http://zb.funda.info/frontend/geo/suggest/?query="+e.target.value+"&max=7&type=koop")
        .then(function(response) {
            return response.json()
        }).then(callback).catch(function(ex) {
            console.log('parsing failed', ex)
        })
    });
}

/********************
** Infinite scroll
********************/
var index = 0;
window.addEventListener("scroll", function(){
    // the baseURL
    var start = location.origin+"/api"+location.pathname;
    // gets the number from the url
    var pagenumber = start.match(/\/p[0-9]*\//) ?
        start.match(/\/p[0-9]*\//)[0].split("/p")[1].split("/")[0]
        :
        1;

    // when you're at the bottom of the page, do an API call
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // increment by one everytime you hit the bottom of the page
        index++;
        newPagenumber = Number(pagenumber) + index;
        apiCall(start.replace(pagenumber, String(newPagenumber)));
    }
});


/*******************
** Functions
*******************/
function apiCall(url){
    axios.get(url).then(function(response){
        generateContent(response.data);
    })
}
// Infinite scroll content generator
function generateContent(data){
    var container = document.querySelector('form.home+section');
    for (var i = 0; i < data.Objects.length; i++) {
        container.innerHTML +=`
        <article>
            <img height="200" src="${data.Objects[i].FotoMedium}" alt="${data.Objects[i].Adres}" />
            <h1>
                <a id="${data.Objects[i].Id}" href="/house/${data.Objects[i].Id}">${data.Objects[i].Adres}</a>
                <small>${data.Objects[i].Postcode} ${data.Objects[i].Woonplaats}</small>
            </h1>
            <p><strong>${data.Objects[i].PrijsGeformatteerdHtml}</strong></p>

            <footer>
                <p>${data.Objects[i].Woonoppervlakte}m<span class="sup">2</span> / ${data.Objects[i].Perceeloppervlakte}m<span class="sup">2</span>
                <p class="kamers">${data.Objects[i].AantalKamers} Kamers</span></p>
            </footer>
        </article>`;
    }
}

// creates the Autosuggest
function callback(data){
    suggestList.innerHTML = "";
    suggestList.classList.add("hidden");
    if (data.Results.length == 0 && data.Query !=="") {
        suggestList.innerHTML = "Ai! Deze locatie kunnen we helaas niet vinden.";
    }else {
        suggestList.classList.remove("hidden");
        for (var i = 0; i < data.Results.length; i++) {
            suggestList.innerHTML += "<li onClick='updateInput(\""+data.Results[i].Display.Naam+"\")'>"+data.Results[i].Display.Naam+"</li>";
        }
    }
}
// update and hides the Autosuggest
function updateInput(value){
    input.value = value;
    suggestList.classList.add("hidden");
    suggestList.innerHTML = "";
}
