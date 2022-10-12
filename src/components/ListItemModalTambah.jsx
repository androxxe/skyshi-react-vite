import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { axiosPost, fetchActivities } from "../functions";
import { setActivity, setIsOpenListItemTambah } from "../redux";
import * as HeroIcons from '@heroicons/react/24/outline'
import ReactLoading from 'react-loading'
import Button from "./Button";
import TextInput from "./TextInput";
import { useForm, FormProvider } from 'react-hook-form'
import SelectInput from "./SelectInput";
import colors from 'tailwindcss/colors'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  title: yup.string().required(),
  priority: yup.string().required()
})

const ListItemModalTambah = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm({
    defaultValues: {
      title: '',
      priority: 'very-high'
    },
    resolver: yupResolver(schema)
  })

  const watch = form.watch()
  const { isOpenListItemTambah, activity } = useSelector(state => state.activities)
  
  useEffect(() => {
    form.setValue('title', '')
    form.setValue('priority', 'very-high')
    form.trigger()
  }, [isOpenListItemTambah]);
  
  const handleBatal = () => {
    dispatch(setIsOpenListItemTambah(false))
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    const response = await axiosPost({ route: 'todo-items', 
      data: {
        ...data,
        activity_group_id: activity?.id
      }
    })
    setIsLoading(false)

    if(response.status == 201){
      dispatch(setIsOpenListItemTambah(false))
      const response = await fetchActivities(activity?.id)
      if(response.status == 200){
        dispatch(setActivity(response.data))
      }
    }
  }

  return (
    <>
      <Transition appear show={isOpenListItemTambah} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleBatal}>
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
            <div data-cy="modal-add" className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between py-5 px-7 mt-2">
                  <h3 className="text-xl font-semibold text-gray-800">Tambah List Item</h3>
                  <button data-cy="modal-add-close-button" onClick={handleBatal}>
                    <HeroIcons.XMarkIcon className="text-gray-400 w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormProvider {...form}>
                    <div className="p-6 py-8 border-y border-gray-200 space-y-8">
                      <TextInput 
                        label="NAMA LIST ITEM"
                        placeholder="Tambahkan nama Activity"
                        dataCy="modal-add-name-input"
                        register={form.register('title')}
                        errors={form.formState?.errors?.title}
                      />
                      <SelectInput
                        dataCy="modal-add-priority-dropdown"
                        label="Priority"
                        name="priority"
                        value={watch.priority}
                        data={[
                          {
                            label: <div className="flex items-center space-x-4">
                              <div className="w-[12px] h-[12px] rounded-full bg-red-500 mr-2" />
                              Very High
                            </div>,
                            value: 'very-high'
                          },
                          {
                            label: <div className="flex items-center space-x-4">
                              <div className="w-[12px] h-[12px] rounded-full bg-yellow-500 mr-2" />
                              High
                            </div>,
                            value: 'high'
                          },
                          {
                            label: <div className="flex items-center space-x-4">
                              <div className="w-[12px] h-[12px] rounded-full bg-emerald-500 mr-2" />
                              Medium
                            </div>,
                            value: 'normal'
                          },
                          {
                            label: <div className="flex items-center space-x-4">
                              <div className="w-[12px] h-[12px] rounded-full bg-blue-600 mr-2" />
                              Low
                            </div>,
                            value: 'low'
                          },
                          {
                            label: <div className="flex items-center space-x-4">
                              <div className="w-[12px] h-[12px] rounded-full bg-purple-500 mr-2" />
                              Very Low
                            </div>,
                            value: 'very-low'
                          },
                        ]}
                        errors={form.formState?.errors?.priority}
                      />
                    </div>
                    <div className="p-6 py-8 flex justify-end">
                      <Button dataCy="modal-add-save-button" disabled={watch.title == '' ? true : false} type="submit" className="w-[130px]">
                        { 
                          isLoading ?
                            <ReactLoading type="spin" color={colors.white} width={30} height={30} /> 
                          :
                            'Simpan'
                        }
                      </Button>
                    </div>
                  </FormProvider>
                </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
};

export default ListItemModalTambah;
