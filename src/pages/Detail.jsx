import React, { Fragment, useEffect, useState } from "react";
import Layout from "./Layout";
import * as HeroIcons from '@heroicons/react/24/outline'
import { axiosUpdate, fetchActivities } from "../functions";
import { Link, useParams } from "react-router-dom";
import ReactLoading from 'react-loading'
import colors from "tailwindcss/colors"
import { Menu, Transition } from "@headlessui/react";
import { Button, ListItemModalDelete, ListItemModalEdit, ListItemModalTambah, Sort } from "../components";
import { NoToDo } from '../assets/images'
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setActivity, setIsOpenListItemEdit, setIsOpenListItemTambah, setIsOpenToDoDelete, setToDoDelete, setToDoEdit } from "../redux";

const Detail = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [sort, setSort] = useState('terbaru')

  const dispatch = useDispatch()
  const { activity } = useSelector(state => state.activities)

  const [title, setTitle] = useState('')
  const [isEditTitle, setIsEditTitle] = useState(false)

  useEffect(() => {
    (async() => {
      setIsLoading(true)
      const response = await fetchActivities(id)
      if(response.status == 200){
        dispatch(setActivity(response.data))
        setTitle(response.data?.title)
      }

      setIsLoading(false)
    })()
  }, [])

  const handleTambah = () => {
    dispatch(setIsOpenListItemTambah(true))
  }

  const handleStartEdit = () => {
    setIsEditTitle(true)
  }
  
  const handleHapus = (to_do) => {
    dispatch(setToDoDelete(to_do))
    dispatch(setIsOpenToDoDelete(true))
  }

  const handleCheckbox = async (to_do) => {
    let oldActivity = activity
    dispatch(setActivity({
      ...activity,
      todo_items: activity.todo_items.map(todo_items => {
        if(todo_items.id == to_do.id){
          return {
            ...todo_items,
            is_active: !todo_items.is_active
          }
        }
        return todo_items
      })
    }))

    const response = await axiosUpdate({ route: `todo-items/${to_do?.id}`, 
      data: {
        ...to_do,
        created_at: dayjs().toDate(),
        updated_at: dayjs().toDate(),
        is_active: !to_do?.is_active
      }
    })

    if(response.status != 200){
      setActivity(oldActivity)
    }
  }

  const handleUpdateTitle = async () => {
    let oldActivity = activity

    setIsEditTitle(false)
    dispatch(setActivity({
      ...activity,
      title
    }))

    const response = await axiosUpdate({ route: `activity-groups/${id}`, 
      data: {
        title,
        created_at: activity.created_at,
        updated_at: dayjs().toDate(),
      }
    })

    if(response.status != 200){
      dispatch(setActivity(oldActivity))
    }
  }

  const handleEdit = (to_do) => {
    dispatch(setToDoEdit(to_do))
    dispatch(setIsOpenListItemEdit(true))
  }

  return (
    <>
      <Layout title="To Do List - Detail">
        { isLoading ?
          <div className="flex items-center justify-center h-[360px]">
            <ReactLoading type="spin" color={colors.sky[500]} height={40} width={40} />
          </div>
        : 
          <>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-6 flex-1">
                <Link to={'..'} className="cursor-pointer" data-cy="todo-back-button">
                  <HeroIcons.ChevronLeftIcon className="w-8 h-8 font-extrabold text-black"  />
                </Link>
                { isEditTitle ?
                  <form onSubmit={handleUpdateTitle}>
                    <input 
                      autoFocus={true}
                      name="title"
                      onBlur={handleUpdateTitle}
                      className="bg-transparent text-3xl border-b border-black font-bold"
                      value={title} 
                      onChange={event => setTitle(event.target?.value)}
                    />
                  </form>
                :
                  <div onClick={handleStartEdit} data-cy="todo-title">
                    <h2 className="text-3xl font-bold">{ activity?.title }</h2>   
                  </div>
                }
                <HeroIcons.PencilIcon onClick={isEditTitle ? handleUpdateTitle : handleStartEdit} className="w-5 h-5 text-gray-400 cursor-pointer" data-cy="todo-title-edit-button" />
              </div>
              <div className="flex justify-end items-end space-x-4">
                <div data-cy="todo-sort-button">
                  <Sort sort={sort} setSort={setSort} />
                </div>
                <Button onClick={handleTambah} dataCy="todo-add-button">
                  <HeroIcons.PlusIcon className="w-5 h-5 mr-3" />
                  Tambah
                </Button>
              </div>   
            </div>
            { activity?.todo_items?.length > 0 ?
              activity?.todo_items?.filter(to_do => {
                  if (sort == 'belum_selesai') {
                    return to_do.is_active == 1
                  } 
                  return to_do
                })
                .sort((a, b) => {
                  if(sort == 'az') {
                    return a.title == b.title ? 0 : (a.title < b.title) ? -1 : 1
                  } else if (sort == 'za') {
                    return a.title == b.title ? 0 : (b.title < a.title) ? -1 : 1
                  } else if (sort == 'terbaru') {
                    return a.id == b.id ? 0 : (b.id < a.id) ? -1 : 1
                  } else if (sort == 'terlama') {
                    return a.id == b.id ? 0 : (a.id < b.id) ? -1 : 1
                  }
                })
                .map((to_do, index) => {
                let color
                if(to_do?.priority == 'very-high') {
                  color = 'bg-red-500'
                } else if (to_do?.priority == 'high') {
                  color = 'bg-yellow-500'
                } else if (to_do?.priority == 'normal') {
                  color = 'bg-emerald-500'
                } else if (to_do?.priority == 'low') {
                  color = 'bg-blue-600'
                } else if (to_do?.priority == 'very-low') {
                  color = 'bg-purple-500'
                }
                return (
                  <div data-cy="todo-item" className="bg-white px-6 py-5 mb-5 rounded-lg flex items-center justify-between shadow space-x-4" key={`todo_items_${index}`}>
                    <div className="flex items-center text-left space-x-4">
                      <div data-cy="todo-item-checkbox">
                        <input type="checkbox" checked={to_do?.is_active == 0 ? true : false} onChange={() => handleCheckbox(to_do)} className="border h-[40px] w-[40px] rounded-none" />
                      </div>
                      <div className={`${color} w-[14px] h-[14px] rounded-full`} />
                      <div data-cy="todo-item-title" onClick={() => handleEdit(to_do)}  >
                        <p className={`text-lg ${to_do?.is_active == 0 ? 'line-through' : ''}`}>{ to_do?.title }</p>
                      </div>
                      <button onClick={() => handleEdit(to_do)}>
                        <HeroIcons.PencilIcon className="text-gray-300 w-5 h-5" />
                      </button>
                    </div>
                    <button data-cy="todo-item-delete-button" onClick={() => handleHapus(to_do)}>
                      <HeroIcons.TrashIcon className="text-gray-500 w-5 h-5" />
                    </button>
                  </div>
                )
              })
            :
              <div className="flex flex-col items-center my-12">
                <img src={NoToDo} width={500} data-cy="todo-empty-state" onClick={handleTambah} />
              </div>
            }
            <ListItemModalTambah />
            <ListItemModalEdit />
            <ListItemModalDelete />
          </>
        }
      </Layout>
    </>
  )
}

export default Detail;
