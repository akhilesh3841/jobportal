import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    job:null,
    alljobs:null
  },
  reducers: {
    addjob: (state, action) => {
      state.job=action.payload  // ✅ appending new job
    },
  appendjob: (state, action) => {
    state.alljobs=action.payload
},
clearJob:(state,action)=>{
  state.alljobs=null;
  state.job=null;
}
  },
});

export const { addjob,appendjob,clearJob } = jobSlice.actions;

export default jobSlice.reducer;
