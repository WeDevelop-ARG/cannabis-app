class Mail {
  constructor () {
    this._to = ''
    this._from = ''
    this._subject = ''
    this._text = ''
    this._html = ''
  }

  setTo (value) {
    this._to = value
    return this
  }

  setFrom (value) {
    this._to = value
    return this
  }

  setSubject (value) {
    this._subject = value
    return this
  }

  setText (value) {
    this._text = value
    return this
  }

  setHtml (value) {
    this._html = value
    return this
  }

  get to () {
    return this._to
  }

  get from () {
    return this._from
  }

  get subject () {
    return this._subject
  }

  get text () {
    return this._text
  }

  get html () {
    return this._html
  }
}

module.exports = Mail
