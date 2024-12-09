"use client";
import React, { useState } from "react";
import Select from "react-dropdown-select";
interface PollModalProps {
  onClose: () => void;
}
type Option = {
  value: number;
  label: string;
};
export default function PollModal({ onClose }: PollModalProps) {
  const [Values, setValues] = useState<Option[]>([]);
  const options: Option[] = [
    { value: 1, label: "Mark as Read" },
    { value: 2, label: "Delete" },
  ];
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="max-h-[80vh] overflow-auto bg-[var(--sections)] border border-white/10 w-full max-w-[600px] rounded-[12px] shadow-lg">
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <h2 className=" uppercase font-semibold text-center block text-white">Add poll</h2>
                    <button onClick={onClose} className="w-7 h-7 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-white">&times;</button>
                </div>
                <div className="p-4 flex flex-col gap-4">
                   <section className='flex flex-col gap-1'>
                    <label className='text-white'>Ask a Question</label>
                    <input placeholder='Enter your question' className='bg-[var(--bgh)] rounded-lg p-[10px] w-full placeholder:text-[var(--foreground)]' type="text"/>
                   </section>
                   <section className='flex flex-col gap-1'>
                    <label className='text-white'>Options</label>
                    <input placeholder='Option' className='bg-[var(--bgh)] rounded-lg p-[10px] w-full placeholder:text-[var(--foreground)]' type="text"/>
                    <input placeholder='Option' className='bg-[var(--bgh)] rounded-lg p-[10px] w-full placeholder:text-[var(--foreground)]' type="text"/>
                    <button className='mb-2 sticky bottom-0 font-semibold pt-2 text-left text-[var(--highlight-blue)] hover:text-white buttonSet'>+ Add New Option</button>
                   </section>
                   <section className='flex flex-col gap-1'>
                    <label className='text-white'>Settings</label>
                    <label className="customCheckbox flex gap-3 items-center cursor-pointer">
              <input type="checkbox" />
              <span></span>Allow user to choose multiple answers
            </label>
            <label className="customCheckbox flex gap-3 items-center cursor-pointer">
              <input type="checkbox" />
              <span></span>Allow user to add new options
            </label>
                   </section>
                   <section className='flex max-w-[200px] flex-col gap-1'>
                    <label className='text-white'>Poll Duration</label>
                    <Select
              values={Values}
              className="fixReactSelect border !border-white/5 min-w-[150px]"
              options={options}
              onChange={(values: Option[]) => setValues(values)}
            />
                    </section>
                </div>
                    <section className="border-t border-white/5 flex gap-2 justify-end p-4">
                    <button className="bg-[var(--highlght-hover)] text-white rounded-md px-3 py-2">Cancel</button>
                    <button className="bg-[var(--highlght-hover)] text-white rounded-md px-3 py-2">Done</button>
                    </section>
            </div>
    </div>
  );
}
