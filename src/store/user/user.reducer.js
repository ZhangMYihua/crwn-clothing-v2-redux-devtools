import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentUser: null,
};


const userSlice = createSlice({
  initialState: INITIAL_STATE,
  name: 'user',
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    }
  }
})


export const userReducer = userSlice.reducer
export const userActions = userSlice.actions



// export const userReducer = (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SET_CURRENT_USER:
//       return { ...state, currentUser: payload };
//     default:
//       return state;
//   }
// };
