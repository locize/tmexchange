import packageJSON from '../package.json'
import xml2js from 'xml2js'

const js2tmxClb = (obj, opt, cb) => {
  if (!cb && typeof opt === 'function') {
    cb = opt
    opt = { pretty: true, indent: '  ', newline: '\n' }
  }
  opt = opt || { pretty: true, indent: '  ', newline: '\n' }

  if (!obj.sourceLanguage) {
    const err = new Error('Please define sourceLanguage!')
    if (cb) return cb(err)
    throw err
  }

  const builder = new xml2js.Builder({
    rootName: 'tmx',
    headless: opt.headless !== undefined ? opt.headless : true,
    renderOpts: {
      pretty: opt.pretty !== false,
      indent: opt.indent || '  ',
      newline: opt.newline || '\n'
    }
  })

  obj.tuid = obj.tuid !== undefined ? obj.tuid : true

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
  }

  Object.keys(obj.resources).forEach((nsName) => {
    const possibleNoNsTu = {
      $: {},
      tuv: []
    }
    if (obj.tuid) possibleNoNsTu.$.tuid = nsName
    Object.keys(obj.resources[nsName]).forEach((k, i) => {
      if (typeof obj.resources[nsName][k] === 'string') {
        // no namespace
        if (i === 0) xmlJs.body.tu.push(possibleNoNsTu)
        const noNsTuv = {
          $: {
            'xml:lang': k
          },
          seg: obj.resources[nsName][k].replace(/\f/g, '')
        }
        possibleNoNsTu.tuv.push(noNsTuv)
        return
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
      }
      if (obj.tuid) tu.$.tuid = k
      xmlJs.body.tu.push(tu)
      Object.keys(obj.resources[nsName][k]).forEach((l) => {
        const tuv = {
          $: {
            'xml:lang': l
          },
          seg: obj.resources[nsName][k][l].replace(/\f/g, '')
        }
        tu.tuv.push(tuv)
      })
    })
  })

  const xml = builder.buildObject(xmlJs)
  if (cb) cb(null, xml)
  return xml
}

export default function js2tmx (obj, opt, cb) {
  if (!cb && opt === undefined) {
    return new Promise((resolve, reject) => js2tmxClb(obj, opt, (err, ret) => err ? reject(err) : resolve(ret)))
  }
  if (!cb && typeof opt !== 'function') {
    return new Promise((resolve, reject) => js2tmxClb(obj, opt, (err, ret) => err ? reject(err) : resolve(ret)))
  }
  js2tmxClb(obj, opt, cb)
}
