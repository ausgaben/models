import { ImmutableAggregate, VersionNumberType, IDJSONType } from '@rheactorjs/models'
import { URIValue } from '@rheactorjs/value-objects'
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
    super(Object.assign(fields, { $context }))
    const { category, title, amount, booked, saving, bookedAt } = fields
    this.category = NonEmptyStringType(category, ['Spending', 'category:String'])
    this.title = NonEmptyStringType(title, ['Spending', 'title:String'])
    this.amount = IntegerType(amount, ['Spending', 'amount:Integer'])
    this.booked = BooleanType(booked || false, ['Spending', 'booked:Boolean'])
    this.bookedAt = MaybeDateType(bookedAt, ['Spending', 'bookedAt:?Date'])
    this.saving = BooleanType(saving || false, ['Spending', 'saving:Boolean'])
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
        bookedAt: this.bookedAt ? this.bookedAt.toISOString() : undefined,
        saving: this.saving
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
        bookedAt: data.bookedAt ? new Date(data.bookedAt) : undefined,
        saving: data.saving
      })
    )
  }
}

export const SpendingJSONType = struct({
  $id: IDJSONType,
  $version: VersionNumberType,
  $deleted: MaybeBooleanType,
  $createdAt: StringType,
  $updatedAt: MaybeStringType,
  $deletedAt: MaybeStringType,
  category: NonEmptyStringType,
  title: NonEmptyStringType,
  booked: BooleanType,
  bookedAt: MaybeStringType,
  saving: BooleanType,
  amount: IntegerType
}, 'SpendingJSONType')
export const SpendingType = irreducible('SpendingType', x => x instanceof Spending)
