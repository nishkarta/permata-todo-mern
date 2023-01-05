import { useEffect, useState } from "react"
import { useTaskContext } from "../hooks/useTaskContext"

const TaskItem = ({ task, activeCategory, user }) => {
    const { dispatch: dispatchTask } = useTaskContext()
    const [category, setCategory] = useState('')
    const [isChecked, setIsChecked] = useState(!task.is_active)

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await fetch('/api/categories/' + task.category_id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setCategory(json)
            }
            if (!response.ok) {
                setCategory({ title: 'deleted' })
            }
        }
        fetchCategory()
    }, [task.category_id, user.token])

    const editedTask = { is_active: isChecked }

    const handleCheck = async () => {
        setIsChecked(!isChecked)

        const response = await fetch(`/api/tasks/${task._id}`, {
            method: 'PATCH',
            body: JSON.stringify(editedTask),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            console.log(json.err)
        }

        if (response.ok) {
            console.log('task updated')
        }

    }

    const handleDelete = async () => {
        const response = await fetch(`/api/tasks/${task._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {


            dispatchTask({ type: 'DELETE_TASK', payload: json })
        }
    }

    return (
        <div className={`task-item`} style={{ cursor: 'pointer' }}>
            <div className="d-flex">
                <input type="checkbox"
                    style={{
                        width: '20px', height: '20px',
                    }} className="me-3" checked={isChecked} onChange={handleCheck} />
            </div>

            <div className={`me-3 d-flex align-items-center flex-grow-1 `}>
                <div className={`task-title me-3 ${isChecked ? "done" : "todo"}`}>{task.title}</div>

                {activeCategory === '' && (
                    <div className="category-label rounded-pill" style={{
                        backgroundColor: 'pink'
                    }}>{category ? category.title : 'category'}</div>
                )}
            </div>
            <div className="">
                <span className="material-symbols-outlined delete" onClick={handleDelete}>delete</span>
            </div>



        </div>

    )
}

export default TaskItem