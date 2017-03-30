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
