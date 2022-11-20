import dayjs from 'dayjs';
import { provide, inject } from 'vue';

const dayJsSymbol = Symbol();

export function provideDayJs() {
  const dayJs = dayjs;
  provide(dayJsSymbol, dayJs);
}

export function useDayJs() {
  const dayJs = inject(dayJsSymbol);
  if (!dayJs) throw new Error('No i18n provided!!!');

  return dayJs;
}

