# Purser

A lightweight JavaScript library for preserving user data from first website visit to signup.

## Usage

The library stores data such as `utm_medium`, `landing_page` and `referrer` in a localStorage object, and makes the object available via a handy API with the following methods:

```
Purser.create() // automatically called on first website visit
Purser.fetch() // returns the object
Purser.convert(obj) // returns the object updated with conversion data
Purser.update(obj) // lets you add additional parameters to the object
Purser.destroy // removes the object from localStorage
```

View a live example at [http://purser.herokuapp.com/](http://purser.herokuapp.com/?utm_medium=github&utm_source=github_repo_example).

## Installation

```
git clone https://github.com/bilbof/purser
```

1. Add [purser.js](https://github.com/bilbof/purser/blob/master/purser.js) to every page on your website. When a visitor creates an account, call purser.convert(obj) and add the user to your CRM/ChartMogul with attributes returned.
2. When a visitor creates an account, call purser.convert(obj) to get the visitor's marketing attributes
3. Add the user's marketing attributes to them in your CRM or app

## Example

See an example at [http://github.com/bilbof/purser/example](https://github.com/bilbof/purser/tree/master/example).

Code example

```html
<script src="purser.js"></script>
<script>
  $('.red-signup-button').click(function(){

      var attributes = purser.convert({
        signup_button: "red-signup-button"
      });

      // here send the customer object to your CRM/app with their attributes
  });
</script>
```

The `attributes` object in the example above would look something like this:

```js
{
	"first_website_visit": "2017-02-19T17:52:18.088Z",
	"referrer": "www.google.co.uk",
	"browser_timezone": 0,
	"browser_language": "en-GB",
	"landing_page": "http://localhost:5000/product",
	"screen_height": 800,
	"screen_width": 1280,
	"utm_medium": "google_search_ads",
	"utm_source": "google",
	"signup_button": "red-signup-button",
	"converted_at": "2017-02-19T17:52:41.981Z",
	"conversion_page": "http://localhost:5000/signup"
}
```
