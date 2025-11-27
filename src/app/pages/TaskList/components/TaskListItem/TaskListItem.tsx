import { memo, useState } from 'react';
import { StyledTaskListItem } from './TaskListItem.styles';
import { TaskItemInfo } from './components/TaskItemInfo/TaskItemInfo';
import { TaskItemControl } from './components/TaskItemControl/TaskItemControl';
import { TaskItemConfirmDelete } from './components/TaskItemConfirmDelete/TaskItemConfirmDelete';
import { TaskItemProps } from 'app/pages/TaskList/components/TaskListItem/TaskItemProps.types';
import { useAppDispatch } from 'src/hooks/redux';
import { deleteTaskAsync } from 'src/slices/tasks/tasksSlice';

const TaskListItemComponent = ({ task }: TaskItemProps) => {
  const dispatch = useAppDispatch();
  const [isDelete, setIsDelete] = useState(false);

  const handleDeleteConfirm = () => {
    setIsDelete(true);
  };

  const handleCancel = () => {
    setIsDelete(false);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTaskAsync(task.id)).unwrap();
      setIsDelete(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <StyledTaskListItem>
      <TaskItemInfo task={task} />
      <TaskItemControl id={task.id} onDeleteConfirm={handleDeleteConfirm} />
      {isDelete && <TaskItemConfirmDelete onConfirm={handleDelete} onCancel={handleCancel} />}
    </StyledTaskListItem>
  );
};

export const TaskListItem = memo(TaskListItemComponent);
