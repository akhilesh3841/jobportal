import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    appliedjobs: {},
  },
  reducers: {
    setApplicationsForUser: (state, action) => {
      const { userId, jobs } = action.payload;
      state.appliedjobs[userId] = jobs;
    },
    addApplicationForUser: (state, action) => {
  const { userId, job } = action.payload;

  if (!state.appliedjobs[userId]) {
    state.appliedjobs[userId] = [];
  }

  // Prevent duplicate applications for the same job
  const alreadyApplied = state.appliedjobs[userId].some(j => j._id === job._id);

  if (!alreadyApplied) {
    state.appliedjobs[userId].push(job);
  }
},
    clearApplicationsForUser: (state, action) => {
      const userId = action.payload;
      delete state.appliedjobs[userId];
    },
  },
});

export const {
  setApplicationsForUser,
  addApplicationForUser,
  clearApplicationsForUser,
} = applicationSlice.actions;

export default applicationSlice.reducer;
