import React, { useEffect, useState } from "react";
import { ActivityCard, Button } from "../components";
import { axiosPost, fetchActivities } from "../functions";
import * as staticVariable from '../utils/static'
import ActivityModalDelete from "../components/ActivityModalDelete"
import ReactLoading from 'react-loading'
import colors from 'tailwindcss/colors'
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "../redux";
import Layout from "./Layout";
import { NoActivity } from '../assets/images'
import * as HeroIcons from '@heroicons/react/24/outline'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { activities } = useSelector(state => state.activities)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingTambah, setIsLoadingTambah] = useState(false)

  useEffect(() => {
    fetchActivity()
  }, []);

  const handleTambah = async () => {
    setIsLoadingTambah(true)
    const response = await axiosPost({ route: 'activity-groups', data: {
      email: staticVariable.EMAIL_USER,
      title: 'New Activity'
    }})
    await fetchActivity()
    setIsLoadingTambah(false)
  }

  const fetchActivity = async () => {
    setIsLoading(true)
    const response = await fetchActivities()
    setIsLoading(false)
    dispatch(setActivities(response.data?.data))
  }
  
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex-1">Activity</h2>   
        <div className="flex justify-end">
          <Button onClick={handleTambah} width dataCy="activity-add-button" className="w-[170px]">
            { isLoadingTambah ?
              <ReactLoading type="spin" color={colors.white} width={30} height={30} /> 
            :
              <>
                <HeroIcons.PlusIcon className="w-6 h-6 mr-3" />
                Tambah
              </>
            }
          </Button>
        </div>   
      </div>
      { isLoading ?
        <div className="flex items-center justify-center h-[360px]">
          <ReactLoading type="spin" color={colors.sky[500]} height={40} width={40} />
        </div>
      : 
        activities.length > 0 ? 
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 my-8">
            { activities.map((activity, index) => 
              <ActivityCard key={`activity_${index}`} activity={activity} />
            )}
          </div>
        :
          <div className="flex flex-col items-center my-12">
            <img src={NoActivity} width={750} data-cy="activity-empty-state" />
          </div>
      }
      <ActivityModalDelete />
    </Layout>
  )
};

export default Dashboard
