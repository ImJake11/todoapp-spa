import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { deleteTask, markFinish, moveToCompleted, updateTask, viewTask } from "../redux/taskReducer";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React, { useState } from "react";

const TaskTile = ({ data }: { data: TaskModel }) => {

    const dispatch = useDispatch();

    const taskReducer = useSelector((state: RootState) => state.task);


    // to determine if the user is updating the task data
    const [isUpdate, setIsUpdate] = useState(false);

    // this will return true if the dat aof  [selectedTask] variable from 
    // reducer file is equal to current task id
    const isSelected = taskReducer.selectedTask === data.id;


    const handleMarkFinished = () => {
        // first update this task data variable [isFinished] as true
        // then pass the data of this task  as parameter
        // so when we add the data to [completedTaskList] 
        // the data user marked as done is the data will be added to [completedTaskList]
        dispatch(markFinish(data.id));
        dispatch(moveToCompleted(data));

    }

    // input field when user is updating the task title
    const titleUpdateFiled = <input type="text" name="" value={data.title}
        className="w-full h-[3rem] border border-blue-500 rounded-[11px] box-border p-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateTask({ taskId: data.id, name: "title", value: e.target.value }))}
    />

    // input field when user is updating the task content
    const contentUpdateField = <textarea value={data.content}
        className="flex-1 p-2 rounded-[11px] border-blue-500 border"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(updateTask({ taskId: data.id, name: "content", value: e.target.value }));
        }}
    />


    return (
        <motion.div className='w-full min-h-[3rem] bg-white rounded-[11px] p-[10px_15px] mb-[.6rem] flex flex-col gap-2 overflow-hidden'
            layout
            initial={{
                opacity: 0,
            }}

            animate={{
                opacity: 1,
                height: isSelected ? "15rem" : "3rem"
            }}

            exit={{
                transform: "translateX(-100%)",
                opacity: 0,
            }}

            style={{
                boxShadow: `1px 1px 7px rgb(156, 163, 175, ${isSelected ? ".5" : ".0"})`
            }}
        >
            <div className="flex w-full justify-between">
                {/** this means when user is selected the task and updating it
                 *  we will show the input field for updating the task title
                 * mean is user is updating and this task is selected go change the element to a input 
                 * instead of p element
                 */}
                {isUpdate && isSelected ? titleUpdateFiled : <p className="font-semibold text-[1rem]">{data.title}</p>}
                <motion.div className="min-w-[2rem] h-[2rem] grid place-content-center"
                    animate={{
                        rotate: isSelected ? "90deg" : "0",
                        opacity: isUpdate ? 0 : 1,
                    }}
                    onClick={() => {
                        // if user is NOT UPDATING the task 
                        // means on viewing only
                        if (!isUpdate) {
                            // and this task is selected
                            // this will set the [selectedTask] from our reducer file to an empty string
                            // so the system knew NO task is currently selected
                            // else if the tile is not selected pass its id then update the [selectedTask] variable
                            if (isSelected) {
                                dispatch(viewTask(""))
                            } else {
                                dispatch(viewTask(data.id))
                            }
                        }
                    }}
                >
                    {/** if this tile is selected return the close icon then if not return the arrow icon */}
                    {isSelected ? <i className="ri-close-large-fill text-2xl text-red-400"
                    /> : <i className="ri-arrow-right-wide-fill text-2xl text-gray-300" />} </motion.div>
            </div>
            <AnimatePresence>
                {/** if the tile is selected show the task content  */}
                {isSelected && <motion.div className="flex flex-col pl-10 pr-[2rem] w-full h-full gap-2"
                    initial={{
                        opacity: 0,
                    }}

                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                >
                    {/** content */}
                    {/** if user is updating the task return the field for updating content data */}
                    {isUpdate ? contentUpdateField : <div className="flex-[1] overflow-y-auto w-full ">
                        <p className="text-gray-500">{data.content}</p>
                    </div>}

                    {/** buttons */}
                    <div className="w-full flex text-white gap-2 justify-end">
                        {/** this button is used for closing the updating mode and deleting the task from list */}
                        <button className="w-[6rem] h-[2.5rem] bg-red-500 rounded-[11px]"
                            onClick={() => {
                                // if [isUpdate] is true then set its value as false so the update mode will closed
                                if (isUpdate) {
                                    setIsUpdate(false);
                                } else {
                                    // then if user is not updating then perform a delete function
                                    // when this button is clicked
                                    dispatch(deleteTask(data.id))
                                }
                            }}
                        >{isUpdate ? <p>Close</p> : <p>Delete</p>}</button>
                        {/** show this buttons if user is not updating the task*/}
                        {!isUpdate && <motion.button layout className="w-[6rem] h-[2.5rem] bg-blue-500 rounded-[11px]"
                            onClick={() => setIsUpdate(true)}
                        >Update</motion.button >}
                        {!isUpdate && <button className="w-[6rem] h-[2.5rem] bg-blue-500 rounded-[11px]"
                            onClick={handleMarkFinished}
                        >Done</button>}
                    </div>
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    )
}

export default TaskTile
