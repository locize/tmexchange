const packageJSON = require('./package.json');
const xml2js = require('xml2js');

function js2tmx(obj, opt, cb) {
  if (typeof opt === 'function') {
    cb = opt;
    opt = { pretty: true, indent: '  ', newline: '\n' };
  }

  if (!obj.sourceLanguage) {
    const err = new Error('Please define sourceLanguage!');
    if (cb) return cb(err);
    throw err;
  }

  const builder = new xml2js.Builder({
    rootName: 'tmx',
    headless: opt.headless !== undefined ? opt.headless : true,
    renderOpts: {
      pretty: opt.pretty === false ? false : true,
      indent: opt.indent || '  ',
      newline: opt.newline || '\n'
    }
  });

  obj.tuid = obj.tuid !== undefined ? obj.tuid : true;

  const xmlJs = {
    $: {
      version: obj.version || '1.4b'
    },
    header: {
      $: {
        creationtool: obj.creationTool || packageJSON.name,
        creationtoolversion: obj.creationToolVersion || packageJSON.version,
        adminlang: obj.administrationLanguage || obj.sourceLanguage,
        datatype: obj.datatype || 'PlainText',
        segtype: obj.segtype || 'sentence',
        'o-tmf': obj.oTMF || 'ABCTransMem',
        srclang: obj.sourceLanguage
      }
    },
    body: {
      tu: []
    }
  };

  Object.keys(obj.resources).forEach((nsName) => {
    const possibleNoNs_tu = {
      $: {},
      tuv: []
    };
    if (obj.tuid) possibleNoNs_tu.$.tuid = nsName;
    Object.keys(obj.resources[nsName]).forEach((k, i) => {
      if (typeof obj.resources[nsName][k] === 'string') {
        // no namespace
        if (i === 0) xmlJs.body.tu.push(possibleNoNs_tu);
        const noNs_tuv = {
          $: {
            'xml:lang': k
          },
          seg: obj.resources[nsName][k]
        };
        possibleNoNs_tu.tuv.push(noNs_tuv);
        return;
      }

      // with namespace
      const tu = {
        $: {},
        prop: {
          $: {
            type: 'group'
          },
          _: nsName
        },
        tuv: []
      };
      if (obj.tuid) tu.$.tuid = k;
      xmlJs.body.tu.push(tu);
      Object.keys(obj.resources[nsName][k]).forEach((l) => {
        const tuv = {
          $: {
            'xml:lang': l
          },
          seg: obj.resources[nsName][k][l]
        };
        tu.tuv.push(tuv);
      });
    });
  });

  const xml = builder.buildObject(xmlJs);
  if (cb) cb(null, xml);
  return xml;
}

module.exports = js2tmx;
