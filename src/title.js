import { URIValue } from '@rheactorjs/value-objects'
import { String as StringType, refinement, struct, irreducible } from 'tcomb'

const {Model} = require('@rheactorjs/models')
const $context = new URIValue('https://github.com/ausgaben/ausgaben-rheactor/wiki/JsonLD#Title')
const NonEmptyStringType = refinement(StringType, s => s.length > 0, 'NonEmptyStringType')

/**
 * @param {string} title
 * @constructor
 */
export class Title extends Model {
  constructor (title) {
    super({$context})
    this.title = NonEmptyStringType(title, ['Title', 'title:String'])
  }

  toJSON () {
    return Object.assign(
      super.toJSON(),
      {
        title: this.title
      }
    )
  }

  static fromJSON (data) {
    TitleJSONType(data)
    return new Title(Object.assign(
      super.fromJSON(data), {
        title: data.title
      })
    )
  }

  static get $context () {
    return $context
  }
}

export const TitleJSONType = struct({
  title: NonEmptyStringType
}, 'TitleJSONType')
export const TitleType = irreducible('TitleType', x => x instanceof Title)
