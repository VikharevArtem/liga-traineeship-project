import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Layout } from 'app/pages/Layout/Layout';
import { Checkbox } from 'components/Checkbox';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { addNewTask, fetchTask, updateTaskAsync, clearError } from 'src/slices/tasks/tasksSlice';
import { CreateTask } from 'types/Task.types';
import { Loader } from 'components/Loader';

export const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEdit = Boolean(id);
  const taskId = Number(id);

  const { task, loading, error } = useAppSelector((state) => state.tasks);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateTask>({
    defaultValues: {
      name: '',
      info: '',
      isImportant: false,
      isCompleted: false,
    },
  });
  useEffect(() => {
    if (isEdit && !isNaN(taskId)) {
      dispatch(fetchTask(taskId));
    }
  }, [dispatch, isEdit, taskId]);

  useEffect(() => {
    if (isEdit && task) {
      reset({
        name: task.name,
        info: task.info || '',
        isImportant: task.isImportant || false,
        isCompleted: task.isCompleted || false,
      });
    }
  }, [isEdit, task, reset, navigate]);

  const onSubmit = async (data: CreateTask) => {
    try {
      if (isEdit) {
        await dispatch(updateTaskAsync({ id: taskId, updatedData: data })).unwrap();
      } else {
        await dispatch(addNewTask(data)).unwrap();
      }
      navigate('/tasks');
    } catch (err) {
      // Ошибка уже обработана в Redux (через extraReducers)
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Layout
      headerChildren={
        <Button disabled={isSubmitting} onClick={() => window.history.back()}>
          К списку задач
        </Button>
      }>
      <div className="task-form-wrap"></div>
      <Loader isLoading={loading} variant={'circle'}>
        <h1>{isEdit ? 'Обновление задачи' : 'Создание новой задачи'}</h1>
        {error && <div className="error">{error}</div>}

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
      </Loader>
    </Layout>
  );
};
