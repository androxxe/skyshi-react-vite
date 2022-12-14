import React from "react"
import * as HeroIcons from '@heroicons/react/24/outline'
import dayjs from "dayjs";
import 'dayjs/locale/id'
import { useDispatch } from "react-redux";
import { setActivityDelete, setIsOpenActivityDelete } from "../redux";
import { Link } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  const dispatch = useDispatch()

  const handleHapus = () => {
    dispatch(setIsOpenActivityDelete(true))
    dispatch(setActivityDelete(activity))
  }

  return <>
    <div className="shadow bg-white rounded-xl px-6 py-4">
      <Link to={`detail/${activity?.id}`}>
        <div className="h-[170px]">
          <h4 className="text-lg font-bold" data-cy="activity-item-title">{ activity.title }</h4>
        </div>
      </Link>
      <div className="flex flex-row items-center justify-between">
        <div data-cy="activity-item-date">
          <span className="text-gray-500">{ dayjs(activity.created_at).locale('id').format('DD MMMM YYYY') }</span>
        </div>
        <button onClick={handleHapus} data-cy="activity-item-delete-button">
          <HeroIcons.TrashIcon className="cursor-pointer w-6 h-6 text-gray-400" />
        </button>
      </div>
    </div>
  </>
};

export default ActivityCard;
