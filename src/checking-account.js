import {ImmutableAggregate, VersionNumberType, IDJSONType} from '@rheactorjs/models'
import {URIValue} from '@rheactorjs/value-objects'
import {Boolean as BooleanType, String as StringType, refinement, struct, maybe, irreducible} from 'tcomb'
const NonEmptyStringType = refinement(StringType, s => s.length > 0, 'NonEmptyStringType')
const MaybeBooleanType = maybe(BooleanType)
const MaybeStringType = maybe(StringType)

const $context = new URIValue('https://github.com/ausgaben/ausgaben-rheactor/wiki/JsonLD#CheckingAccount')

export class CheckingAccount extends ImmutableAggregate {
  constructor (fields) {
    super(Object.assign(fields, {$context}))
    const {identifier, name, currency, monthly, savings} = fields
    this.identifier = NonEmptyStringType(identifier, ['CheckingAccount', 'identifier:ImmutableAggregateId'])
    this.name = NonEmptyStringType(name, ['CheckingAccount', 'name:String'])
    this.currency = NonEmptyStringType(currency, ['CheckingAccount', 'currency:String'])
    this.monthly = BooleanType(monthly, ['CheckingAccount', 'monthly:Boolean'])
    this.savings = BooleanType(savings, ['CheckingAccount', 'monthly:savings'])
  }

  toJSON () {
    return Object.assign(
      super.toJSON(),
      {
        identifier: this.identifier,
        name: this.name,
        currency: this.currency,
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
        currency: data.currency,
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
}

export const CheckingAccountJSONType = struct({
  $id: IDJSONType,
  $version: VersionNumberType,
  $deleted: MaybeBooleanType,
  $createdAt: StringType,
  $updatedAt: MaybeStringType,
  $deletedAt: MaybeStringType,
  identifier: NonEmptyStringType,
  name: NonEmptyStringType,
  currency: NonEmptyStringType,
  monthly: BooleanType,
  savings: BooleanType
}, 'CheckingAccountJSONType')
export const CheckingAccountType = irreducible('CheckingAccountType', x => x instanceof CheckingAccount)
