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

View a live example at [http://purser.herokuapp.com/](http://purser.herokuapp.com/).

## Installation

```
git clone https://github.com/bilbof/purser
```

1. Add [purser.js](https://github.com/bilbof/purser/blob/master/purser.js) to every page on your website. When a visitor creates an account, call purser.convert(obj) and add the user to your CRM/ChartMogul with attributes returned.
2. When a visitor creates an account, call purser.convert(obj) to get the visitor's marketing attributes
3. Add the user's marketing attributes to them in your CRM or app

## Example

See an example at [http://github.com/bilbof/purser/example](https://github.com/bilbof/purser/tree/master/example).
