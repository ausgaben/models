import {Aggregate, VersionNumberType} from '@rheactorjs/models'
import {URIValue} from '@rheactorjs/value-objects'
import {Boolean as BooleanType, String as StringType, refinement, struct, maybe, irreducible} from 'tcomb'
const NonEmptyStringType = refinement(StringType, s => s.length > 0, 'NonEmptyStringType')
const MaybeBooleanType = maybe(BooleanType)
const MaybeStringType = maybe(StringType)

const $context = new URIValue('https://github.com/ausgaben/ausgaben-rheactor/wiki/JsonLD#CheckingAccount')

export class CheckingAccount extends Aggregate {
  constructor (fields) {
    super(Object.assign(fields, {$context}))
    const {identifier, name, monthly, savings} = fields
    this.identifier = NonEmptyStringType(identifier, ['CheckingAccount', 'identifier:AggregateId'])
    this.name = NonEmptyStringType(name, ['CheckingAccount', 'name:String'])
    this.monthly = BooleanType(monthly, ['CheckingAccount', 'monthly:Boolean'])
    this.savings = BooleanType(savings, ['CheckingAccount', 'monthly:savings'])
  }

  toJSON () {
    return Object.assign(
      super.toJSON(),
      {
        identifier: this.identifier,
        name: this.name,
        monthly: this.monthly,
        savings: this.savings
      }
    )
  }

  static fromJSON (data) {
    CheckingAccountJSONType(data)
    return new CheckingAccount(Object.assign(
      super.fromJSON(data), {
        identifier: data.identifier,
        name: data.name,
        monthly: data.monthly,
        savings: data.savings
      })
    )
  }

  /**
   * @returns {URIValue}
   */
  static get $context () {
    return $context
  }

  /**
   * Returns true if x is of type CheckingAccount
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof CheckingAccount) || (Aggregate.is(x) && '$context' in x && URIValue.is(x.$context) && $context.equals(x.$context))
  }
}

export const CheckingAccountJSONType = struct({
  $id: StringType,
  $version: VersionNumberType,
  $deleted: MaybeBooleanType,
  $createdAt: StringType,
  $updatedAt: MaybeStringType,
  $deletedAt: MaybeStringType,
  identifier: NonEmptyStringType,
  name: NonEmptyStringType,
  monthly: BooleanType,
  savings: BooleanType
}, 'CheckingAccountJSONType')
export const CheckingAccountType = irreducible('CheckingAccountType', CheckingAccount.is)
