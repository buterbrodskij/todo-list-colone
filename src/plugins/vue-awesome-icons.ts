import { library } from '@fortawesome/fontawesome-svg-core';
import { faPenToSquare, faTrashAlt, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faFlag, faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const REGULAR = [
  faTrashAlt,
  faPenToSquare,
  faBookmark
];

const SOLID = [
  faFlag,
  faCheck,
  faChevronDown
];

library.add(
  ...REGULAR,
  ...SOLID
);
