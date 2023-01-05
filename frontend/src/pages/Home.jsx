import SideBar from "../components/SideBar"
import { useEffect, useState } from "react"
import TaskList from "../components/TaskList"
import { useCategoryContext } from "../hooks/useCategoryContext"
import { useTaskContext } from "../hooks/useTaskContext"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
    const { categories, dispatch: dispatchCategory } = useCategoryContext()
    const { tasks, dispatch: dispatchTask } = useTaskContext()

    const { user } = useAuthContext()

    const [activeCategory, setActiveCategory] = useState('')
    const [activeCategoryTitle, setActiveCategoryTitle] = useState('')


    useEffect(() => {
        const fetchCategories = async () => {

            const response = await fetch('/api/categories', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatchCategory({ type: 'SET_CATEGORIES', payload: json })
            }
        }

        const fetchTasks = async () => {

            try {
                if (!activeCategory) {
                    const response = await fetch('/api/tasks', {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                    const json = await response.json()

                    if (response.ok) {
                        dispatchTask({ type: 'SET_TASKS', payload: json })
                    }
                }

                if (activeCategory) {
                    const response = await fetch('/api/tasks/category/' + activeCategory, {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                    const json = await response.json()

                    if (response.ok) {
                        dispatchTask({ type: 'SET_TASKS', payload: json })
                    }
                }

            } catch (err) {
                console.log(err)
            }

        }
        if (user) {
            fetchCategories()
            fetchTasks()
        }

    }, [activeCategory, dispatchTask, dispatchCategory, user])




    return (
        <div className="home-container">
            <SideBar
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                setActiveCategoryTitle={setActiveCategoryTitle}
                user={user}
            />
            <div className="tasks-container">
                <TaskList tasks={tasks}
                    activeCategory={activeCategory}
                    activeCategoryTitle={activeCategoryTitle}
                    user={user}
                />
            </div>

        </div>
    )
}
export default Home