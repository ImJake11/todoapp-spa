import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, toggleTaskForm } from "../redux/taskReducer";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const AddTaskForm = () => {

    const dispatch = useDispatch();

    const isFormOpen = useSelector((state: RootState) => state.task.isAddingTask);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    // this variable return true if the title is not empty as my validation wen adding task
    const isValid: boolean = title !== "";


    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }


    const handleSave = () => {

        // check first is user input a title
        // so it user has then go proceed to perform other functions
        if (isValid) {
            //add the new data to task list
            dispatch(addTask({
                content: content,
                title: title,
            }));
            // toggle off the form
            dispatch(toggleTaskForm());
            // reset field value to default
            setContent("");
            setTitle("");
        }
    }

    return (
        <AnimatePresence>
            {isFormOpen && <motion.div className='absolute grid place-content-center h-screen w-full gap-1.5 items-end'
                initial={{
                    opacity: 0,
                }}

                animate={{
                    opacity: 1,
                }}

                exit={{
                    opacity: 0,
                    transform: "translateY100%)"
                }}
                style={{
                    backgroundColor: "rgb(107, 114, 128, .5)"
                }}
            >

                <div className="w-[80vw] h-[60vh] p-5  rounded-2xl bg-white flex flex-col gap-2.5 md:w-[40vw]">
                    <p className="text-2xl text-gray-800">Create task</p>
                    <div className="h-[.2rem]" />
                    <input type="text" maxLength={100} className="w-full border border-blue-500 rounded-[11px] h-[3.5rem] p-2.5"
                        placeholder="Enter Title"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                    {/** input content*/}
                    <textarea name="body"
                        placeholder="New task"
                        value={content}
                        maxLength={200}
                        className="flex-[1] border border-[var(--primary)] w-full p-2 rounded-[11px]"
                        onChange={handleInput}
                    ></textarea>
                    {/** buttons */}
                    <div className="flex w-full gap-1.5 justify-end">
                        <button className="w-[6rem] h-[3rem]  text-gray-600 rounded-[11px] border border-b-gray-600"
                            onClick={() => dispatch(toggleTaskForm())}
                        >Cancel</button>
                        <button className="w-[6rem] h-[3rem] bg-[var(--primary)] text-white rounded-[11px]"
                            onClick={handleSave}
                        >Save</button>
                    </div>

                </div>
            </motion.div>}
        </AnimatePresence>
    )
}

export default AddTaskForm;
