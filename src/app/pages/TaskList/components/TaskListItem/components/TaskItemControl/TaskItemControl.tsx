import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskItemControlProps } from './TaskItemsControl.types';
import { ControlContainer, ControlItem, DeleteButton, EditButton } from './TaskItemControl.styles';

export const TaskItemControl = ({ id, onDeleteConfirm }: TaskItemControlProps) => {
  return (
    <ControlContainer>
      <ControlItem>
        <Link className="task-edit" to={`/task/update/${id}`}>
          <Tooltip title="Редактировать задачу">
            <EditButton edge="end">
              <EditIcon />
            </EditButton>
          </Tooltip>
        </Link>
      </ControlItem>
      <ControlItem>
        <Tooltip title="Удалить задачу">
          <DeleteButton edge="end" onClick={onDeleteConfirm}>
            <DeleteIcon />
          </DeleteButton>
        </Tooltip>
      </ControlItem>
    </ControlContainer>
  );
};
