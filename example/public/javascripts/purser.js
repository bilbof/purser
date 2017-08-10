(function (window) {
  "use strict";
  var params = ["utm_source", "utm_medium", "utm_name", "utm_term", "utm_campaign", "utm_content"];
  var purser = window.purser || window.Purser || {
    fetch: function(){
      return JSON.parse(window.localStorage.getItem("purser_visitor"));
    },
    destroy: function(){
      return window.localStorage.removeItem("purser_visitor");
    },
    convert: function(obj) {
      var attributes = this.update(obj);
      attributes.converted_at = new Date().toISOString();
      attributes.conversion_page = window.location.origin + window.location.pathname;
      attributes.visits_at_conversion = (attributes.visits || []).length;
      attributes.pageviews_before_conversion = attributes.pageviews || 0;
      window.localStorage.setItem("purser_visitor", JSON.stringify(attributes));
      return attributes;
    },
    update: function(obj) {
      var attributes = this.fetch();
      if (!attributes) { attributes = purser.create(); }
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          attributes[key] = obj[key];
        }
      }
      window.localStorage.setItem("purser_visitor", JSON.stringify(attributes));
      return attributes;
    },
    createInstance: function() {
      var attributes = {
        referrer: document.referrer.length ? document.referrer : "direct",
        browser_timezone: new Date().getTimezoneOffset()/60,
        browser_language: window.navigator.language,
        landing_page: window.location.origin + window.location.pathname,
        screen_height: window.screen.height,
        screen_width: window.screen.width,
      };
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        param = param.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + param + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(window.location.href);
        if (results && results[2]) attributes[param] = decodeURIComponent(results[2].replace(/\+/g, " "));
      }
      return attributes;
    },
    create: function() {
      var attributes = this.createInstance();
      attributes.last_visit = parseInt(new Date().getTime()/1000);
      attributes.pageviews = 1;
      attributes.first_website_visit = new Date().toISOString();
      window.localStorage.setItem("purser_visitor", JSON.stringify(attributes));
      return attributes;
    },
    visits: {
      recently: function() {
        var attributes = purser.fetch();
        if (!attributes.last_visit) return false;
        var timeDiffInHours = (parseInt(new Date().getTime()/1000) - attributes.last_visit)/3600;
        return timeDiffInHours < 0.5; // last visited less than half an hour ago.
      },
      create: function() {
        var attributes = purser.fetch();
        attributes.visits = attributes.visits || [];
        var visit = purser.createInstance();
        visit.id = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        visit.date = new Date().toISOString();
        attributes.visits.push(visit);
        attributes.last_visit = parseInt(new Date().getTime()/1000);
        purser.update(attributes);
        return attributes;
      },
      fetch: function(id) {
        var attributes = purser.fetch();
        var visit = attributes.visits.filter(function(visit) {
          return visit.id === id;
        })[0];
        visit.index = attributes.visits.map(function(visit) {
          return visit.id;
        }).indexOf(id);
        return visit;
      },
      update: function(id, obj) {
        var visit = purser.visits.fetch(id);
        var attributes = purser.fetch();

        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            visit[key] = obj[key];
          }
        }
        attributes.visits[visit.index] = visit;
        return purser.update(attributes);
      },
      delete: function(id) {
        var attributes = purser.fetch();
        var visit = purser.visits.fetch(id);
        attributes.visits = attributes.visits.splice(visit.index, 1);
        return purser.update(attributes);
      },
      all: function() {
        var attributes = purser.fetch();
        return attributes.visits || [];
      }
    },
    pageviews: {
      add: function() {
        var attributes = purser.fetch();
        attributes.pageviews = attributes.pageviews + 1 || 1;
        return purser.update(attributes);
      }
    }
  };
  if (!purser.fetch()) {
    purser.create();
  } else {
    if (!purser.visits.recently()) {
      purser.visits.create();
    }
    purser.pageviews.add();
  }
  window.purser = purser;
}(window));
