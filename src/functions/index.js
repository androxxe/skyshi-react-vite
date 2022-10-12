import axiosGet from "./axiosGet";
import axiosPost from './axiosPost'
import axiosDelete from "./axiosDelete"
import axiosUpdate from './axiosUpdate'
import fetchActivities from './fetchActivities'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export { axiosGet, axiosPost, axiosDelete, axiosUpdate, fetchActivities, classNames }