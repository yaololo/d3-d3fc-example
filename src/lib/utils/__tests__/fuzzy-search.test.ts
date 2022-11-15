import { fuzzySearchWords } from '../fuzzy-search'

describe('fuzzySearchWords function', () => {
  const sentence = 'should match with key word'

  it('should return true with key work "sdo"', () => {
    const keyWord = 'sdo'
    const result = fuzzySearchWords(sentence, keyWord)

    expect(result).toBeTruthy()
  })

  it('should return false with key work "ods"', () => {
    const keyWord = 'ods'

    const result = fuzzySearchWords(sentence, keyWord)
    expect(result).toBeFalsy()
  })

  it('should return false if key word is longer than sentence', () => {
    const keyWord = 'ods'
    const testingSentence = 'a'

    const result = fuzzySearchWords(testingSentence, keyWord)
    expect(result).toBeFalsy()
  })
})
