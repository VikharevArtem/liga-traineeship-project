import { ChangeEventHandler } from 'react';

export interface TaskFormValues {
  id?: number;
  name: string;
  info: string;
  isCompleted: boolean;
  isImportant: boolean;
}

export type FormHandler = ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
