import React, { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import Task from "./app/components/Task/Task";
import { useTasks } from "./app/slices/tasks/taskSlice";
import { useColors } from "./app/slices/colors/colorSlice";
import { TaskSection } from "./app/components/TaskSection/TaskSection";
const constructStyles = (colors) => ({
  section: {
    backgroundColor: colors.grey.shade2,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  taskSection: {
    display: "flex",
    justifyContent: "center",
  },
  searchInput: {
    marginRight: "10px",
    width: "450px",
    padding: "10px 15px",
    fontSize: "18px",
    border: "1px solid " + colors.grey.shade1,
    outlineColor: colors.grey.shade1,
    boxShadow: "none",
    borderRadius: "3px",
    color: colors.black.shade2,
  },
  pendingTasks: {
    minWidth: "400px",
    fontSize: "20px",
    color: colors.grey.shade3,
  },
  completedTasks: {
    minWidth: "200px",
    fontSize: "20px",
    color: colors.grey.shade3,
  },
  search: {
    display: "flex",
  },
  addBtn: {
    padding: "10px 40px",
    backgroundColor: colors.blue.shade1,
    color: colors.grey.shade1,
    border: colors.blue.shade1,
    cursor: "pointer",
    marginRight: '10px'
  },
  sortBtn: { 
    padding: "10px 40px",
    border: colors.blue.shade1,
    backgroundColor: colors.grey.shade1,
    color: colors.blue.shade1,
    cursor: "pointer",
  },
  error: {
    color: colors.red.shade1,
    marginTop: "15px",
    display: "block",
    fontSize: "15px",
  },
  title: {
    fontWeight: 400,
    fontSize: "36px",
    color: colors.black.shade2,
  },
});
function App() {
  const { completedTasks, pendingTasks, addTask, sortTasks } = useTasks();
  const styles = useColors(constructStyles);
  const [numberTodoToShow, setNumberOfTodoToShow] = useState({
    pendingTasks: 10,
    completedTasks: 10,
  });
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const handleSearchInput = (e) => {
    const value = e.target.value;
    if (value.length > 20) {
      setError("Must be 20 characters or less");
    } else {
      setError("");
      setSearchInput(e.target.value);
    }
  };
  const handleAddTask = () => {
    addTask({ label: searchInput });
    setSearchInput("");
    setError("");
  };
  const loadMorePendingTask = () =>
    setNumberOfTodoToShow((prevState) => ({
      ...prevState,
      pendingTasks: prevState.pendingTasks + 5,
    }));
  const loadMoreCompletedTask = () =>
    setNumberOfTodoToShow((prevState) => ({
      ...prevState,
      completedTasks: prevState.completedTasks + 5,
    }));
  return (
    <section style={styles.section}>
      <header style={styles.header}>
        <h1 style={styles.title}>Tasks</h1>
      </header>
      <main style={styles.main}>
        <section style={styles.addTask}>
          <div style={styles.search}>
            <input
              type="text"
              value={searchInput}
              style={styles.searchInput}
              placeholder="+ Add a task"
              onChange={handleSearchInput}
            />
            <button
              style={styles.addBtn}
              disabled={!searchInput || error}
              onClick={handleAddTask}
            >
              Add
            </button>
            <button
              style={styles.sortBtn}
              disabled={error}
              onClick={sortTasks}
            >
              Sort
            </button>
          </div>
          <span style={styles.error}>{error}</span>
        </section>
        <section style={styles.taskSection}>
          <section style={styles.pendingTasks}>
            <TaskSection
              completeText="No more task left"
              loadMore={loadMorePendingTask}
              tasks={pendingTasks}
              title="To-do"
              numberOfTodoToShow={numberTodoToShow.pendingTasks}
            />
          </section>
          <section style={styles.completedTasks}>
            <TaskSection
              completeText="No task completed."
              loadMore={loadMoreCompletedTask}
              tasks={completedTasks}
              title="Completed"
              numberOfTodoToShow={numberTodoToShow.completedTasks}
            />
          </section>
        </section>
      </main>
    </section>
  );
}

export default App;
