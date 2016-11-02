
var exif = require('..');

var chai = require('chai');
var expect = chai.expect;
chai.config.includeStack = true; // defaults to false

describe('exif(file[, args, opts,] fn)', function(){

  it('respond with EXIF json data', function(done){
    exif('test/fixtures/forest.jpeg', function(err, data){
      if (err) return done(err);
      expect(data, 'FileName').to.have.property('FileName', 'forest.jpeg');
      expect(data, 'width').to.have.property('ImageWidth', 900);
      done();
    });
  });

  it('doesn\'t wreck utf-8 data', function(done){
    exif('test/fixtures/forest.jpeg', function(err, data){
      if (err) return done(err);
      expect(data, 'caption').to.have.property('Caption-Abstract', 'Voilà l\'été !');
      expect(data, 'copyright').to.have.property('CopyrightNotice', '©photo : John Smith');
      done();
    });
  });

  it('extracts specific EXIF data defined in arguments', function(done){
    exif('test/fixtures/forest.jpeg', ['-d', '\'%r %a, %B %e, %Y\'', '-DateTimeOriginal',
      '-S', '-s'], function(err, data) {
      if (err) return done(err);
      expect(data, 'DateTimeOriginal').to.have.property('DateTimeOriginal', '\'11:36:30 AM Sun, October  7, 2012\'');
      done();
    });
  });

  it('handles too big metadata without buffer errors', function(done){
    // real case taken from :
    // http://fr.phaidon.com/store/photography/le-livre-de-photographies-une-histoire-vol-3-9780714867755/
    exif('test/fixtures/le_livre_de_photographies_vol_III_Phaidon.jpg', function(err, data){
      if(err) return done(err);
      expect(data).to.have.property('YCbCrSubSampling', 'YCbCr4:4:4 (1 1)');
      done();
    });
  });

  it('handles all media files contained in the folder at once', function(done){
    exif('test/fixtures/', function(err, data) {
      if (err) return done(err);
      expect(data[0], 'FileName').to.have.property('FileName', 'forest.jpeg');
      expect(data[1], 'FileName').to.have.property('FileName', 'le_livre_de_photographies_vol_III_Phaidon.jpg');
      done();
    });
  });

  it('handles all media files contained in the path plus arguments', function(done){
    exif('test/fixtures/', ['-common'], function(err, data) {
      if (err) return done(err);
      expect(data[0], 'Model').to.have.property('Model', 'NIKON D7000');
      expect(data[1], 'ImageSize').to.have.property('ImageSize', '3129x3776');
      done();
    });
  });

  it('get specified info from all media files contained in the path', function(done){
    exif('test/fixtures/', ['-ExifImageWidth', '-Megapixels'], function(err, data) {
      if (err) return done(err);
      expect(data[0], 'ExifImageWidth').to.have.property('ExifImageWidth', 1971);
      expect(data[0], 'Megapixels').to.have.property('Megapixels', 0.536);
      expect(data[0], 'ExifImageHeight').to.not.have.property('ExifImageHeight');
      expect(data[1], 'ExifImageWidth').to.have.property('ExifImageWidth', 3129);
      expect(data[1], 'Megapixels').to.have.property('Megapixels', 11.8);
      expect(data[1], 'ExifImageHeight').to.not.have.property('ExifImageHeight');
      done();
    });
  });

  it('handles all media files in path plus arguments plus spawn options', function(done){
    exif('test/fixtures/', ['-common'], { cwd: undefined, env: process.env },
    function(err, data) {
      if (err) return done(err);
      expect(data[0], 'Model').to.have.property('Model', 'NIKON D7000');
      expect(data[1], 'ImageSize').to.have.property('ImageSize', '3129x3776');
      done();
    });
  });

});
