import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedQualifier, InstanceLink, ListWrapper } from './index.js';
const CharactersList = props => {
  const {
    characters
  } = props;
  return h(ListWrapper, null, characters.map((character, index) => h("li", {
    key: index
  }, h(InstanceLink, {
    instance: character
  }), character.qualifier && h(AppendedQualifier, {
    qualifier: character.qualifier
  }))));
};
export default CharactersList;