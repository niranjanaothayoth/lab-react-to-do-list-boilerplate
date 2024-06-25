import React, { useState, useRef } from 'react'
import { useTodo } from '../contexts';

function TodoForm() {
    const [todo,setTodo] = useState("")
    const inputRef = useRef(null)

    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault()
        if(!todo) return
        

        addTodo({todo: todo, completed: false})
        setTodo("")
    }

    const makefocus = () => {
        inputRef.current.focus();
    }

    return (
        <form className="flex text-xl shadow-lg dark:shadow-[0_1px_2px_0_rgba(0,0,0,0.6),0_2px_6px_2px_rgba(0,0,0,0.302)] rounded-lg overflow-hidden" onSubmit={add}>
            <input
                type="text"
                placeholder="Take a note..."
                className="w-full border border-black/10 dark:border-[#5f6368] rounded-l-lg p-4 outline-none duration-150 bg-white/20 dark:bg-[#202124] "
                value={todo}
                ref={inputRef}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" onClick={makefocus} className="rounded-r-lg px-4 py-1 bg-green-600 dark:bg-[#bfdbfe] dark:hover:bg-[#a8cefc] dark:active:bg-[#bfdbfe] dark:text-black font-medium border border-l-0 border-green-600 dark:border-[#bfdbfe]  text-white shrink-0">
                <i class="fa-regular fa-square-plus"></i> Add 
            </button>
        </form>
    );
}

export default TodoForm;

