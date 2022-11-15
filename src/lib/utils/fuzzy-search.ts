

// export const fuzzySearchList = (list: Array<string>, matchingText: string) => {
//   const formattedText = matchingText.replace(/ /g, '').toLocaleLowerCase()
//   if (!formattedText) return list

//   return list.filter((item) => fuzzySearchWords(item, formattedText))
// }

export const fuzzySearchWords = (sentence: string, matchingText: string) => {
  // searchIndex is used to track the current matching index
  let searchIndex = 0

  const formattedText = matchingText.replace(/ /g, '').toLocaleLowerCase()
  const formattedSentence = sentence.replace(/ /g, '').toLocaleLowerCase()

  const matchingTextLength = formattedText.length
  const sentenceLength = formattedSentence.length

  if (sentenceLength < matchingTextLength) return false

  for (let i = 0; i < matchingTextLength; i++) {
    // Update the index to current matched index
    // e,g "hello world".indexOf("o", 0) -> 4
    // e,g "hello world".indexOf("l", 4) -> 9
    searchIndex = formattedSentence.indexOf(formattedText[i], searchIndex)
    if (searchIndex < 0 || searchIndex >= sentenceLength) return false
  }

  return true
}
