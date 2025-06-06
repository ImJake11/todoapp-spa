import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import { toggleCompleteTaskTab } from '../redux/taskReducer'

const CompleteTaskButton = () => {

    const dispatch = useDispatch();

    const { completedTask } = useSelector((state: RootState) => state.task);

    return (
        <div className='w-[2rem] h-[2rem] border border-gray-600 rounded-[7px] relative text-1xl lg:hidden'
            onClick={() => dispatch(toggleCompleteTaskTab())}
        >
            <i className="ri-check-double-fill"></i>
            {/** indicator */}
            <div className='absolute -top-[.3rem] -right-[.3rem] w-[1rem] h-[1rem] rounded-full bg-blue-500 grid place-content-center text-white text-[.8rem]'>
                {completedTask.length}
            </div>
        </div >
    )
}

export default CompleteTaskButton
