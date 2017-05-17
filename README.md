# Funda serverside

Funda serverside is an serverside application that runs on Node.js + Express. This project is build to illustrate a few performance patterns to optimize the speed of Funda. Funda serverside is based on the existing [Funda site](www.funda.nl).

## What does it do
Funda serverside allows users to search houses and get information about houses in the Netherlands are registered on Funda.  

## How to install
First clone this repo with:
```txt
$ git clone https://github.com/eltongonc/funda_serverside.git
```

An API-key is required to run this project. Contact Funda for a key. When you have a key place it the `.env` file in this format:
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


## Screenshots
**Full page**
![Funda](/screenshots/funda-screenshot.png)

**Auto suggest**
![Auto suggest](/screenshots/autosuggest.png)

## Performance
In order to compare the performance a few features were build. Here is a overview of those features.
### Funda serverside: before
This is an analysis of [Funda homepage](www.funda.nl) version in it's current state for common internet connection:

| Connection | DOM Content Loaded | Fully loaded  |
|------------|:------------------:|:-------------:|
| GPRS       | 2.1 minutes        | 2.6 minutes   |
| Good 2G    | 16.84 seconds      | 20.88 seconds |
| Good 3G    | 15.29 seconds      | 17.23 seconds |
| Regular 4G | 6.05 seconds       | 9.89  seconds |
| Wifi       | 6.48 seconds       | 8.88  seconds |


#### Overview [Webpagetest](https://www.webpagetest.org)
##### Content loaded
![Content](screenshots/before-content.png)

##### Page load
![Loadspeed](screenshots/before-load.png)

#### Overview [PageSpeed insights](https://developers.google.com/speed/pagespeed/insights/?hl=nl)

##### Score - desktop
![Google insight score desktop](screenshots/before-google-insight-desktop.png)
##### Score - mobile
![Google insight score mobile](screenshots/before-google-insight-mobile.png)


### Conclusion
After analyzing [Funda](www.funda.nl) I noticed that the fully loaded time could be better. Also the mobile version doesn't score high enough.

## To-do
- [x] Server Gzip
- [x] CSS Optimization
- [x] Image compression
- [x] Service worker
- [x] Javascript compression
- [ ] Screen-reader



### Optimizations
A series of tests were done with chromes internet connection throttling. These internet speed-tests emulate how people with a slow connection experience a website. The connections exist of GPRS, Good 2G, Good 3G, Regular 4G and Wifi with disabled cache.

#### Node.js + Express.js
This step was mainly rebuilding the homepage of Funda to illustrate how the webapp could be optimised with a Node.js server. Serving html files from the server can boost the overall speed, but because this is a rebuild it wouldn't be fair to compare it to the previous table.

##### Results

| connection | DOM Content Loaded | Fully loaded  |
|------------|:------------------:|:-------------:|
| GPRS       | 2.1 minutes        | 2.6 minutes   |
| Good 2G    | 16.84 seconds      | 20.88 seconds |
| Good 3G    | 15.29 seconds      | 17.23 seconds |
| Regular 4G | 6.05 seconds       | 9.89  seconds |
| Wifi       | 6.48 seconds       | 8.88  seconds |

#### GZIP
```js
// compression
app.use(compression({
  threshhold: 0,
  filter:  true
}));
```
##### Results
| connection | DOM Content Loaded | Fully loaded  |
|------------|:------------------:|:-------------:|
| GPRS       | 25.44 seconds      | 7.7 minutes   |
| Good 2G    | 3.43 seconds       | 51.80 seconds |
| Good 3G    | 1.78 seconds       | 15.39 seconds |
| Regular 4G | 2.08 seconds       | 7.09  seconds |
| Wifi       | 1.75 seconds       | 3.08  seconds |


#### CSS Optimization
To increase the overall speed I generated some critical-css. The criticalCSS is the style that the site needs above the page fold.
To view these changes change branch with `$ git checkout ft-css-optimization` and run `$ npm run criticalCSS` this will generate a bundled criticalCSS in the `public` folder

##### Penthouse module
The `criticalCSS-generator.js` file loops through all files in the `/public/css/` folder and checks for css that can be applied on the viewport with the `penthouse node module`.

##### criticalCSS-generator.js
```js
var penthouse = require("penthouse")
,   fs = require('fs');

penthouse(config, function(err, criticalCss) {
    if (err) throw err;
    fs.appendFileSync(path.resolve(dirname+"../criticalCSS/critical.css"), criticalCss);
});
```

##### CriticalCSS loader: loadCSS
To use the criticalCSS I used a module called loadCSS. This functions makes sure the CSS loads after the page is done rendering the HTML content.
```HTML
    <style>
        /*Inline criticalCSS style*/
    </style>

    <!-- Async CSS -->
    <script>
        loadCSS("/path/to/style.css")
    </script>

    <!-- Fallback if the browser does not support Javascript -->
    <noscript>
            <link rel="stylesheet" href="/css/style.css">
    </noscript>
```

##### Results

| connection | DOM Content Loaded | Fully loaded  |
|------------|:------------------:|:-------------:|
| GPRS       | 25.84 seconds     | 8.9 minutes   |
| Good 2G    | 3.58 seconds      | 1.0 minutes   |
| Good 3G    | 2.56 seconds      | 18.68 seconds |
| Regular 4G | 2.12 seconds      | 8.26  seconds |
| Wifi       | 2.17 seconds      | 4.0   seconds |


#### Images Optimization
As stated before the images are one of the reasons why the webapp is slow.
The images are replace with a compressed version. No difference is visible.
To view these changes change branch with `$ git checkout ft-img-optimization`.

### Image Optimization results

| connection | DOM Content Loaded | Fully loaded  |
|------------|:------------------:|:-------------:|
| GPRS       | 1.9 minutes        | 7.1 minutes   |
| Good 2G    | 13.19 seconds      | 47.77 seconds |
| Good 3G    | 4.52 seconds       | 14.44 seconds |
| Regular 4G | 2.16 seconds       | 5.87  seconds |
| Wifi       | 2.30 seconds       | 4.02  seconds |


## Javascript Optimization
Added a defer attribute on the script tags to load when the content is done loading  `$ git checkout ft-js-optimization`.

### Results

| connection | DOM Content Loaded | Fully loaded  |
|------------|:------------------:|:-------------:|
| GPRS       | 15.83 seconds      | 8.7 minutes   |
| Good 2G    | 1.84 seconds       | 59.62 seconds |
| Good 3G    | 1.75 seconds       | 17.64 seconds |
| Regular 4G | 1.31 seconds       | 6.88  seconds |
| Wifi       | 1.45 seconds       | 3.38  seconds |



## Funda serverside: After
Here are the results of the changes made to Funda serverside:

| connection | DOM Content Loaded | Fully loaded  |
|------------|:------------------:|:-------------:|
| GPRS       | 3.02 seconds       | 56.88 seconds |
| Good 2G    | 1.97 seconds       | 7.97 seconds  |
| Good 3G    | 1.60 seconds       | 4.26 seconds  |
| Regular 4G | 1.92 seconds       | 3.89 seconds  |
| Wifi       | 2.20 seconds       | 4.01 seconds  |

### Overview [Webpagetest](https://www.webpagetest.org)
**Score**

![Overview](screenshots/after-score.png)

**Content loaded**

![Content](screenshots/after-content.png)


**Page load**

![Loadspeed](screenshots/after-load.png)

### Overview [Webpagetest](https://www.webpagetest.org)
**Score**

![Google insight score desktop](screenshots/after-google-insight-desktop.png)
![Google insight score mobile](screenshots/after-google-insight-mobile.png)


### Conclusion
The site is much faster after applying the changes. Rendering the files on the server will give it a boost in performance. Loading the page async helps the DOM content te be loaded much faster.

## Improving the app
Because this was a three week project there is still a lot that can to be implemented. Below is a list of features already in the app and a wishlist of features.

### Features
- Get a list of houses based on a search query.
- View and get information about a house.
- Lazy loading


### Wishlist
- Search wizzard(in progress)
- Check if userquery already exist. No extra API calls if the search is already present.
- Pretty urls
- Lazy loading
- Use the server worker for hybrid functionalities


## How to contribute
You can help improve this project by sharing your expertise and tips, as well as learn from others. Contributions of all kinds are welcome: reporting issues, updating documentation, fixing bugs, building examples, sharing projects, and any other tips that may me improve my code.


## Example
Because this project requires a key I shall not make it live.


### Built With
- Node.js with an Express.js framework.
- Handlebars - Serverside templating.
- CSS for the styling.

<!-- ### Log
Week1 - JavaScript objects & patterns
Week2 - Data, routing & templating
Week3 - User feedback -->

### Author

Elton Gonçalves Gomes - checkout more of my work on [github](https://github.com/eltongonc)

<!-- ## Licensing -->
