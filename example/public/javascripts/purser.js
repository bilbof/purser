(function (window) {
  "use strict";
  var params = ['utm_source', 'utm_medium', 'utm_name', 'utm_term', 'utm_campaign', 'utm_content'];
  var purser = window.purser || window.purser || {
    fetch: function(){
      return JSON.parse(window.localStorage.getItem("purser_visitor"))
    },
    destroy: function(){
      return window.localStorage.removeItem("purser_visitor");
    },
    convert: function(obj){
      var attributes = this.update(obj);
      attributes['converted_at'] = new Date().toISOString();
      attributes['conversion_page'] = window.location.origin + window.location.pathname;
      window.localStorage.setItem('purser_visitor', JSON.stringify(attributes));
      return attributes;
    },
    update: function(obj){
      var attributes = this.fetch()
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          attributes[key] = obj[key];
        }
      }
      window.localStorage.setItem('purser_visitor', JSON.stringify(attributes));
      return attributes;
    },
    create: function(){
      var attributes = {
        first_website_visit: new Date().toISOString(),
        referrer: document.referrer.length ? document.referrer : "direct",
        browser_timezone: new Date().getTimezoneOffset(),
        browser_language: window.navigator.language,
        landing_page: window.location.origin + window.location.pathname,
        screen_height: window.screen.height,
        screen_width: window.screen.width
      }
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        param = param.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + param + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(window.location.href);
        if (results && results[2]) attributes[param] = decodeURIComponent(results[2].replace(/\+/g, " "));
      }
      window.localStorage.setItem('purser_visitor', JSON.stringify(attributes));
      return attributes;
    }
  };
  if (!purser.fetch()) purser.create()
  window.purser = purser;
}(window));
