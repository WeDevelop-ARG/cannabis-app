class Mail {
  constructor () {
    this._to = ''
    this._from = ''
    this._subject = ''
    this._text = ''
    this._html = ''
  }

  set to (value) {
    this._to = value
  }

  set from (value) {
    this._to = value
  }

  set subject (value) {
    this._subject = value
  }

  set text (value) {
    this._text = value
  }

  set html (value) {
    this._html = value
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
