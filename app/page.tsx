"use client";

import "remixicon/fonts/remixicon.css";
import SearchBar from "./lib/components/SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "./lib/redux/store";
import TaskTile from "./lib/components/TaskTile";
import AddTaskForm from "./lib/components/AddTaskField";
import { toggleTaskForm } from "./lib/redux/taskReducer";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import CompletedTasks from "./lib/components/CompletedTasks";
import { useEffect, useState } from "react";
import CompleteTaskButton from "./lib/components/CompleteTaskButton";

export default function Home() {

  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState<number>(0);

  const taskReducer = useSelector((state: RootState) => state.task);

  const { filteredTaskList, taskList, query } = taskReducer;

  // if the query from taskReducer is empty means return or use the taskList or my main list where data are store
  // then if this is not empty use the filteredTaskList where returns the data where each title contains character or word form query
  const list = query === "" ? taskList : filteredTaskList;

  // return true if the list length is zero
  const isEmpty = list.length === 0;


  const isFormOpen = taskReducer.isAddingTask;



  // monitors the window size for responsiveness purposes
  useEffect(() => {

    const handleSize = () => {
      setWindowWidth(window.innerWidth);
    }

    handleSize();

    window.addEventListener("resize", handleSize);


    return () => window.removeEventListener("resize", handleSize);

  }, []);


  return (
    <div className="relative w-screen h-screen bg-gray-100 overflow-hidden flex">
      {/** current task */}
      <div className="w-full h-screen p-2.5 flex flex-col gap-3.5 lg:w-[60vw]">
        {/** title */}
        <div className="w-full flex gap-1 text-3xl text-gray-800">
          <i className="ri-home-smile-2-fill "></i>
          <p className=" font-semibold">Task</p>
          <div className="flex-1" />
          <CompleteTaskButton />
        </div>
        <SearchBar />
        {/** task list */}
        <div className="flex-[1] flex flex-col overflow-hidden">
          <div className="h-[1rem]" />
          {
            isEmpty ? <div className="grid w-full h-full">
              <span className="place-self-center">
                No current tasks
              </span>
            </div> :
              <ul className="overflow-y-auto overflow-x-hidden"><AnimatePresence>
                {[...list].map((data, i) => <TaskTile key={data.id} data={data} />)}
              </AnimatePresence>
              </ul>}
        </div>
      </div>
      {/**  responsive completed task tab*/}
      <AnimatePresence>
        {(windowWidth >= 1024 || taskReducer.isCompletedTaskTabOpen) && <CompletedTasks />}
      </AnimatePresence>
      <AddTaskForm />
      {/** add task button and new task input*/}
      <AnimatePresence>
        {!isFormOpen && <motion.button className="absolute bottom-2.5 right-2.5 bg-[var(--primary)] w-[6rem] h-[3rem] rounded-[11px] text-white"
          style={{
            boxShadow: "1px 1px 20px rgba(55, 65, 81, .5)"
          }}

          initial={{
            transform: "translateX(200px)"
          }}

          animate={{
            transform: "translateX(0)"
          }}

          exit={{
            transform: "translateX(200px)"
          }}

          onClick={() => dispatch(toggleTaskForm())}
        >
          Add task
        </motion.button>}
      </AnimatePresence>



    </div>
  )
}
