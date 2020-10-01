import React, { useState } from "react";
import PropTypes from "prop-types";
import { useColors } from "../../slices/colors/colorSlice";
import checkedIcon from "../../../static/icon/checked.svg";
import notCheckedIcon from "../../../static/icon/not-checked.svg";

const constructStyles = () => ({
  checkBoxInput: {
    display: "none",
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  img: {
    marginRight: "10px",
    cursor: "pointer",
  },
  container: {
    margin: "5px",
  },
  labelText: {
    fontSize: "16px",
    cursor: "pointer",
  },
  taskComplete: {
    textDecoration: 'line-through'
  }
});

function Task(props) {
  const { label, isDone } = props;
  const [checked, setChecked] = useState(isDone);

  const handleOnChange = () => {
    if (props.handleOnChange) {
      props.handleOnChange();
    }
    setChecked((prevCheck) => !prevCheck);
  };

  const styles = useColors(constructStyles);
  const checkImage = checked ? checkedIcon : notCheckedIcon;

  return (
    <div style={styles.container} onClick={handleOnChange}>
      <label style={styles.label}>
        <img
          role="checkbox"
          aria-checked={checked}
          style={styles.img}
          height="20px"
          src={checkImage}
          alt="checked"
        />
        <span style={{...styles.labelText, ...(checked && styles.taskComplete)}}>{label}</span>
      </label>
    </div>
  );
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  isDone: PropTypes.bool,
  handleOnChange: PropTypes.func.isRequired,
};
Task.defaultProps = {
  isDone: false
}
export default React.memo(Task, (prevProps, nextProps) => {
  return prevProps.isDone !== nextProps.isDone
});
