import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';


const initialData = {
    taskList: [] as TaskModel[],
    filteredTaskList: [] as TaskModel[],
    query: "", // user search
    isAddingTask: false,
    selectedTask: "", // to know what is the current task is selected by user
    completedTask: [] as TaskModel[],
    isCompletedTaskTabOpen: false, // the complete task tab is opened when screen is small
}


const taskReducer = createSlice({
    name: "task reducer",
    initialState: initialData,
    reducers: {
        searchTask: (state, actions: PayloadAction<string>) => {
            const query = actions.payload;

            state.query = query;

            // filters the taskList as its data base on the query text 
            // so I converted the task title and the query to lower case to avoid case sensitivity
            // so once each title from taskList contains query it will add to the filteredTaskList
            state.filteredTaskList = state.taskList.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
        },
        // this will open the prompt when adding task
        toggleTaskForm: (state) => {
            state.isAddingTask = !state.isAddingTask;
        },

        addTask: (state, acitons: PayloadAction<{ title: string, content: string }>) => {

            const { title, content } = acitons.payload;

            // this data will store in the taskList
            const newTask: TaskModel = {
                title: title,
                id: uuidv4(), // generated unique ids from library
                content: content,
                isFinished: false,
            }
            state.taskList.push(newTask);
        },

        deleteTask: (state, actions: PayloadAction<string>) => {
            const taskId = actions.payload;

            state.taskList = state.taskList.filter((task) => task.id !== taskId);
        },

        updateTask: (state, actions: PayloadAction<{
            taskId: string,
            name: string,
            value: string,
        }>) => {

            // get the variables from payload
            const { taskId, value, name } = actions.payload;

            const query = state.query;

            // remove update the task data based on id 
            state.taskList = state.taskList.map(task =>
                task.id === taskId ? { ...task, [name]: value } : task
            );


            // if query is not a empty string means user is on search mode
            // or the user is searching something
            // so when this query variable contians character system will update also the filteredTask list 
            // when the taskList is updated to ensure that data on filtered list is also updated
            if (query !== "") {
                state.filteredTaskList = state.taskList.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
            }

        },
        viewTask: (state, actions: PayloadAction<string>) => {
            state.selectedTask = actions.payload; // this payload is the id of the task user wants to view
        },
        // for marking the task as done
        markFinish: (state, actions: PayloadAction<string>) => {

            const taskId = actions.payload;

            state.taskList = state.taskList.map(task =>
                task.id === taskId ? { ...task, isFinished: true } : task
            );
        },

        // this will the data that is marked as done in the completedTask list
        moveToCompleted: (state, acitons: PayloadAction<TaskModel>) => {

            const data = acitons.payload;

            // add the data of  marked as finished task
            state.completedTask.push(data);
            //remove the task from tasklist or the main list 
            state.taskList = state.taskList.filter((task) => task.id != data.id);
        },
        toggleCompleteTaskTab: (state) => {
            state.isCompletedTaskTabOpen = !state.isCompletedTaskTabOpen;
        }
    },

});


export const { toggleCompleteTaskTab, searchTask, toggleTaskForm, moveToCompleted, addTask, viewTask, markFinish, deleteTask, updateTask } = taskReducer.actions;
export default taskReducer.reducer; 