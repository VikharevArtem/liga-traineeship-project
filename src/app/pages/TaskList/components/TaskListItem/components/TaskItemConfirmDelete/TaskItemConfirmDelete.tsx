import { Button, Typography } from '@mui/material';
import { TaskItemConfirmDeleteProps } from './TaskItemConfirmDelete.types';
import { ConfirmContainer, ButtonContainer } from './TaskItemConfirmDelete.styles';

export const TaskItemConfirmDelete = ({ onConfirm, onCancel }: TaskItemConfirmDeleteProps) => {
  return (
    <ConfirmContainer>
      <Typography>Вы действительно хотите удалить задачу?</Typography>
      <ButtonContainer>
        <Button variant="contained" onClick={onConfirm}>
          Да
        </Button>
        <Button variant="contained" onClick={onCancel}>
          Нет
        </Button>
      </ButtonContainer>
    </ConfirmContainer>
  );
};
