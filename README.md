# Funda serverside

Funda serverside is an serverside application that runs on Node.js + Express.

-  Server: `express`
-  Average grade B on [gtetrix.com](https://gtmetrix.com/)
-  85/100 on [Google insights](https://developers.google.com/speed/pagespeed/insights)

![Funda](https://raw.githubusercontent.com/eltongonc/funda_serverside/master/screenshots/funda.png)


## What does it do
This project allows users to search houses in the Netherlands.

## How to install
First clone this repo with:
```txt
$ git clone https://github.com/eltongonc/funda_serverside.git
```


An API-key is required to run this project. Contact [Funda](funda.nl) for a key. When you have a key place it the `.env` file in this format:
```txt
KEY=1234567890qwertyuiopasdfghjklzxcvbnm1234567890qwer
```
the `.env` file should be placed in the root folder:
```
funda_serverside/
├── public/
├── routes/
├── views/
├── .env
├── package.json
├── app.js
└── README.md

```

then run
```
$ npm start
```
 this should minify and uglify the javascript and css.
 To run these tasks manually use:
 ```text
$ npm run uglify:js
$ npm run uglify:css
 ```

## Performance
All the tests were done on a slow internet connection Regular 2g (300ms, 250kb/s download, 50kb/s upload), with disabled cache. These slow internet speed-tests emulate how people with a slow connection experience a website.

The site took 11.52 seconds to completely load and 2.13s to load the DOM(Document Object Model HTML) contents.


As seen on the picture above, the images are the biggest in size and take the most time to load. The images come directly from the api, I haven't found a way to make them smaller.

- [x] Added critical css the load style async above the screen fold.
- [x] Wrapped images in a picture element. This renders an image depending on the width of the screen
- [x] Minified and compressed all CSS and JavaScript.

I receive these grades:
![Google - 85 /100](https://raw.githubusercontent.com/eltongonc/funda_serverside/master/screenshots/google.png)

![gtmetrix - 86% ](https://raw.githubusercontent.com/eltongonc/funda_serverside/master/screenshots/gtmetrix.png)

## Improving the app

Because this was a three week project there is still a lot that can to be implemented. Below is a list of features already in the app and a wishlist of features.

### Features

- Get a list of houses based on a search query.
- Navigate though pages
- Search houses via URL
- View and get information about a house.
- Autosuggest a place while filling the input field


### Wishlist
This project is still in development. I'm currently working on a wizzard on the wizzard branch
- Search wizzard
- Works offline
- Check if userquery already exist. No extra API calls if the search is already present.
- Pretty urls
- Lazy loading

## To-do
- [ ] Receive an 100/100 score on [Google insights](https://developers.google.com/speed/pagespeed/insights)
- [ ] Cache files to improve the speed
- [ ] Add a server worker for hybrid functionalities
- [ ] Skip to last page link for search result list
- [ ] User feedback


## How to contribute
You can help improve this project by sharing your expertise and tips. Contributions of all kinds are welcome: reporting issues, updating documentation, fixing bugs, building examples, sharing projects, and any other tips that may improve my code.


## Example
Because this project requires a key I shall not make it public, but feel free to contact Funda for a key (no guarantee).


### Built With
- Node.js with an Express.js framework - Server.
- Handlebars - Serverside templating.
- JavaScript (mixed ES5 and ES6) - Client.
- CSS for the styling.

<!-- ### Log
Week1 - JavaScript objects & patterns
Week2 - Data, routing & templating
Week3 - User feedback -->

### Author

Elton Gonçalves Gomes - checkout more of my work on [github](https://github.com/eltongonc)

<!-- ## Licensing -->
