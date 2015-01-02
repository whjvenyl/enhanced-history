// Generated by CoffeeScript 1.7.1
(function() {
  var Groomer, calculateFileSize, getDomain, getFileName;

  Groomer = (function() {
    function Groomer() {}

    Groomer.prototype.run = function(results) {
      var result, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        result = results[_i];
        if (result.filename != null) {
          result.host = getDomain(result.url);
          result.title = getFileName(result.url);
          result.size = calculateFileSize(result.totalBytes);
          _results.push(this.removeScriptTags(result));
        } else {
          result.host = getDomain(result.url);
          if (result.title === '' || (result.title == null)) {
            result.title = '(No title)';
          }
          _results.push(this.removeScriptTags(result));
        }
      }
      return _results;
    };

    Groomer.prototype.removeScriptTags = function(result) {
      var property, regex, _i, _len, _ref;
      regex = /<(.|\n)*?>/ig;
      _ref = ['title', 'url'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        property = _ref[_i];
        result[property] = result[property].replace(regex, "");
      }
      return result;
    };

    return Groomer;

  })();

  getDomain = function(url) {
    var match;
    match = url.match(/\w+:\/\/(.*?)\//);
    if (match === null) {
      return null;
    } else {
      return match[0];
    }
  };

  getFileName = function(url) {
    var match;
    match = url.match(/[^//]*$/);
    if (match === null) {
      return null;
    } else {
      return match[0];
    }
  };

  calculateFileSize = function(bytes) {
    var result;
    result = Math.round(bytes / 1048576 * 100000) / 100000;
    return result.toFixed(2);
  };

  if (typeof onServer !== "undefined" && onServer !== null) {
    module.exports = Groomer;
  } else {
    self.addEventListener('message', function(e) {
      var groomer;
      groomer = new Groomer();
      return postMessage(groomer.run(e.data.results));
    });
  }

}).call(this);