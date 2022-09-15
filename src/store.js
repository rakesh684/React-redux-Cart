import {configureStore } from '@reduxjs/toolkit'
import {reducer} from "./redux/reducers/reducer"

 const store = configureStore(
     {reducer}
)

export default store