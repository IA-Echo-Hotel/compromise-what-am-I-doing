'use strict';
//set a term as a particular Part-of-speech
const path = require('./paths');
const log = path.log;
const tagset = path.tags;

//remove a tag from a term
const unTagOne = (term, tag, reason) => {
  if (term.tag[tag]) {
    log.tell('   --' + tag + ' ' + (reason || ''));
    delete term.tag[tag];
  }
};

const unTagAll = (term, tag, reason) => {
  if (!term || !tag) {
    return;
  }
  unTagOne(term, tag, reason);
  if (tagset[tag]) {
    //pull-out their children (dependants) too
    let killAlso = tagset[tag].children || [];
    for(let o = 0; o < killAlso.length; o++) {
      unTagOne(term, killAlso[o], reason);
    }
  }
  return;
};
module.exports = unTagAll;
