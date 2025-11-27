import { Controller } from 'react-hook-form';
import { Box, Button, Checkbox, CircularProgress, FormHelperText, Typography } from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import {
  FormContainer,
  StyledTextField,
  CheckboxContainer,
  StyledCheckboxLabel,
  CheckboxWrapper,
} from './TaskForm.styles';
import { useTaskForm } from 'src/hooks/useTaskForm';
import { Layout } from 'app/pages/Layout/Layout';

export const TaskForm = () => {
  const { isEdit, loading, error, control, handleSubmit, onSubmit, isValid, isSubmitted } = useTaskForm();

  return (
    <Layout
      headerChildren={
        <Button variant="contained" disabled={loading} onClick={() => window.history.back()}>
          К списку задач
        </Button>
      }>
      <Typography variant="h1">{isEdit ? 'Обновление задачи' : 'Создание новой задачи'}</Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {error ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" color="error">
                {error}
              </Typography>
            </Box>
          ) : (
            <FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    {...field}
                    label="Название задачи"
                    fullWidth
                    $hasError={!!error}
                    helperText={error?.message}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: error ? (
                        <WarningAmberOutlinedIcon color="error" fontSize="small" sx={{ mr: 1 }} />
                      ) : null,
                    }}
                  />
                )}
              />

              <Controller
                name="info"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    {...field}
                    label="Описание задачи"
                    fullWidth
                    $hasError={!!error}
                    helperText={error?.message}
                    autoComplete="off"
                    multiline
                    rows={4}
                    InputProps={{
                      endAdornment: error ? (
                        <WarningAmberOutlinedIcon color="error" fontSize="small" sx={{ mr: 1 }} />
                      ) : null,
                    }}
                  />
                )}
              />

              <CheckboxWrapper>
                <Controller
                  name="isImportant"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CheckboxContainer error={!!error} margin="normal">
                      <StyledCheckboxLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={!!field.value}
                            sx={{
                              color: error ? 'error.main' : 'primary.main',
                              '&.Mui-checked': {
                                color: error ? 'error.main' : 'primary.main',
                              },
                            }}
                          />
                        }
                        label="Важная"
                        $hasError={!!error}
                      />
                      {error && (
                        <FormHelperText sx={{ mx: 0, whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: 1.2 }}>
                          {error.message}
                        </FormHelperText>
                      )}
                    </CheckboxContainer>
                  )}
                />

                <Controller
                  name="isCompleted"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CheckboxContainer error={!!error} margin="normal">
                      <StyledCheckboxLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={!!field.value}
                            sx={{
                              color: error ? 'error.main' : 'primary.main',
                              '&.Mui-checked': {
                                color: error ? 'error.main' : 'primary.main',
                              },
                            }}
                          />
                        }
                        label="Завершенная"
                        $hasError={!!error}
                      />
                      {error && <FormHelperText>{error.message}</FormHelperText>}
                    </CheckboxContainer>
                  )}
                />
              </CheckboxWrapper>
              <Button type="submit" variant="contained" disabled={!isValid && isSubmitted}>
                {isEdit ? 'Обновить' : 'Создать'}
              </Button>
            </FormContainer>
          )}
        </>
      )}
    </Layout>
  );
};
