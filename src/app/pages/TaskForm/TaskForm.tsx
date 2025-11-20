import { Link, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Layout } from '../Layout/Layout';
import { Checkbox } from 'components/Checkbox';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { addTask, selectTaskById, updateTask } from 'src/slices/tasks/tasksSlice';
import { CreateTask } from 'types/Task.types';

export const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEdit = Boolean(id);
  const taskId = id ? Number(id) : null;
  const currentTask = useAppSelector((state) => selectTaskById(state, Number(id)));
  const { control, handleSubmit, reset } = useForm<CreateTask>({
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

  const onSubmit = (data: CreateTask) => {
    if (isEdit && taskId) {
      dispatch(
        updateTask({
          id: taskId,
          updatedData: data,
        })
      );
    } else {
      dispatch(addTask(data));
    }

    navigate('/tasks');
  };

  return (
    <Layout
      headerChildren={
        <Link to="/tasks">
          <Button>К списку задач</Button>
        </Link>
      }>
      <h1>{!id ? 'Создание новой задачи' : 'Обновление задачи'}</h1>
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
