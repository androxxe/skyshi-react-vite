import { configureStore } from '@reduxjs/toolkit'
import activitiesSlice from './activitiesSlice'

export default configureStore({
    reducer: {
        activities: activitiesSlice
    }
})