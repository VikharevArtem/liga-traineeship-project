import { Controller } from 'react-hook-form';
import { useTaskForm } from 'src/hooks/useTaskForm';
import { Layout } from 'app/pages/Layout/Layout';
import { Checkbox } from 'components/Checkbox';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader';

export const TaskForm = () => {
  const { isEdit, loading, error, control, handleSubmit, onSubmit, isValid, isSubmitted, handleCompletedChange } =
    useTaskForm();

  return (
    <Layout
      headerChildren={
        <Button disabled={loading} onClick={() => window.history.back()}>
          К списку задач
        </Button>
      }>
      <Loader isLoading={loading} variant={'circle'}>
        <h1>{isEdit ? 'Обновление задачи' : 'Создание новой задачи'}</h1>
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                containerClassName={error ? 'invalid' : ''}
                label="Название задачи"
                value={field.value}
                onChange={field.onChange}
                errorText={error?.message}
              />
            )}
          />

          <Controller
            name="info"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                containerClassName={error ? 'invalid' : ''}
                label="Описание задачи"
                value={field.value}
                onChange={field.onChange}
                errorText={error?.message}
              />
            )}
          />

          <Controller
            name="isImportant"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Checkbox label="Важная" checked={field.value} onChange={field.onChange} error={error?.message} />
            )}
          />

          <Controller
            name="isCompleted"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Checkbox
                label="Завершенная"
                checked={field.value}
                onChange={handleCompletedChange(field)}
                error={error?.message}
              />
            )}
          />

          <Button type="submit" disabled={!isValid && isSubmitted}>
            {isEdit ? 'Обновить' : 'Создать'}
          </Button>
        </form>
      </Loader>
    </Layout>
  );
};
