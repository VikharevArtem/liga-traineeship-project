import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskList } from 'app/pages/TaskList/TaskList';
import { TaskForm } from 'app/pages/TaskForm/TaskForm';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/task/new" element={<TaskForm />} />
        <Route path="/task/update/:id" element={<TaskForm />} />
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
