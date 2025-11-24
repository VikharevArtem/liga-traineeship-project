import * as yup from 'yup';
import { UpdateTask } from 'types/Task.types';

export interface TaskFormContext {
  initialTask: UpdateTask | null;
}

export const taskSchema = yup.object({
  name: yup.string().required('Название задачи обязательно'),
  info: yup.string().required('Описание задачи обязательно'),
  isCompleted: yup.boolean().default(false),
  isImportant: yup.boolean().when(['isCompleted', '$initialTask'], {
    is: (isCompleted: boolean, initialTask: UpdateTask | null) =>
      isCompleted && initialTask !== null && !initialTask?.isImportant,
    then: (schema) => schema.oneOf([false], 'Нельзя пометить как важную, если задача завершается'),
    otherwise: (schema) => schema,
  }),
});

export type TaskFormValues = yup.InferType<typeof taskSchema>;
