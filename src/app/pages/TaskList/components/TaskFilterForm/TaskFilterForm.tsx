import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Controller } from 'react-hook-form';
import {
  StyledContainer,
  SearchBox,
  FiltersBox,
  SectionTitle,
  ResetButton,
} from 'app/pages/TaskList/components/TaskFilterForm/TaskFilterForm.styles';
import { FilterKey, TaskFilterFormProps } from 'app/pages/TaskList/components/TaskFilterForm/TaskFilterForm.types';
import { taskFilterConfig } from 'app/pages/TaskList/components/TaskFilterForm/TaskFilterForm.config';
import { useTaskFilters } from 'src/hooks/useTaskFilters';

export function TaskFilterForm({ onClose }: TaskFilterFormProps) {
  const { form, setFilter, resetFilters, hasActiveFilters } = useTaskFilters();
  const { control, setValue } = form;

  return (
    <StyledContainer disableGutters>
      <SearchBox>
        <Controller
          name="searchName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Поиск по названию"
              variant="outlined"
              size="small"
              fullWidth
              autoComplete="off"
              InputProps={{
                endAdornment: field.value && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="очистить поле поиска"
                      onClick={() => {
                        field.onChange('');
                        setValue('searchName', '');
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      size="small">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </SearchBox>

      <FiltersBox>
        <SectionTitle variant="body2">Выберите фильтры</SectionTitle>
        {(Object.keys(taskFilterConfig) as Array<FilterKey>).map((key) => {
          const config = taskFilterConfig[key];
          const selectedOption = config.options.find((opt) => opt.boolean === form.getValues()[key]);
          const selectValue = selectedOption?.value || '';

          return (
            <Controller
              key={key}
              name={key}
              control={control}
              render={({ field }) => (
                <FormControl size="small" fullWidth>
                  <InputLabel>{config.label}</InputLabel>
                  <Select
                    value={selectValue}
                    label={config.label}
                    displayEmpty
                    onChange={(e) => {
                      const value = e.target.value;
                      const option = config.options.find((opt) => opt.value === value);
                      const booleanValue = option ? option.boolean : null;

                      field.onChange(booleanValue);
                      setFilter(key, booleanValue);
                    }}
                    renderValue={(selected) => {
                      if (!selected) return;
                      const option = config.options.find((opt) => opt.value === selected);
                      return option ? option.label : <em>Все задачи</em>;
                    }}>
                    <MenuItem value="">
                      <em>Все задачи</em>
                    </MenuItem>
                    {config.options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          );
        })}
        <ResetButton variant="contained" onClick={resetFilters} disabled={!hasActiveFilters} fullWidth>
          Сбросить фильтры
        </ResetButton>
        <Button variant="contained" onClick={onClose} fullWidth>
          Закрыть фильтры
        </Button>
      </FiltersBox>
    </StyledContainer>
  );
}
