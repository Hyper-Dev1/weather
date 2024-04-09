import { createSlice } from "@reduxjs/toolkit"

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    value: "", // Update to "value" to match the state structure
  },
  reducers: {
    setLocation: (state, action) => {
      state.value = action.payload.id
      console.log(state.value)
    },
  },
})

export const { setLocation } = locationSlice.actions

export const selectLocation = (state) => state.location.value

export default locationSlice.reducer
