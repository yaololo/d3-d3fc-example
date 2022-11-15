import { formatCurrency } from '../formatter'

describe('format currency function', () => {
  const amount = 1000
  it('should format to SGD currency if not currency parameter is provider', () => {
    const result = formatCurrency(amount)

    expect(result).toBe("SGD\xa01,000.00")
  })

  it('should format to US currency if US dollar currency is provider', () => {
    const result = formatCurrency(amount, 'USD')

    expect(result).toBe('$1,000.00')
  })
})
