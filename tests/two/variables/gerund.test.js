import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/gerund] '

let arr = [
  // === gerunds ===
  [`chillin'`, '#Gerund'],
  ['singing', '#Gerund'],
  [`shocking quickly`, '#Gerund .'],
  [`shocking me`, '#Gerund .'],
  [`shocking his`, '#Gerund .'],
  [`he imagines shocking`, '#Pronoun #PresentTense #Gerund'],
  [`quickly shocking`, '. #Gerund'],
  [`quietly shocking`, '. #Gerund'],
  [`shocking him`, '#Gerund .'],
  [`trusting the`, '#Gerund .'],
  [`charming every`, '#Gerund .'],
  [`revealing a clue`, '#Gerund . .'],
  // [`selling like hot cakes`, '#Gerund like #Noun #Plural'],
  [`doing better for fights`, '#Gerund #Adjective for #Plural'],
  [`adding a sleeping aid.`, `#Gerund #Determiner #Noun #Singular`],
  [`babysitting her`, `#Gerund .`],
  [`baking a cooking`, `#Gerund #Determiner #Noun`],
  [`casting a shadow`, `#Gerund #Determiner #Noun`],
  [`riding that bike`, `#Gerund #Determiner #Noun`],
  [`timing the race`, `#Gerund the #Noun`],
  [`barely manufacturing`, `#Adverb #Gerund`],
  [`started thinking`, `#PastTense #Gerund`],
  [`finish listening`, `#Infinitive #Gerund`],
  [`laughing and crying`, `#Gerund and #Gerund`],
  [`without laughing`, `. #Gerund`],
  [`uplifting thinking`, `#Adjective #Noun`],
  [`he loves thinking`, `. #PresentTense #Gerund`],
  [`he stopped thinking`, `. #PastTense #Gerund`],
  [`starts thinking`, `#Verb #Gerund`],
  [`that is all you are getting`, 'that #Copula #Noun you are #Gerund'],
  // [`the rising cost of health`, 'the #Gerund #Singular of .'],
  [`shocking spencer's`, '#Gerund .'],
  [`commanding the field`, '#Gerund #Determiner #Noun'],
  ['he is walking', '#Pronoun #Copula #Gerund'],
  [`revealing his guts`, '#Gerund #Possessive #Plural'],
  [`distressing us`, '#Gerund #Noun'],
  [`loving you`, '#Gerund #Noun'],
  [`promising to leave`, '#Gerund #Conjunction #Verb'],

  // === adjectives ===
  [`as disgusting as`, '#Preposition #Adjective #Preposition'],
  [`more disgusting than`, '#Adverb #Adjective #Preposition'],
  [`was so nausiating`, '#Copula #Adverb #Adjective'],
  [`extremely moving`, '#Adverb #Adjective'],
  // [`this reckoning`, '#Determiner #Noun'],
  // [`he is redefining his art`, '#Pronoun #Copula #Gerund his #Noun'],
  // [`he is redefining art`, '#Pronoun #Copula #Gerund #Noun'],
  [`it was redefining`, '#Pronoun #Copula #Adjective'],
  [`it was a redefining moment`, '#Pronoun #Copula #Determiner #Adjective #Noun'],
  [`i found it isolating`, '#Noun #PastTense #Noun #Adjective'],
  [`it was disgusting`, '#Pronoun #Copula #Adjective'],
  [`dark green`, '#Adverb #Adjective'],
  [`kinda sparkly`, '#Adverb #Adjective'],
  [`quite stunning`, '#Adverb #Adjective'],
  [`slowly stunning`, '#Adverb #Verb'],
  [`quite awfully dashing`, '#Adverb #Adverb #Adjective'],
  ['he is well', '#Pronoun #Copula #Adjective'],
  ['is well made', '#Copula #Adverb #Adjective'],
  // ['tacos were way over cooked', '#Plural #Verb #Adverb #Adjective #Adjective'],
  ['they were under appreciated', '#Pronoun #Verb #Adjective #Adjective'],
  ['they felt appreciated', '#Pronoun #PastTense #Adjective'],
  [`a revealing clue`, 'a #Adjective .'],
  [`shocking ignorance`, '#Adjective .'],
  [`extremely charming`, '. #Adjective'],
  [`is shocking`, '. #Adjective'],
  [`really shocking`, '. #Adjective'],
  [`too insulting`, '. #Adjective'],
  [`bruising defence`, '#Adjective .'],
  [`enduring legacy`, '#Adjective .'],
  [`amazing appeal`, '#Adjective #Singular'],
  [`amazing appeals`, '#Adjective #Plural'],
  [`david is amazing`, '#Noun is #Adjective'],
  [`The difference is astounding.`, 'the #Noun is #Adjective'],
  [`their accelerating returns`, `#Noun #Adjective #Noun`],
  [`accelerating his returns`, `#Gerund his #Plural`],
  [`the exploding returns`, `. #Adjective #Plural`],
  [`their exploding returns`, `. #Adjective #Plural`],
  [`their plunging neckline`, `. #Adjective #Singular`],

  // gerund noun
  // ['clothing', '#Noun'],
  // [`he teaches breadmaking`, 'he #Verb #Noun'],
  // [`babysitting sucks`, `#Noun #Verb`],
  // [`casting was really awful`, `#Noun #Copula #Adverb #Adjective`],
  // [`baking was fun`, `#Noun #Copula #Adjective`],
  // [`manufacturing returned`, `#Noun #PastTense`],
  // [`laughing may help`, `#Noun #Modal #Infinitive`],
  // [`laughing is pretty handy`, `#Noun #Copula #Adverb #Adjective`],
  // [`my riding`, `#Possessive #Noun`],
  // [`minus laughing`, `. #Noun`],
  // [`thinking aid`, `#Noun #Noun`],
  // [`talking therapy`, `#Noun #Noun`],
  // [`talking therapies`, `#Noun #Plural`],
  // [`toronto riding`, `#Noun #Noun`],
  // [`the timing`, `the #Noun`],
  // [`watching the working class`, `#Gerund the #Noun #Noun`],
  // [`talking the talk`, `#Gerund the #Noun`],
  // [`early warning`, `#Adjective #Noun`],
  // [`planning processes`, `#Noun #Plural`],
  // [`planning committees`, `#Noun #Plural`],
  // [`walking should be fun`, `#Noun #Modal be #Adjective`],
  // [`i think tipping sucks`, `#Pronoun #Infinitive #Noun #PresentTense`],
  // [`defeating his longstanding rivals`, '#Gerund #Possessive #Adjective #Plural'],
]
test('match:', function (t) {
  arr.forEach(function (a) {
    let [str, match] = a
    let doc = nlp(str).compute('tagRank')
    let tags = doc.json()[0].terms.map(term => term.tagRank[0])
    let m = doc.match(match)
    let msg = `'${(str + "' ").padEnd(20, ' ')}  - '${tags.join(', ')}'`
    t.equal(m.text(), doc.text(), here + msg)
  })
  t.end()
})
