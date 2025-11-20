import { Link } from 'react-router-dom';
import { TaskItemProps } from './TaskItemProps.types';
import './TaskListItem.css';
import { useAppDispatch } from 'src/hooks/redux';
import { deleteTask } from 'src/slices/tasks/tasksSlice';

export const TaskListItem = ({ task }: TaskItemProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };
  return (
    <li className="task-card">
      <div className="task-card__header">
        <h3 className={`${task.isCompleted && 'completed'}`}>{task.name}</h3>
        <div className="task-card__header-actions">
          <Link className="task-edit" to={`/task/update/${task.id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                <path d="M30.9995 8.99902L38.9995 16.999" />
                <path d="M7.99953 31.999L35.9994 4L43.9995 11.999L15.9995 39.999L5.99951 41.999L7.99953 31.999Z" />
                <path d="M30.9995 8.99902L38.9995 16.999" />
                <path d="M8.99951 31.999L15.9995 38.999" />
                <path d="M12.9995 34.999L34.9995 12.999" />
              </g>
            </svg>
          </Link>
          <a className="task-delete" onClick={handleDeleteTask}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M10 5h4a2 2 0 1 0-4 0M8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.111A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zM14.25 9a.75.75 0 0 0-.75.75v7.5a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75"
              />
            </svg>
          </a>
        </div>
      </div>
      <p>{task.info ? task.info : 'Описание задачи отсутствует'}</p>
      <div className={`task-tag ${task.isImportant && 'important'}`}>{task.isImportant && 'Важная'}</div>
    </li>
  );
};
