import axiosGet from "./axiosGet"
import * as staticVariable from '../utils/static'

export default async function fetchActivities(id = null) {
  const response = await axiosGet({ route: `activity-groups${id ? `/${id}` : ''}`,
    data: 
      id ? 
        null
      : 
        {
          params: {
            email: staticVariable?.EMAIL_USER
          }
        }
  })

  return response
}