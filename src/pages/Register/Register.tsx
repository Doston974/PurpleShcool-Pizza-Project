import { Link, useNavigate } from 'react-router-dom';
import styles from '../Login/Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';
import Headling from '../../components/headling/Headling';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    };
}

export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());
        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, name } = target;
        dispatch(register({ email: email.value, password: password.value, name: name.value }));
    };

    return <div className={styles['login']}>
        <Headling>Ro'yxatdan o'tish</Headling>
        {registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
        <form className={styles['form']} onSubmit={submit}>
            <div className={styles['field']}>
                <label htmlFor="email">Emailingiz</label>
                <Input id="email" name='email' placeholder='Email' />
            </div>
            <div className={styles['field']}>
                <label htmlFor="password">Parolingiz</label>
                <Input id="password" name='password' type="password" placeholder='Пароль' />
            </div>
            <div className={styles['field']}>
                <label htmlFor="name">Ismingiz</label>
                <Input id="name" name='name' placeholder='Имя' />
            </div>
            <Button appearence="big">Ro'yxatdan o'tish</Button>
        </form>
        <div className={styles['links']}>
            <div>Akount bormi?</div>
            <Link to="/auth/login">Kirish</Link>
        </div>
    </div>;
}