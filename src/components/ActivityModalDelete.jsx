import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { axiosDelete, fetchActivities } from "../functions";
import { setActivities, setIsOpenActivityDelete } from "../redux";
import * as HeroIcons from '@heroicons/react/24/outline'
import ReactLoading from 'react-loading'
import colors from "tailwindcss/colors";
import Button from "./Button";

const ActivityModalDelete = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)
  const { isOpenActivityDelete, activityDelete } = useSelector(state => state.activities)
  
  const handleBatal = () => {
    dispatch(setIsOpenActivityDelete(false))
  }

  const handleHapus = async () => {
    setIsLoading(true)
    const response = await axiosDelete({ route: `activity-groups/${activityDelete?.id}`})
    setIsLoading(false)
    
    if(response.status == 200){
      const responseActivities = await fetchActivities()
      dispatch(setActivities(responseActivities.data?.data))
      dispatch(setIsOpenActivityDelete(false))
      setIsOpenSuccessModal(true)
    }
  }

  const handleCloseSuccessModal = () => {
    setIsOpenSuccessModal(false)
  }

  return (
    <>
      <Transition appear show={isOpenSuccessModal} as={Fragment}>
        <Dialog as="div" open={isOpenSuccessModal} className="relative z-20" onClose={handleCloseSuccessModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center" data-cy="modal-information">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <p className="text-center text-lg flex items-center">
                    <HeroIcons.ExclamationCircleIcon className="text-green-600 w-8 h-8 mr-3"/> Activity berhasil dihapus
                  </p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isOpenActivityDelete} as={Fragment}>
        <Dialog as="div" open={isOpenActivityDelete} className="relative z-20" onClose={handleBatal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto" data-cy="modal-delete">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="py-5 flex flex-col items-center">
                    <HeroIcons.ExclamationTriangleIcon className="w-[84px] text-red-500 mb-10" data-cy="modal-delete-icon" />
                    <p className="text-center text-lg" data-cy="modal-delete-title">
                      Apakah anda yakin menghapus activity <b>"{ activityDelete?.title }"</b>
                    </p>
                  </div>
                  <div className="mt-4 flex flex-row items-center justify-center space-x-4">
                    <Button onClick={handleBatal} color="gray" dataCy="modal-delete-cancel-button">
                      Batal
                    </Button>
                    <Button color="red" dataCy="modal-delete-confirm-button" onClick={handleHapus}>
                      { isLoading ?
                        <ReactLoading type="spin" color={colors.white} width={30} height={30} /> 
                      :
                        "Hapus"
                      }
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
};

export default ActivityModalDelete;
