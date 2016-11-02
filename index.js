
/**
 * Module dependencies.
 */

const spawn = require('child_process').spawn;
var shelly = require('shelly');

/**
 * Fetch EXIF data from `file` and invoke `fn(err, data)`.
 *
 * @param {String} file
 * @param {Array} args [optional] List of string arguments to pass to exiftool
 * @param {Function} fn
 * @api public
 */

/**
 * Fetch EXIF data from `file` and invoke `fn(err, data)`. It spawns a child
 * process (see child_process.spawn) and executes exiftool
 * http://www.sno.phy.queensu.ca/%7Ephil/exiftool/
 *
 * @param {String} file
 * @param {Array} args [optional] List of string arguments to pass to
 * exiftool http://www.sno.phy.queensu.ca/~phil/exiftool/exiftool_pod.html
 * @param {Object} opts [optional] Object that is passed to the
 * child_process.spawn method as the `options` argument
 * See options of child_process.spawn:
 * https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
 * @param {function} fn callback function to invoke `fn(err, data)`
 */
module.exports = function(file, args, opts, fn){
  // rationalize options
  if (typeof args === 'function') {
    fn = args;
    args = [];
    opts = {};
  } else if (typeof opts === 'function') {
    fn = opts;
    opts = {};
  }
  args = args || [];

  file = shelly(file);
  // REM : exiftool options http://www.sno.phy.queensu.ca/~phil/exiftool/exiftool_pod.html
  // -json : ask JSON output
  var cmdArgs = ['-json', file].concat(args);
  var stdout = '';
  var exif = spawn('exiftool', cmdArgs , opts);

  exif.stdout.on('data',  function (data) {
    stdout += String(data);
  });

  exif.on('error', function (error) {
    return fn(error);
  });

  exif.on('close', function (code)  {
    if (code === 0) {
      var obj = JSON.parse(stdout); // so easy
      return fn(null, obj.length > 1 ? obj : obj[0]); // array if multiple files
    }
    else {
      // http://www.tldp.org/LDP/abs/html/exitcodes.html#EXITCODESREF
      return fn('Command closed unexpectedly, Exit Status Code: ' + code);
    }
  });
};
