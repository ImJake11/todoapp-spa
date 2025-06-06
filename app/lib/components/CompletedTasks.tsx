import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { toggleCompleteTaskTab } from "../redux/taskReducer";

const CompletedTasks = () => {

    const dispatch = useDispatch();

    const taskReducer = useSelector((state: RootState) => state.task);

    const list = taskReducer.completedTask;

    return (
        <motion.div className="h-full bg-gray-100 w-full p-6 flex flex-col items-center absolute lg:relative lg:w-[40vw] lg:p-3.5"
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
            {/** title */}
            <div className="w-full flex gap-1 text-3xl text-gray-800">
                <i className="ri-check-double-line"></i>
                <p className=" font-semibold">Completed</p>
                <div className="flex-1" />
                <i className="ri-close-circle-fill lg:hidden" onClick={() => dispatch(toggleCompleteTaskTab())}></i>
            </div>
            <div className="h-[1rem]" />
            <div className="flex-[1] flex flex-col w-full">
                {list.length === 0 ? <div className="w-full h-full grid place-content-center">
                    <p className="place-self-center">No completed task..</p>
                </div> : <AnimatePresence>
                    {list.map((data, i) => <TaskTile key={data.id} data={data} />)}
                </AnimatePresence>}
            </div>
        </motion.div>
    )
}


const TaskTile = ({ data }: { data: TaskModel }) => {
    return (
        <motion.div className="box-border overflow-hidden flex w-full h-fit rounded-[11px] bg-white p-[10px] gap-2.5 *:
        mb-[.5rem] "
            initial={{
                transform: "translateX(100%)",
                opacity: 0,
            }}
            animate={{
                transform: "translateX(0)",
                opacity: 1,
            }}
        >
            {/** check box */}
            <div className="grid place-content-center min-w-[1.5rem] h-[1.5rem] border border-b-gray-400 bg-green-500 rounded-[3px]">
                <i className="ri-check-line text-white"></i>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <p className="flex-1 text-[1rem]"><span className="font-semibold">TITLE:</span> {data.title}</p>
                <p className="flex-1 text-[1rem]"><span className="font-semibold">Content:</span> {data.content}</p>
            </div>

        </motion.div>
    )
}

export default CompletedTasks
