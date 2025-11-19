import { Link, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Layout } from '../Layout/Layout';
import { TaskFormValues } from './TaskForm.types';
import { Checkbox } from 'components/Checkbox';
import { TextField } from 'components/TextField';
import { addTask, getTasks, updateTask } from 'mocks/myTasks';
import { Button } from 'components/Button/Button';

export const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const taskId = id ? Number(id) : null;

  const currentTask = taskId ? getTasks().find((t) => t.id === taskId) : null;

  const { control, handleSubmit, reset } = useForm<TaskFormValues>({
    defaultValues: {
      name: '',
      info: '',
      isImportant: false,
      isCompleted: false,
    },
  });

  useEffect(() => {
    if (isEdit && currentTask) {
      reset({
        name: currentTask.name,
        info: currentTask.info || '',
        isImportant: currentTask.isImportant || false,
        isCompleted: currentTask.isCompleted || false,
      });
    }
  }, [isEdit, currentTask, reset]);

  const onSubmit = (data: TaskFormValues) => {
    if (isEdit && taskId) {
      updateTask(taskId, data);
    } else {
      addTask(data);
    }

    navigate('/tasks');
  };

  return (
    <Layout>
      <Link to="/tasks">
        <Button>К списку задач</Button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField label="Название задачи" value={field.value} onChange={field.onChange} />}
        />
        <Controller
          name="info"
          control={control}
          render={({ field }) => <TextField label="Описание задачи" value={field.value} onChange={field.onChange} />}
        />
        <Controller
          name="isImportant"
          control={control}
          render={({ field }) => <Checkbox label="Важная" checked={field.value} onChange={field.onChange} />}
        />
        <Controller
          name="isCompleted"
          control={control}
          render={({ field }) => <Checkbox label="Завершенная" checked={field.value} onChange={field.onChange} />}
        />
        <Button type="submit">{!id ? 'Создать' : 'Обновить'}</Button>
      </form>
    </Layout>
  );
};
