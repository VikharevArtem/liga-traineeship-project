import { components } from 'types/api';

export type Task = components['schemas']['Task'] & { id: number };
export type CreateTask = components['schemas']['CreateTask'];
export type UpdateTask = components['schemas']['UpdateTask'];
