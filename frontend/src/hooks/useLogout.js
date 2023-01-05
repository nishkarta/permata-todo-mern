import { useAuthContext } from "./useAuthContext";
import { useCategoryContext } from "./useCategoryContext";
import { useTaskContext } from "./useTaskContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchCategory } = useCategoryContext()
    const { dispatch: dispatchTask } = useTaskContext()
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');


        //dispatch logout action
        dispatch({
            type: 'LOGOUT'
        });
        dispatchCategory({
            type: 'SET_CATEGORIES',
            payload: null
        })
        dispatchTask({
            type: 'SET_TASKS',
            payload: null
        })
    }

    return { logout }
}