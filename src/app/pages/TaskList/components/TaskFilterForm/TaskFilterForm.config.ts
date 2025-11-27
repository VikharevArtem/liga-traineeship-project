import { FilterConfig } from './TaskFilterForm.types';

export const taskFilterConfig: FilterConfig = {
  important: {
    label: 'По важности:',
    options: [
      { value: 'important', label: 'Важные', boolean: true },
      { value: 'regular', label: 'Обычные', boolean: false },
    ],
  },
  completed: {
    label: 'По статусу:',
    options: [
      { value: 'completed', label: 'Завершенные', boolean: true },
      { value: 'incomplete', label: 'Незавершенные', boolean: false },
    ],
  },
} as const;
