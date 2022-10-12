import { createSlice } from '@reduxjs/toolkit'

export const activitiesSlice = createSlice({
    name: 'activities',
    initialState: {
      activities: [],
      activity: {},
      isOpenActivityDelete: false,
      activityDelete: {},

      isOpenListItemTambah: false,
      
      isOpenListItemEdit: false,
      toDoEdit: {},

      isOpenToDoDelete: false,
      toDoDelete: {},
    },
    reducers: {
      setActivities: (state, action) => {
        state.activities = action.payload;
      },
      setActivity: (state, action) => {
        state.activity = action.payload
      },
      setIsOpenActivityDelete: (state, action) => {
        if(action.payload == true){
          state.isOpenActivityDelete = true;
        } else {
          state.activityDelete = {}
          state.isOpenActivityDelete = false;
        }
      },
      setActivityDelete: (state, action) => {
        state.activityDelete = action.payload
      },


      setIsOpenListItemTambah: (state, action) => {
        state.isOpenListItemTambah = action.payload
      },
      setIsOpenListItemEdit: (state, action) => {
        state.isOpenListItemEdit = action.payload
      },
      setToDoEdit: (state, action) => {
        state.toDoEdit = action.payload
      },


      setIsOpenToDoDelete: (state, action) => {
        if(action.payload == true){
          state.isOpenToDoDelete = true;
        } else {
          state.toDoDelete = {}
          state.isOpenToDoDelete = false;
        }
      },
      setToDoDelete: (state, action) => {
        state.toDoDelete = action.payload
      },
    },

})

export const { 
  setActivities, 
  setActivityDelete, 
  setIsOpenActivityDelete, 
  setActivity,
  setIsOpenListItemTambah,
  setIsOpenToDoDelete,
  setToDoDelete,
  setToDoEdit,
  setIsOpenListItemEdit
} = activitiesSlice.actions

export default activitiesSlice.reducer