Meteor.methods({
  getDirection: function(from, to) {
    check(userId, String);
    this.unblock();
    try {
      var result = HTTP.call("GET", "https://maps.googleapis.com/maps/api/directions/json?origin=48+Pirrama+Rd,+Pyrmont,+NSW,+Australia&destination=122+Flinders+St,+Darlinghurst,+NSW,+Australia&sensor=false&key=AIzaSyDvXUfaNi0PjWstw868TSYWbSGFDb9FOns", {
        params: {
          user: userId
        }
      });
      return result;
    } catch (e) {
      // Got a network error, time-out or HTTP error in the 400 or 500 range.
      return false;
    }
  },
  getVenues: function(location, categoryId) {
    check(location, Object);
    check(categoryId, String);
    this.unblock();
    try {
      var result = HTTP.call("GET", "https://api.foursquare.com/v2/venues/search?client_id=" + Meteor.settings.keys.foursquare_client_id + "&client_secret=" + Meteor.settings.keys.foursquare_client_secret + "&limit=20&radius=400&v=20130815&categoryId=" + categoryId + "&ll=" + location.lat + "," + location.lon);
      return result;
    } catch (err) {
      return false;
    }
  },
  randomIntFromInterval: function(min, max) {
    return Math.random() * (max - min) + min;
  }
});