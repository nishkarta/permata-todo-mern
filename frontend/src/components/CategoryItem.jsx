import { useCategoryContext } from "../hooks/useCategoryContext"
import { useTaskContext } from "../hooks/useTaskContext"

const CategoryItem = ({ category, activeCategory, setActiveCategory, setActiveCategoryTitle, user }) => {
    const { dispatch: dispatchCategory } = useCategoryContext()
    const { dispatch: dispatchTask } = useTaskContext()

    const handleDeleteCategory = async () => {
        const response = await fetch(`/api/categories/${category._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            if (activeCategory === category._id) {
                setActiveCategory('')
                setActiveCategoryTitle('')

            }

            dispatchCategory({ type: 'DELETE_CATEGORY', payload: json })
        }
    }
    const handleDeleteTasks = async () => {
        const response = await fetch(`/api/tasks/category/${category._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatchTask({ type: 'DELETE_TASKS_BY_CATEGORY', payload: json })
        }
    }

    const handleDelete = () => {
        handleDeleteTasks()
        handleDeleteCategory()
    }
    return (
        <div className={`category-item  ${activeCategory === category._id && "sidebar-active"}`}>


            <div onClick={() => {
                setActiveCategory(category._id)
                setActiveCategoryTitle(category.title)

            }} >{category.title}</div>
            <div>
                <span className="delete material-symbols-outlined" onClick={handleDelete}>delete</span>
            </div>

        </div>

    )
}

export default CategoryItem