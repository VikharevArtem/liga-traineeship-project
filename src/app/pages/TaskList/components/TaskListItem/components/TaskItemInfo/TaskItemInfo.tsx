import { TaskItemInfoProps } from './TaskItemInfo.types';
import {
  ChipsContainer,
  CompletedChip,
  HeaderBox,
  ImportantChip,
  InfoContainer,
  TaskDescription,
  TaskTitle,
  TitleWrapper,
} from './TaskItemInfo.styles';

export const TaskItemInfo = ({ task }: TaskItemInfoProps): JSX.Element => {
  return (
    <InfoContainer>
      <ChipsContainer>
        {task.isImportant && <ImportantChip label="Важная" size="small" />}
        {task.isCompleted && <CompletedChip label="Выполнена" size="small" />}
      </ChipsContainer>
      <HeaderBox>
        <TitleWrapper>
          <TaskTitle variant="h3">{task.name}</TaskTitle>
        </TitleWrapper>
      </HeaderBox>
      <TaskDescription variant="body1">{task.info ? task.info : 'Описание задачи отсутствует'}</TaskDescription>
    </InfoContainer>
  );
};
