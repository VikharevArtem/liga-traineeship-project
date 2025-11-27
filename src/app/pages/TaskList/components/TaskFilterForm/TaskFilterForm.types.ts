export interface TaskFilterFormProps {
  onClose?: () => void;
}

export type FilterOption = {
  value: string;
  label: string;
  boolean: boolean;
};

export type FilterKey = 'important' | 'completed';

export type FilterConfig = {
  [K in FilterKey]: {
    label: string;
    options: readonly FilterOption[];
  };
};

export type TaskFilters = {
  searchName: string;
  important: boolean | null;
  completed: boolean | null;
};

export type SetFilterValue = (key: FilterKey, value: boolean | null) => void;
export type ResetFilters = () => void;
