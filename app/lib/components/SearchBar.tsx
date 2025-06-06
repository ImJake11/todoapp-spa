"use client";

import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useDispatch } from "react-redux";
import { searchTask } from "../redux/taskReducer";


export default function SearchBar() {

    const dispatch = useDispatch();
    const [query, setQuery] = useState(""); // this the value type by the users

    const isSearching = query !== ""; // means if the query is not empty use is searching tasks so it will return true

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setQuery(value);
    }

    // handles callaback for searching task
    useEffect(() => {

        // so this function will reset everytime user updates the query variables data
        // my purpose for this is to avoid multiple api calls for future purposes
        const timeout = setTimeout(() => {
            // so this function will call when the 700 ms is done
            dispatch(searchTask(query));
        }, 700);

        return () => {
            clearTimeout(timeout);
        }

    }, [query]);

    return (
        <div className="w-full h-[3rem] relative">
            {/** input */}
            <input type="text" name="query"
                className="w-full h-full border border-[var(--primary)] rounded-[11px] box-border p-2.5"
                placeholder="Search"
                value={query}
                onChange={handleText}
            />
            {/** search icon and remove search icon */}
            <i className={`${isSearching ? "ri-close-large-fill" : "ri-search-2-line"} text-2xl absolute top-1/2 right-1.5 text-[var(--primary)] -translate-y-1/2`}
                onClick={() => {
                    // if user is search and it clicks this icon
                    // it will reset the query of the user to an empty array
                    if (isSearching) {
                        setQuery("");
                    }
                }}
            ></i>

        </div>
    )
}