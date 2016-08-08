'use strict';
//set a term as a particular Part-of-speech
const log = require('../log');
const tagset = require('../tags');
const path = 'tagger';

//check if the term is compatible with a pos tag.
const canBe = (term, tag) => {
  //already compatible..
  if (term.pos[tag]) {
    return true;
  }
  //unknown tag..
  if (!tagset[tag]) {
    //huh? sure, go for it.
    return true;
  }
  //consult tagset's incompatible tags
  let not = Object.keys(tagset[tag].not);
  for (let i = 0; i < not.length; i++) {
    if (term.pos[not[i]]) {
      return false;
    }
  }
  return true;
};

const set_tag = function(term, tag, reason) {
  log.tag(term, tag, reason);
  //reset term, if necessary
  if (canBe(term, tag) === false) {
    term.pos = {};
  }
  if (!tagset[tag]) {
    console.warn('unknown tag ' + tag + ' - ' + reason);
    return;
  }
  //also set tags by deduction
  let tags = tagset[tag].is;
  for (let i = 0; i < tags.length; i++) {
    if (!term.pos[tags[i]]) {
      log.tag(term, tags[i], 'deduction');
      term.pos[tags[i]] = true;
    }
  }
  return;
};

module.exports = {
  set_tag: set_tag,
  canBe: canBe
};
