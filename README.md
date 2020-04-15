[![travis](https://img.shields.io/travis/locize/tmexchange.svg)](https://travis-ci.org/locize/tmexchange) [![npm](https://img.shields.io/npm/v/tmexchange.svg)](https://npmjs.org/package/tmexchange)

## Download

The source is available for download from
[GitHub](https://github.com/locize/tmexchange/archive/master.zip).
Alternatively, you can install using npm:

```sh
npm install --save tmexchange
```

You can then `import` or `require()` tmexchange as normal:

```js
import tmx from 'tmexchange'
// or
const tmx = require('tmexchange')

tmx.tmx2js(xml, (err, res) => {})
```

Or you can direclty `import` or `require()` its functions:

```js
import js2tmx from 'tmexchange/js2tmx'
// or
const js2tmx = require('tmexchange/cjs/js2tmx')
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
</tmx>`

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
}

import js2tmx from 'tmexchange/js2tmx'
js2tmx(js, (err, res) => {
  // res is like tmx
});

import tmx2js from 'tmexchange/tmx2js'
tmx2js(tmx, (err, res) => {
  // res is like js
});
```

Omitting the callback returns a promise

```js
const resJs = await tmx2js(xml)
const resXml = await js2tmx(js)
// or
tmx2js(xml).then((res) => {})
js2tmx(js).then((res) => {})
```