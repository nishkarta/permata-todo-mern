import React, { useState } from 'react'
import { useLogout } from '../hooks/useLogout'
import { useTaskContext } from "../hooks/useTaskContext"
import TaskItem from './TaskItem'


const TaskList = ({ tasks, activeCategory, activeCategoryTitle, user }) => {
    const { dispatch: dispatchTask } = useTaskContext()
    const [title, setTitle] = useState('')
    const [error, setError] = useState(null)

    const task = { title, category_id: activeCategory }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.err)
        }

        if (response.ok) {
            setTitle('')
            setError(null)
            console.log('new task added')
            dispatchTask({ type: 'CREATE_TASK', payload: json })
        }
    }

    const { logout } = useLogout()


    const handleLogout = () => {
        logout()
    }
    return (
        <div className='task-lists'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h2 className='fw-bold'>
                    {activeCategoryTitle !== '' ? activeCategoryTitle : 'All Tasks'}
                </h2>

                <div>
                    {user && <span className='me-3'>Hello, {user.username}!</span>}

                    <button onClick={handleLogout} className='btn btn-outline-danger '>logout</button>
                </div>

            </div>
            {activeCategory !== '' && (
                <form className='w-100 mb-3' onSubmit={handleSubmit} >
                    <input
                        className='w-100 border-0 p-2'
                        style={{
                            background: '#eaeaea',
                            borderRadius: '8px'
                        }}
                        type="text"
                        value={title}
                        placeholder='Add a new task'
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </form>
            )}


            {tasks?.map(task => (
                <TaskItem
                    key={task._id}
                    task={task}
                    activeCategory={activeCategory}
                    user={user}
                />
            ))}

            {tasks?.length === 0 && (
                <div className='d-flex align-items-center justify-content-center' style={{
                    height: ' 400px',
                    fontSize: '30px',
                    color: '#aaa'

                }}>No task available</div>
            )}

            {error && <div className='error'>{error}</div>}
        </div>
    )
}

export default TaskList