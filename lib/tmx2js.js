import xml2js from 'xml2js'
const parser = new xml2js.Parser()

function parse (tu, obj, srclang) {
  var hasTuid
  var key
  if (!tu.$ || !tu.$.tuid) {
    const foundEntry = tu.tuv.find((entry) => entry.$['xml:lang'] === srclang)
    if (!foundEntry || !foundEntry.seg[0]) return
    key = foundEntry.seg[0]
    hasTuid = false
  } else {
    key = tu.$.tuid
    hasTuid = true
  }

  obj[key] = obj[key] || {}

  tu.tuv.forEach((entry) => {
    const lng = entry.$['xml:lang']
    obj[key][lng] = entry.seg[0]
  })

  return hasTuid
}

function getGroupProp (props) {
  for (var i = 0, len = props.length; i < len; i++) {
    if (props[i].$ && props[i].$.type === 'group') return props[i]._
  }
  return null
}

function tmx2jsClb (str, cb) {
  if (typeof str !== 'string') {
    const err = new Error('The first parameter was not a string')
    if (!cb) throw err
    return cb(err)
  }

  const result = {
    resources: {}
  }

  parser.parseString(str, (err, data) => {
    if (err) return cb(err)

    const datatype = data.tmx.header[0].$.datatype
    const segtype = data.tmx.header[0].$.segtype
    const oTMF = data.tmx.header[0].$['o-tmf']

    // if (datatype !== 'PlainText') err = new Error('datatype must be PlainText');
    // if (segtype !== 'sentence') err = new Error('segtype must be sentence');
    // if (oTMF !== 'ABCTransMem') err = new Error('o-tmf must be ABCTransMem');
    if (!datatype) err = new Error('datatype must be set')
    if (!segtype) err = new Error('segtype must be set')
    if (!oTMF) err = new Error('o-tmf must be set')
    if (err) return cb(err)

    const version = data.tmx.$.version
    const srclang = data.tmx.header[0].$.srclang
    const creationtool = data.tmx.header[0].$.creationtool
    const creationtoolversion = data.tmx.header[0].$.creationtoolversion
    const adminlang = data.tmx.header[0].$.adminlang

    result.version = version
    result.sourceLanguage = srclang
    result.creationTool = creationtool
    result.creationToolVersion = creationtoolversion
    result.administrationLanguage = adminlang
    result.datatype = datatype
    result.oTMF = oTMF

    if (data.tmx.body[0].tu) {
      data.tmx.body[0].tu.forEach((tu) => {
        if (tu.prop && tu.prop.length > 0 && getGroupProp(tu.prop)) {
          // with namespace
          const namespace = getGroupProp(tu.prop)
          result.resources[namespace] = result.resources[namespace] || {}

          result.tuid = parse(tu, result.resources[namespace], srclang)
          return
        }

        result.tuid = parse(tu, result.resources, srclang)
      })
    }

    cb(null, result)
  })
}

export default function tmx2js (str, cb) {
  if (!cb) {
    return new Promise((resolve, reject) => tmx2jsClb(str, (err, ret) => err ? reject(err) : resolve(ret)))
  }
  tmx2jsClb(str, cb)
}
