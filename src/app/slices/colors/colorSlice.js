import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const colorsSlice = createSlice({
  name: "colors",
  initialState: {
    colors: {
      blue: { shade1: "#0082d4" },
      red: { shade1: "#c22a22" },
      grey: {
        shade1: "#e2e7ec",
        shade2: "#fcfcfc",
        shade3: "#8b9da7",
      },
      white: {
        shade1: "#ffffff",
      },
      black: {
        shade1: "#444444",
        shade2: "#888888",
      },
    },
  },
  reducers: {},
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getColors = (state) => state.color.colors;
export const useColors = (styles) => {
  const colors = useSelector(getColors);
  return styles(colors)
}
export default colorsSlice.reducer;
