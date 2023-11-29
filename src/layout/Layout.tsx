import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import styles from "./Layout.module.css"
import Button from '../components/button/Button';
import cn from "classnames"
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '../store/store';
import { userActions } from '../store/user.slice';


const Layout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const logout = () => {
        dispatch(userActions.logout())
        navigate("/auth/login")
    }

    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['user']}>
                    <img src='/avatar.png' alt='' />
                    <div className={styles['name']}>
                        Doston Begmatov
                    </div>
                    <div className={styles['email']}>
                        dostonbegmatov1994@gmail.com
                    </div>
                </div>
                <div className={styles['menu']}>
                    <NavLink
                        to='/'
                        className={({ isActive }) => cn(styles['link'], {
                            [styles.active]: isActive
                        })}>
                        <img src="/menu-icon.svg" />
                        Menu
                    </NavLink>
                    <NavLink
                        to='/cart'
                        className={({ isActive }) => cn(styles['link'], {
                            [styles.active]: isActive
                        })}>
                        <img src="/cart-icon.svg" />
                        Cart

                    </NavLink>
                </div>
                <Button className={styles['exit']} onClick={logout}>
                    <img src='/exit-icon.svg' alt="" />
                    Chiqish
                </Button>
            </div>
            <div className={styles['content']}>
                <Outlet />
            </div>
        </div >
    )
}

export default Layout