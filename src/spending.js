import {ImmutableAggregate, VersionNumberType} from '@rheactorjs/models'
import {URIValue} from '@rheactorjs/value-objects'
import {
  Boolean as BooleanType,
  String as StringType,
  refinement,
  struct,
  maybe,
  irreducible,
  Date as DateType,
  Integer as IntegerType
} from 'tcomb'
const NonEmptyStringType = refinement(StringType, s => s.length > 0, 'NonEmptyStringType')
const MaybeBooleanType = maybe(BooleanType)
const MaybeStringType = maybe(StringType)
const MaybeDateType = maybe(DateType)

const $context = new URIValue('https://github.com/ausgaben/ausgaben-rheactor/wiki/JsonLD#Spending')

export class Spending extends ImmutableAggregate {
  constructor (fields) {
    super(Object.assign(fields, {$context}))
    const {category, title, amount, booked, bookedAt} = fields
    this.category = NonEmptyStringType(category, ['Spending', 'category:String'])
    this.title = NonEmptyStringType(title, ['Spending', 'title:String'])
    this.amount = IntegerType(amount, ['Spending', 'amount:Integer'])
    this.booked = BooleanType(booked || false, ['Spending', 'booked:Boolean'])
    this.bookedAt = MaybeDateType(bookedAt, ['Spending', 'bookedAt:?Date'])
  }

  static get $context () {
    return $context
  }

  toJSON () {
    return Object.assign(
      super.toJSON(),
      {
        category: this.category,
        title: this.title,
        amount: this.amount,
        booked: this.booked,
        bookedAt: this.bookedAt ? this.bookedAt.toISOString() : undefined
      }
    )
  }

  static fromJSON (data) {
    SpendingJSONType(data)
    return new Spending(Object.assign(
      super.fromJSON(data), {
        category: data.category,
        title: data.title,
        amount: data.amount,
        booked: data.booked,
        bookedAt: data.bookedAt ? new Date(data.bookedAt) : undefined
      })
    )
  }
}

export const SpendingJSONType = struct({
  $id: StringType,
  $version: VersionNumberType,
  $deleted: MaybeBooleanType,
  $createdAt: StringType,
  $updatedAt: MaybeStringType,
  $deletedAt: MaybeStringType,
  category: NonEmptyStringType,
  title: NonEmptyStringType,
  booked: BooleanType,
  bookedAt: MaybeDateType,
  amount: IntegerType
}, 'SpendingJSONType')
export const SpendingType = irreducible('SpendingType', x => x instanceof Spending)
