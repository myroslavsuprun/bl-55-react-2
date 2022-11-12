import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const tasksInitialState = { tasks: [] };

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksInitialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { payload } = action;

        state.tasks.push(payload);
      },

      prepare(text) {
        return {
          payload: {
            text,
            id: nanoid(),
          },
        };
      },
    },

    deleteTask: (state, action) => {
      const { tasks } = state;
      const { payload } = action;

      const filteredTasks = tasks.filter(({ id }) => {
        return id !== payload;
      });

      state.tasks = filteredTasks;
    },

    editTask: (state, action) => {
      const { tasks } = state;
      const { payload } = action;

      const filteredTasks = tasks.filter(({ id }) => {
        return payload.id !== id;
      });

      state.tasks = [...filteredTasks, payload];
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { addTask, deleteTask, editTask } = tasksSlice.actions;
