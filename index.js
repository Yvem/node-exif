
/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var command = require('shelly');

/**
 * Fetch EXIF data from `file` and invoke `fn(err, data)`.
 *
 * @param {String} file
 * @param {Object} execOpts [optional] options to pass to exec() for a finer control
 * @param {Function} fn
 * @api public
 */

module.exports = function(file, execOpts, commandOpts, fn){
  // rationalize options
  if(typeof execOpts === 'function') {
    fn = execOpts;
    execOpts = {};
    commandOpts = '';
  }

  if(typeof commandOpts === 'function') {
    fn = commandOpts;
    commandOpts = '';
  }

  // REM : exiftool options http://www.sno.phy.queensu.ca/~phil/exiftool/exiftool_pod.html
  // -json : ask JSON output
  var cmd = command('exiftool -json '+commandOpts+' ? ', file);
  
  exec(cmd, execOpts, function(err, str)
  {
    if(err) {
      if(err.message === 'stdout maxBuffer exceeded.')
        err = new Error('Metadata too big !'); // convert to a clearer message
      return fn(err);
    }

    var obj = JSON.parse(str)[0]; // so easy

    fn(null, obj);
  });
};
