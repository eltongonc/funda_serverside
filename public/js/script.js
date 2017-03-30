var suggestList = document.querySelector('#autocomplete-list');

// Set link to active if its the current
var links = document.querySelectorAll('header li');
links.forEach(function(item){
    if(item.firstChild.href === location.href){
        item.firstChild.classList.add("active");
    }else{
        item.firstChild.classList.remove("active");
    }
});

var input = {
    element: document.querySelector('#autocomplete-input')
};
// Autosuggest
if (input.element) {
    input.element.setAttribute("autocomplete","off");
    input.element.addEventListener("keyup", function(e){
        JSONP("http://zb.funda.info/frontend/geo/suggest/?query="+e.target.value+"&max=7&type=koop", callback );
    });
}



// Apicall
// src: Merlijn Vos
function JSONP(url, callback) {
	var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);

	self[callbackName] = function (data) {
		delete self[callbackName];
		document.body.removeChild(script);
		callback(data);
	};
}

var index = 0;
window.addEventListener("scroll", function(){
    var start = "/api"+location.pathname;
    var pagenumber = start.match(/\/p[0-9]*\//) ? start.match(/\/p[0-9]*\//)[0].split("/p")[1].split("/")[0] : 1;
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      // you're at the bottom of the page
    //   console.log(start.match(/\/p[0-9]*\//)[0].split("/p")[1].split("/")[0]);
        index++;

      newPagenumber = Number(pagenumber) + index;
    //   console.log();

    //   console.log(start.replace(/\/p[0-9]*\//)[0].split("/p")[1].split("/")[0], pagenumber);

      apiCall(start.replace(pagenumber, String(newPagenumber)));
    }

});
function apiCall(url){
    // source: https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest && Joost
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function(){
        if (req.readyState === XMLHttpRequest.DONE && (req.status >= 200 && req.status < 400)){
            // turns de response in a object
            var response = req.responseText;
            // save the current data in the localStorage
            generateContent(JSON.parse(response));
        }
    };
    req.send();
}

function generateContent(jsonData){
    var container = document.querySelector('form.home+section');
    // console.log(container);
    console.log(jsonData);
    for (var i = 0; i < jsonData.Objects.length; i++) {
        container.innerHTML +=`
        <article>
            <img height="200" src="${jsonData.Objects[i].FotoMedium}" alt="${jsonData.Objects[i].Adres}" />
            <h1>
                <a id="${jsonData.Objects[i].Id}" href="/house/${jsonData.Objects[i].Id}">${jsonData.Objects[i].Adres}</a>
                <small>${jsonData.Objects[i].Postcode} ${jsonData.Objects[i].Woonplaats}</small>
            </h1>
            <p><strong>${jsonData.Objects[i].PrijsGeformatteerdHtml}</strong></p>

            <footer>
                <p>${jsonData.Objects[i].Woonoppervlakte}m<span class="sup">2</span> / ${jsonData.Objects[i].Perceeloppervlakte}m<span class="sup">2</span>
                <p class="kamers">${jsonData.Objects[i].AantalKamers} Kamers</span></p>
            </footer>
        </article>`;
    }
}

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
function updateInput(value){
    input.element.value = value;
    suggestList.classList.add("hidden");
    suggestList.innerHTML = "";
}
