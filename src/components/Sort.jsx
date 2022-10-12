import React, { Fragment } from "react";
import * as HeroIcons from '@heroicons/react/24/outline'
import { Menu, Transition } from "@headlessui/react";

const Sort = ({ setSort, sort }) => {
  const handleSort = (sort) => {
    setSort(sort)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex justify-center items-center bg-transparent rounded-full w-[54px] h-[54px] border border-gray-300">
          <HeroIcons.ArrowsUpDownIcon className="w-5 h-5 text-gray-500 rounded-full" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleSort('terbaru')}
                  className={`${
                    active ? 'bg-gray-200' : ''
                  } group flex w-full items-center justify-between text-gray-700 space-x-4 rounded-md px-4 py-4 text-sm`}
                >
                  <div className="flex items-center text-left space-x-4">
                    <HeroIcons.BarsArrowDownIcon className="w-5 h-5 text-sky-500" />
                    <span className="text-lg">Terbaru</span>
                  </div>
                  { sort == 'terbaru' && <HeroIcons.CheckIcon className="w-5 h-5 text-gray-400" /> }
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleSort('terlama')}
                  className={`${
                    active ? 'bg-gray-200' : ''
                  } group flex w-full items-center justify-between text-gray-700 space-x-4 rounded-md px-4 py-4 text-sm`}
                >
                  <div className="flex items-center text-left space-x-4">
                    <HeroIcons.BarsArrowUpIcon className="w-5 h-5 text-sky-500" />
                    <span className="text-lg">Terlama</span>
                  </div>
                  { sort == 'terlama' && <HeroIcons.CheckIcon className="w-5 h-5 text-gray-400" /> }
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleSort('az')}
                  className={`${
                    active ? 'bg-gray-200' : ''
                  } group flex w-full items-center justify-between text-gray-700 space-x-4 rounded-md px-4 py-4 text-sm`}
                >
                  <div className="flex items-center text-left space-x-4">
                    <HeroIcons.ArrowUturnUpIcon className="w-5 h-5 text-sky-500" />
                    <span className="text-lg">A-Z</span>
                  </div>
                  { sort == 'az' && <HeroIcons.CheckIcon className="w-5 h-5 text-gray-400" /> }
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleSort('za')}
                  className={`${
                    active ? 'bg-gray-200' : ''
                  } group flex w-full items-center justify-between text-gray-700 space-x-4 rounded-md px-4 py-4 text-sm`}
                >
                  <div className="flex items-center text-left space-x-4">
                    <HeroIcons.ArrowUturnDownIcon className="w-5 h-5 text-sky-500" />
                    <span className="text-lg">Z-A</span>
                  </div>
                  { sort == 'za' && <HeroIcons.CheckIcon className="w-5 h-5 text-gray-400" /> }
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleSort('belum_selesai')}
                  className={`${
                    active ? 'bg-gray-200' : ''
                  } group flex w-full items-center justify-between text-gray-700 space-x-4 rounded-md px-4 py-4 text-sm`}
                >
                  <div className="flex items-center text-left space-x-4">
                    <HeroIcons.ArrowsUpDownIcon className="w-5 h-5 text-sky-500" />
                    <span className="text-lg">Belum Selesai</span>
                  </div>
                  { sort == 'belum_selesai' && <HeroIcons.CheckIcon className="w-5 h-5 text-gray-400" /> }
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
};

export default Sort;
