import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
  const { control } = form;

  const handleClearSearch = () => {
    form.setValue('searchName', '');
  };

  const handleFilterChange = (key: FilterKey) => (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    const option = taskFilterConfig[key].options.find((opt) => opt.value === value);
    const booleanValue = option ? option.boolean : null;

    form.setValue(key, booleanValue);
    setFilter(key, booleanValue);
  };

  const renderFilterLabel = (config: typeof taskFilterConfig[FilterKey]) => {
    const defaultLabel = <em key="all-label">Все задачи</em>;

    return (selected: string | undefined) => {
      if (!selected) {
        return;
      }

      const option = config.options.find((opt) => opt.value === selected);
      return option ? option.label : defaultLabel;
    };
  };

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
                      onClick={handleClearSearch}
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
                    {...field}
                    value={selectValue}
                    label={config.label}
                    displayEmpty
                    onChange={handleFilterChange(key)}
                    renderValue={renderFilterLabel(config)}>
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
