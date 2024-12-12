import { dateFnsLocalizer } from 'react-big-calendar';

import { format, getDay, parse, startOfWeek } from 'date-fns';
import es from 'date-fns/locale/es';

const locales = {
  es: es,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
