var links = document.querySelectorAll('header li');

links.forEach(function(item){
    console.log(item.firstChild.href);
    console.log(location.href);
    if(item.firstChild.href === location.href){
        item.firstChild.classList.add("active");
    }else{
        item.firstChild.classList.remove("active");
    }
});
