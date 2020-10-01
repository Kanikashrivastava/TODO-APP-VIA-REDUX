import { useColors } from "../../slices/colors/colorSlice";
import React from "react";
import PropTypes from "prop-types";
import { useTasks } from "../../slices/tasks/taskSlice";
import Task from "../Task/Task";

const constructStyles = (colors) => ({
  
  loadMore: {
    cursor: "pointer",
    fontSize: "15px",
    fontStyle: "Italic",
  },
});

function TaskSection({
  title,
  tasks,
  numberOfTodoToShow,
  loadMore,
  completeText,
}) {
  const styles = useColors(constructStyles);
  const { toggleTask } = useTasks();

  return (
    <React.Fragment>
      <h4>{title}</h4>
      {tasks.length ? (
        <React.Fragment>
          {tasks.slice(0, numberOfTodoToShow).map((task) => (
            <Task
              label={task.label}
              key={task.id}
              isDone={task.isDone}
              id={task.id}
              handleOnChange={toggleTask(task.id)}
            />
          ))}
          {numberOfTodoToShow < tasks.length && (
            <span style={styles.loadMore} onClick={loadMore}>
              Load More...
            </span>
          )}
        </React.Fragment>
      ) : (
        completeText
      )}
    </React.Fragment>
  );
}

TaskSection.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      isDone: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  numberOfTodoToShow: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
  completeText: PropTypes.string.isRequired,
};

export {TaskSection}