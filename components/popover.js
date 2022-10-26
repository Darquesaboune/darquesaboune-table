import { Popover } from "@headlessui/react";
import { Float } from "@headlessui-float/react";
import { PresentationChartBarIcon } from "@heroicons/react/24/solid";

export default function PopoverGraph({ content }) {
  return (
    <Popover>
      <Float
        placement="bottom-start"
        offset={15}
        shift={6}
        flip={10}
        arrow
        portal
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Button className="w-8 h-8 flex justify-center items-center bg-red-50 hover:bg-red-100 text-red-500 rounded">
          <PresentationChartBarIcon className="w-5 h-5" aria-hidden="true" />
        </Popover.Button>

        <Popover.Panel className="bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
          <Float.Arrow className="absolute bg-white w-5 h-5 rotate-45 border border-gray-200" />
          <div className="relative h-full bg-white p-3 text-red-500 rounded-md">
            {content}
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  );
}
