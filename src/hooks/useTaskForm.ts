import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { taskSchema } from 'app/pages/TaskForm/taskSchema';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { CreateTask, UpdateTask } from 'types/Task.types';
import { addNewTask, fetchTask, updateTaskAsync, clearError } from 'src/slices/tasks/tasksSlice';

export const useTaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEdit = Boolean(id);
  const taskId = Number(id);

  const { task, loading, error } = useAppSelector((state) => state.tasks);
  const [currentTask, setCurrentTask] = useState<UpdateTask | null>(null);

  useEffect(() => {
    if (isEdit && !isNaN(taskId)) {
      dispatch(fetchTask(taskId));
    }
  }, [dispatch, isEdit, taskId]);

  useEffect(() => {
    if (isEdit && task) {
      const taskData: UpdateTask = {
        name: task.name,
        info: task.info || '',
        isImportant: task.isImportant || false,
        isCompleted: task.isCompleted || false,
      };
      setCurrentTask(taskData);
      reset(taskData);
    }
  }, [isEdit, task]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitted },
  } = useForm<CreateTask>({
    resolver: yupResolver(taskSchema),
    context: { initialTask: currentTask },
    mode: 'onChange',
    defaultValues: {
      name: '',
      info: '',
      isImportant: false,
      isCompleted: false,
    },
  });

  const onSubmit = async (data: CreateTask) => {
    try {
      if (isEdit) {
        await dispatch(updateTaskAsync({ id: taskId, updatedData: data })).unwrap();
      } else {
        await dispatch(addNewTask(data)).unwrap();
      }
      navigate('/tasks');
    } catch (err) {
      // Ошибка обработана через Redux
    }
  };

  return {
    isEdit,
    loading,
    error,
    control,
    handleSubmit,
    onSubmit,
    isValid,
    isSubmitted,
  };
};
