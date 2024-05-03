import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'category',
  initialState: INITIAL_STATE,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload
    }
  }
})

export const categoriesReducer = categoriesSlice.reducer
export const categoriesActions = categoriesSlice.actions


// export const categoriesReducer = (
//   state = INITIAL_STATE,
//   action = {}
// ) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
//       return { ...state, categories: payload };
//     default:
//       return state;
//   }
// };
