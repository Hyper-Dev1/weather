import { configureStore } from "@reduxjs/toolkit"
import locationReducer from "./Weatherslice"

export default configureStore({
  reducer: {
    location: locationReducer,
  },
})
