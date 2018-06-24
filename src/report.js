import { URIValue } from '@rheactorjs/value-objects'
import { Reference, ReferenceType, ReferenceJSONType, Model } from '@rheactorjs/models'
import { struct, irreducible, Integer as IntegerType } from 'tcomb'

const $context = new URIValue('https://github.com/ausgaben/ausgaben-rheactor/wiki/JsonLD#Report')

export class Report extends Model {
  constructor (fields) {
    super({$context})
    const {balance, income, spendings, savings, checkingAccount} = fields
    this.balance = IntegerType(balance, ['Report', 'balance:Integer'])
    this.income = IntegerType(income, ['Report', 'income:Integer'])
    this.spendings = IntegerType(spendings, ['Report', 'spendings:Integer'])
    this.savings = IntegerType(savings, ['Report', 'savings:Integer'])
    this.checkingAccount = ReferenceType(checkingAccount, ['Report', 'checkingAccount:ReferenceValue'])
  }

  static get $context () {
    return $context
  }

  toJSON () {
    return Object.assign(super.toJSON(), {
      $context: $context.toString(),
      balance: this.balance,
      income: this.income,
      spendings: this.spendings,
      savings: this.savings,
      checkingAccount: this.checkingAccount.toJSON()
    })
  }

  static fromJSON (data) {
    ReportJSONType(data)
    return new Report(Object.assign(
      super.fromJSON(data), {
        balance: data.balance,
        income: data.income,
        spendings: data.spendings,
        savings: data.savings,
        checkingAccount: Reference.fromJSON(data.checkingAccount)
      }))
  }
}

export const ReportJSONType = struct({
  balance: IntegerType,
  income: IntegerType,
  spendings: IntegerType,
  savings: IntegerType,
  checkingAccount: ReferenceJSONType
}, 'ReportJSONType')
export const ReportType = irreducible('ReportType', x => x instanceof Report)
