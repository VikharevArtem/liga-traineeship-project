import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, ControllerRenderProps } from 'react-hook-form';
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

  // Загрузка задачи при редактировании
  useEffect(() => {
    if (isEdit && !isNaN(taskId)) {
      dispatch(fetchTask(taskId));
    }
  }, [dispatch, isEdit, taskId]);

  // Установка начальных значений при редактировании
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

  // Очистка ошибки при размонтировании
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
    trigger,
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
      // Ошибка уже обработана через Redux
    }
  };

  const handleCompletedChange = useCallback(
    (field: ControllerRenderProps<CreateTask, 'isCompleted'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      field.onChange(checked);
      if (checked) {
        trigger('isImportant');
      }
    },
    [trigger]
  );

  return {
    isEdit,
    loading,
    error,
    control,
    handleSubmit,
    onSubmit,
    isValid,
    isSubmitted,
    handleCompletedChange,
  };
};
