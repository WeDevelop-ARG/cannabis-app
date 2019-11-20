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
    return this
  }

  set from (value) {
    this._to = value
    return this
  }

  set subject (value) {
    this._subject = value
    return this
  }

  set text (value) {
    this._text = value
    return this
  }

  set html (value) {
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

module.exports = { Mail }
