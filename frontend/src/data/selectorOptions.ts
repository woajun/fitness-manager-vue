import { makeNumberArray } from '../components/helper';

const selectorOptions = {
  weight: [
    ...makeNumberArray(40, 0, 0.5), ...makeNumberArray(16, 20, 5), ...makeNumberArray(40, 100, 10),
  ],
  rep: [...makeNumberArray(500, 0, 1)],
  sec: [...makeNumberArray(61, 0, 10)],
};

export default selectorOptions;
