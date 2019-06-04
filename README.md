[![travis](https://img.shields.io/travis/locize/tmexchange.svg)](https://travis-ci.org/locize/tmexchange) [![npm](https://img.shields.io/npm/v/tmexchange.svg)](https://npmjs.org/package/tmexchange)

## Download

The source is available for download from
[GitHub](https://github.com/locize/tmexchange/archive/master.zip).
Alternatively, you can install using npm:

```sh
npm install --save tmexchange
```

You can then `require()` tmexchange as normal:

```js
const tmx = require('tmexchange');
```

Or you can direclty `require()` its functions:

```js
const js2tmx = require('tmexchange/js2tmx');
```

## Usage

##### TMX

```js

const tmx = `<tmx version="1.4b">
 <header creationtool="XYZTool" creationtoolversion="1.01-023"
  datatype="PlainText" segtype="sentence"
  adminlang="en-US" srclang="en-US"
  o-tmf="ABCTransMem">
 </header>
 <body>
  <tu tuid="key1">
   <prop type="group">namespace1</prop>
   <tuv xml:lang="en-US">
    <seg>Hello</seg>
   </tuv>
   <tuv xml:lang="de-CH">
    <seg>Hallo</seg>
   </tuv>
  </tu>
  <tu tuid="key2">
   <prop type="group">namespace1</prop>
   <tuv xml:lang="en-US">
    <seg>An application to manipulate and process TMX documents</seg>
   </tuv>
   <tuv xml:lang="de-CH">
    <seg>Eine Applikation um TMX Dokumente zu manipulieren und verarbeiten</seg>
   </tuv>
  </tu>
  <tu tuid="key.nested">
   <prop type="group">namespace1</prop>
   <tuv xml:lang="en-US">
    <seg>TMX Data Manager</seg>
   </tuv>
   <tuv xml:lang="de-CH">
    <seg>TMX Daten Manager</seg>
   </tuv>
  </tu>
 </body>
</tmx>`;

const js = {
  "resources": {
    "namespace1": {
      "key1": {
        "en-US": "Hello",
        "de-CH": "Hallo"
      },
      "key2": {
        "en-US": "An application to manipulate and process TMX documents",
        "de-CH": "Eine Applikation um TMX Dokumente zu manipulieren und verarbeiten"
      },
      "key.nested": {
        "en-US": "TMX Data Manager",
        "de-CH": "TMX Daten Manager"
      }
    }
  },
  "sourceLanguage": "en-US",
  "administrationLanguage": "en-US", // optional, default is sourceLanguage
  "creationTool": "tmexchange", // optional default is tmexchange
  "creationToolVersion": "1.0.0", // optional default is package.json version
  "version": "1.4b", // optional, default 1.4b
  "oTMF": "ABCTransMem", // optional, default ABCTransMem
  "tuid": true, // optional, default true
  "datatype": "PlainText" // optional, default PlainText
};

const js2tmx = require('tmexchange/js2tmx');
js2tmx(js, (err, res) => {
  // res is like tmx
});

const tmx2js = require('tmexchange/tmx2js');
tmx2js(tmx, (err, res) => {
  // res is like js
});
```
