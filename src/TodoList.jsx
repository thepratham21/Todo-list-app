import React from 'react'
import { useState } from 'react'

const TodoList = () => {

    const [input, setInput] = useState('')
    const [todos, setTodos] = useState([])

    const handleAdd = () => {
        if (!input.trim()) return;
        
        const item = {
            id: Date.now(),
            text: input,
            completed: false
        }

        setTodos([...todos, item])
        setInput('')
    }

    const toggleCompleted = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <div className="min-h-screen bg-black py-12 px-4">
            <div className="max-w-md mx-auto bg-gray-900 border border-gray-800">
                <div className="border-b border-gray-800 py-6 px-6">
                    <h1 className="text-2xl font-light text-white tracking-wide">todo list</h1>
                </div>
                
                <div className="p-6">
                    <div className="flex gap-2 mb-8">
                        <input 
                            type="text"
                            placeholder="what needs to be done?"
                            value={input}
                            onChange={(e) => setInput(e.target.value)} 
                            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                            className="flex-1 px-3 py-2 text-sm bg-transparent border-b border-gray-700 focus:border-white outline-none transition-colors placeholder-gray-600 text-white"
                        />
                        <button 
                            onClick={handleAdd}
                            className="px-4 py-1 text-sm text-gray-400 border border-gray-700 hover:border-white hover:text-white transition-colors"
                        >
                            add
                        </button>
                    </div>

                    <ul className="space-y-1">
                        {todos.map((todo) => (
                            <li 
                                key={todo.id} 
                                className="flex items-center gap-3 py-3 px-2 border-b border-gray-800 last:border-0 group"
                            >
                                <input 
                                    type="checkbox" 
                                    checked={todo.completed} 
                                    onChange={() => toggleCompleted(todo.id)} 
                                    className="w-4 h-4 border-gray-700 bg-transparent text-white focus:ring-0 cursor-pointer"
                                />
                                <span className={`flex-1 text-sm text-gray-200 ${todo.completed ? 'line-through text-gray-600' : ''}`}>
                                    {todo.text}
                                </span>
                                <button 
                                    onClick={() => deleteTodo(todo.id)}
                                    className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 hover:text-white transition-all"
                                >
                                    delete
                                </button>
                            </li>
                        ))}
                    </ul>

                    {todos.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-sm text-gray-700 font-light">no tasks yet</p>
                        </div>
                    )}

                    {todos.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-800 text-right">
                            <span className="text-xs text-gray-600">
                                {todos.filter(t => t.completed).length} / {todos.length} done
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TodoList;