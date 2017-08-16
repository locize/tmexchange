const xml2js = require('xml2js');
const parser = new xml2js.Parser();

function parse(tu, obj) {
  const key = tu.$.tuid;

  obj[key] = obj[key] || {};

  tu.tuv.forEach((entry) => {
    const lng = entry.$['xml:lang'];
    obj[key][lng] = entry.seg[0];
  });
}

function getGroupProp(props) {
  for (var i = 0, len = props.length; i < len; i++) {
    if (props[i].$ && props[i].$.type === 'group') return props[i]._;
  }
  return null;
}

function tmxToJs(str, cb) {
  if (typeof str !== 'string') {
    return cb(new Error('The first parameter was not a string'));
  }

  const result = {
    resources: {}
  };

  parser.parseString(str, (err, data) => {
    if (err) return cb(err);

    const datatype = data.tmx.header[0].$.datatype;
    const segtype = data.tmx.header[0].$.segtype;
    const oTMF = data.tmx.header[0].$['o-tmf'];

    if (datatype !== 'PlainText') err = new Error('datatype must be PlainText');
    if (segtype !== 'sentence') err = new Error('segtype must be sentence');
    if (oTMF !== 'ABCTransMem') err = new Error('o-tmf must be ABCTransMem');
    if (err) return cb(err);

    const version = data.tmx.$.version;
    const srclang = data.tmx.header[0].$.srclang;
    const creationtool = data.tmx.header[0].$.creationtool;
    const creationtoolversion = data.tmx.header[0].$.creationtoolversion;
    const adminlang = data.tmx.header[0].$.adminlang;

    result.version = version;
    result.sourceLanguage = srclang;
    result.creationTool = creationtool;
    result.creationToolVersion = creationtoolversion;
    result.administrationLanguage = adminlang;

    data.tmx.body[0].tu.forEach((tu) => {
      if (tu.prop && tu.prop.length > 0 && getGroupProp(tu.prop)) {
        // with namespace
        const namespace = getGroupProp(tu.prop);
        result.resources[namespace] = result.resources[namespace] || {};

        return parse(tu, result.resources[namespace]);
      }

      parse(tu, result.resources);
    });

    cb(null, result);
  });
}

module.exports = tmxToJs;
