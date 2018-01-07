import {URIValue} from '@rheactorjs/value-objects'
import {String as StringType, refinement, struct, irreducible} from 'tcomb'
import {Model} from '@rheactorjs/models'
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

  /**
   * Returns true if x is of type Title
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof Title) || ('$context' in x && URIValue.is(x.$context) && $context.equals(x.$context))
  }
}

export const TitleJSONType = struct({
  title: NonEmptyStringType
}, 'TitleJSONType')
export const TitleType = irreducible('TitleType', Title.is)
