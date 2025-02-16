import _ from "lodash";

export const notes = _.times(10, (i) => ({
  id: `${i + 1}`,
  title: `Note ${i + 1}`,
  text: `Text ${i + 1}`,
}));
