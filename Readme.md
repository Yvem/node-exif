# exif

Image meta-information (EXIF, IPTC, XMP...) extraction using [exiftool](http://www.sno.phy.queensu.ca/~phil/exiftool/)

__NOTE__: This fork from https://github.com/Yvem/node-exif has a DIFFERENT
(improved !) API.

 Mayor Changes:
 Instead of calling 'exiftool' through 'child_process.exec', it calls:
 [child_process.spawn](https://nodejs.org/api/child_process
   .html#child_process_child_process_spawn_command_args_options) which avoids buffer limitations.
 It also allows to send specific arguments to the 'exiftool' shell command
 and to read EXIF info from multiple files at once.

## Installation

    $ npm install jmunox/node-exif

## Usage

 * Fetch EXIF data from `file` and invoke `fn(err, data)`.
 It spawns a child process (see child_process.spawn) and executes [exiftool]
 (http://www.sno.phy.queensu.ca/%7Ephil/exiftool/)

 Params:

   @param {String} file or path to folder

   @param {Array} args [optional] List of string arguments to pass to
   [exiftool](http://www.sno.phy.queensu.ca/~phil/exiftool/exiftool_pod.html)

   @param {Object} opts [optional] Object that is passed to the
   child_process.spawn method as the `options` argument. See options of
   [child_process.spawn](https://nodejs.org/api/child_process
  .html#child_process_child_process_spawn_command_args_options)

  @param {function} fn callback function to invoke `fn(err, data)`

```javascript
var exif = require('exif2');

exif(file, args, opts function(err, obj){
  console.log(obj);

  // see available tags http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/index.html
  console.log(obj['FileName']);
  console.log(obj['Caption-Abstract']); // IPTC Caption [2,120]
})
```

```json
{
	"SourceFile": "test/fixtures/forest.jpeg",
	"ExifToolVersion": 9.13,
	"FileName": "forest.jpeg",
	"Directory": "test/fixtures",
	"FileSize": "497 kB",
	"FileModifyDate": "2014:03:24 14:08:06+01:00",
	"FileAccessDate": "2014:03:24 15:27:05+01:00",
	"FileInodeChangeDate": "2014:03:24 15:26:50+01:00",
	"FilePermissions": "rw-r--r--",
	"FileType": "JPEG",
	"MIMEType": "image/jpeg",
	"CurrentIPTCDigest": "108d7872862d3e210ac6418bc7b5d6b2",
	"Caption-Abstract": "Voilà l'été !",
	"CopyrightNotice": "©photo : John Smith",
	"JFIFVersion": 1.01,
	"ExifByteOrder": "Big-endian (Motorola, MM)",
	"PhotometricInterpretation": "Color Filter Array",
	"Make": "NIKON CORPORATION",
	"Model": "NIKON D7000",
	"Orientation": "Horizontal (normal)",
	"XResolution": 72,
	"YResolution": 72,
	"ResolutionUnit": "inches",
	"Software": "Pixelmator 2.1.1",
	"ModifyDate": "2012:10:08 19:10:63",
	"ExposureTime": "1/80",
	"FNumber": 5.6,
	"ExposureProgram": "Aperture-priority AE",
	"ISO": 500,
	"DateTimeOriginal": "2012:10:07 11:36:30",
	"CreateDate": "2012:10:07 11:36:30",
	"ExposureCompensation": -2,
	"MaxApertureValue": 4,
	"MeteringMode": "Multi-segment",
	"LightSource": "Unknown",
	"Flash": "Off, Did not fire",
	"FocalLength": "10.0 mm",
	"UserComment": "",
	"SubSecTime": 50,
	"SubSecTimeOriginal": 50,
	"SubSecTimeDigitized": 50,
	"ColorSpace": "sRGB",
	"ExifImageWidth": 1971,
	"ExifImageHeight": 1306,
	"SensingMethod": "One-chip color area",
	"CustomRendered": "Normal",
	"ExposureMode": "Auto",
	"WhiteBalance": "Auto",
	"DigitalZoomRatio": 1,
	"FocalLengthIn35mmFormat": "15 mm",
	"SceneCaptureType": "Standard",
	"GainControl": "Low gain up",
	"Contrast": "Normal",
	"Saturation": "Normal",
	"Sharpness": "Normal",
	"SubjectDistanceRange": "Unknown",
	"ProfileCMMType": "Lino",
	"ProfileVersion": "2.1.0",
	"ProfileClass": "Display Device Profile",
	"ColorSpaceData": "RGB ",
	"ProfileConnectionSpace": "XYZ ",
	"ProfileDateTime": "1998:02:09 06:49:00",
	"ProfileFileSignature": "acsp",
	"PrimaryPlatform": "Microsoft Corporation",
	"CMMFlags": "Not Embedded, Independent",
	"DeviceManufacturer": "IEC ",
	"DeviceModel": "sRGB",
	"DeviceAttributes": "Reflective, Glossy, Positive, Color",
	"RenderingIntent": "Perceptual",
	"ConnectionSpaceIlluminant": "0.9642 1 0.82491",
	"ProfileCreator": "HP  ",
	"ProfileID": 0,
	"ProfileCopyright": "Copyright (c) 1998 Hewlett-Packard Company",
	"ProfileDescription": "sRGB IEC61966-2.1",
	"MediaWhitePoint": "0.95045 1 1.08905",
	"MediaBlackPoint": "0 0 0",
	"RedMatrixColumn": "0.43607 0.22249 0.01392",
	"GreenMatrixColumn": "0.38515 0.71687 0.09708",
	"BlueMatrixColumn": "0.14307 0.06061 0.7141",
	"DeviceMfgDesc": "IEC http://www.iec.ch",
	"DeviceModelDesc": "IEC 61966-2.1 Default RGB colour space - sRGB",
	"ViewingCondDesc": "Reference Viewing Condition in IEC61966-2.1",
	"ViewingCondIlluminant": "19.6445 20.3718 16.8089",
	"ViewingCondSurround": "3.92889 4.07439 3.36179",
	"ViewingCondIlluminantType": "D50",
	"Luminance": "76.03647 80 87.12462",
	"MeasurementObserver": "CIE 1931",
	"MeasurementBacking": "0 0 0",
	"MeasurementGeometry": "Unknown (0)",
	"MeasurementFlare": "0.999%",
	"MeasurementIlluminant": "D65",
	"Technology": "Cathode Ray Tube Display",
	"RedTRC": "(Binary data 2060 bytes)",
	"GreenTRC": "(Binary data 2060 bytes)",
	"BlueTRC": "(Binary data 2060 bytes)",
	"XMPToolkit": "XMP Core 4.4.0",
	"Subject": "",
	"SerialNumber": 5044750,
	"Lens": "Sigma 10-20mm F4-5.6 EX DC HSM",
	"ImageNumber": 6069,
	"FlashCompensation": 0,
	"ImageWidth": 900,
	"ImageHeight": 596,
	"EncodingProcess": "Baseline DCT, Huffman coding",
	"BitsPerSample": 8,
	"ColorComponents": 3,
	"YCbCrSubSampling": "YCbCr4:4:4 (1 1)",
	"Aperture": 5.6,
	"ImageSize": "900x596",
	"ScaleFactor35efl": 1.5,
	"ShutterSpeed": "1/80",
	"SubSecCreateDate": "2012:10:07 11:36:30.50",
	"SubSecDateTimeOriginal": "2012:10:07 11:36:30.50",
	"SubSecModifyDate": "2012:10:08 19:10:63.50",
	"CircleOfConfusion": "0.020 mm",
	"FOV": "100.4 deg",
	"FocalLength35efl": "10.0 mm (35 mm equivalent: 15.0 mm)",
	"HyperfocalDistance": "0.89 m",
	"LensID": "Unknown (809257734)",
	"LightValue": 9
}
```

## Advanced usage

### Parsing specific TagNames
It is possible to parse specific EXIF metadata from a file by defining the
TagNames in the Arguments:

```javascript
var exif = require('exif2');
var file = 'test/fixtures/forest.jpg';
var exifParams = ['-FileName', '-ImageHeight', '-ImageWidth', '-Orientation',
  '-DateTimeOriginal', '-CreateDate', '-ModifyDate', '-FileAccessDate',
  '-FileType', '-MIMEType'];

   exif(file, exifParams,  function(err, metadata){

     console.log(metadata.['ImageHeight']);
     console.log(metadata.['ImageWidth']);
   }

```

```json
{
	"SourceFile": "test/fixtures/forest.jpeg",
	"FileName": "forest.jpeg",
	"ImageWidth": 900,
    "ImageHeight": 596
    "Orientation": "Horizontal (normal)",
	"DateTimeOriginal": "2012:10:07 11:36:30",
    "CreateDate": "2012:10:07 11:36:30",
    "ModifyDate": "2012:10:08 19:10:63",
	"FileAccessDate": "2014:03:24 15:27:05+01:00",
	"FileType": "JPEG",
	"MIMEType": "image/jpeg"
}
```

### Parsing EXIF from several media files in path
It is also possible to parse EXIF metadata from all the media file by setting
 the path to a specific folder. The data is returned in an Array. This is
 more efficient, instead of calling `exif` for each file in the folder.

```javascript
var exif = require('exif2');
var path = 'test/fixtures/';
var exifParams = ['-FileName', '-ImageWidth', '-ImageHeight', '-Orientation',
  '-DateTimeOriginal', '-CreateDate', '-ModifyDate', '-FileAccessDate',
  '-FileType', '-MIMEType'];

exif(file, exifParams,  function(err, metadata){
  console.log(metadata[0].['ImageWidth']);  // 900
  console.log(metadata[0].['ImageHeight']); // 596
  console.log(metadata[1].['ImageWidth']);  // 3776
  console.log(metadata[1].['ImageHeight']); // 3129

}
```
Result:
```json
[{
	"SourceFile": "test/fixtures/forest.jpeg",
    "FileName": "forest.jpeg",
	"ImageWidth": 900,
	"ImageHeight": 596,
    "Orientation": "Horizontal (normal)",
	"DateTimeOriginal": "2012:10:07 11:36:30",
    "CreateDate": "2012:10:07 11:36:30",
    "ModifyDate": "2012:10:08 19:10:63",
	"FileAccessDate": "2014:03:24 15:27:05+01:00",
	"FileType": "JPEG",
	"MIMEType": "image/jpeg"
},
{
    "SourceFile": "test/fixtures/le_livre_de_photographies_vol_III_Phaidon.jpg",
    "FileName": "le_livre_de_photographies_vol_III_Phaidon.jpg",
    "ImageWidth": 3776,
    "ImageHeight": 3129,
    "Orientation": "Horizontal (normal)",
    "CreateDate": "2014:01:09 12:52:13+01:00",
    "ModifyDate": "2014:01:09 15:36:23",
    "FileAccessDate": "2016:10:31 16:24:05+01:00",
    "FileType": "JPEG",
    "MIMEType": "image/jpeg"
}]
```
### No more known buffer limitation

Since this version uses `child_process.spawn()` instead of
`child_process.exec()`, the output is handled in a different way, avoiding
buffer limitations.

See [child_process.spawn](https://nodejs.org/api/child_process
      .html#child_process_child_process_spawn_command_args_options)

### Special execution
For special cases, it is possible to provide options for the [spawn process]
(https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options).
`exif()` optional third parameter may be an `spawn()` option object as
described here:

```javascript
var opts = { cwd: undefined, env: process.env };
exif(file, args, opts, function(err, obj) {
  console.log(obj);
})

```

## Test / contribute

```bash
npm install
npm test
````

and also
```bash
make test
make bench
````

## License 

  MIT
