import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

const createId = () => Math.ceil(Math.random() * 10000000000);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [
      { isDone: false, label: "Some Label", id: createId() },
      { isDone: true, label: "Some Label", id: createId() },
      { isDone: false, label: "Some Label", id: createId() },
      { isDone: true, label: "Some Label", id: createId() },
    ],
  },
  reducers: {
    addTask: (state, action) => {
      const { label } = action.payload;
      state.tasks.push({ isDone: false, label, id: createId() });
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      task.isDone = !task.isDone;
    },
    sortTasks: (state) => {
      state.tasks.sort((a, b) => {
        return a.label.localeCompare(b.label)
      });
    },
  },
});

const { addTask, toggleTask, sortTasks } = taskSlice.actions;

export const useTasks = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  return {
    completedTasks: tasks.filter((task) => task.isDone),
    pendingTasks: tasks.filter((task) => !task.isDone),
    addTask: (payload) => dispatch(addTask(payload)),
    toggleTask: (taskId) => () => dispatch(toggleTask({ taskId })),
    sortTasks: () => dispatch(sortTasks()),
  };
};

export default taskSlice.reducer;
