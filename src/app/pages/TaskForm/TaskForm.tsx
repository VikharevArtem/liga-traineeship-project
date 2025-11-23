import { Link, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Layout } from 'app/pages/Layout/Layout';
import { Checkbox } from 'components/Checkbox';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { addNewTask, fetchTask, updateTaskAsync } from 'src/slices/tasks/tasksSlice';
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

  useEffect(() => {
    if (error && isEdit) {
      const timer = setTimeout(() => {
        navigate('/tasks');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, isEdit, navigate]);

  const onSubmit = async (data: CreateTask) => {
    try {
      if (isEdit) {
        await dispatch(updateTaskAsync({ id: taskId, updatedData: data })).unwrap();
      } else {
        await dispatch(addNewTask(data)).unwrap();
      }
      navigate('/tasks');
    } catch (err) {
      console.log('Ошибка при сохранении задачи:', err);
    }
  };

  return (
    <Layout
      headerChildren={
        <Button disabled={isSubmitting} onClick={() => window.history.back()}>
          К списку задач
        </Button>
      }>
      <Loader isLoading={loading} variant={'circle'}>
        <h1>{isEdit ? 'Обновление задачи' : 'Создание новой задачи'}</h1>
        {error ? (
          <div style={{ color: '#ff0505ff' }}>
            {error} <span>Вы будете перенаправленны к списку задач</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField label="Название задачи" value={field.value} onChange={field.onChange} />
              )}
            />
            <Controller
              name="info"
              control={control}
              render={({ field }) => (
                <TextField label="Описание задачи" value={field.value} onChange={field.onChange} />
              )}
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
        )}
      </Loader>
    </Layout>
  );
};
