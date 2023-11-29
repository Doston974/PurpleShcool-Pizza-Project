import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'
import Headling from '../../components/headling/Headling'
import Input from '../../components/input/Input'
import styles from './Login.module.css'
import { FormEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from '../../store/store'
import { login } from '../../store/user.slice'
import { useSelector } from 'react-redux';

export type LoginFormProps = {
    email: {
        value: string
    };
    password: {
        value: string
    }
}

const Login = () => {

    const [error, setError] = useState<string | null>()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const jwt = useSelector((s: RootState) => s.user.jwt)

    useEffect(() => {
        if (jwt) {
            navigate('/')
        }
    }, [jwt, navigate])

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        const target = e.target as typeof e.target & LoginFormProps;
        const { email, password } = target
        await sendLogin(email.value, password.value)
    }

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }))

        // try {
        //     const { data } = await axios.post<LoginResponseProps>(`${API_URL}/auth/login`, {
        //         email,
        //         password
        //     })
        //     dispatch(userActions.addJwt(data.access_token))
        //     navigate("/")
        // } catch (e) {
        //     if (e instanceof AxiosError) {
        //         setError(e.response?.data.message)
        //     }
        // }
    }

    return (
        <div className={styles['login']}>
            <Headling>Kirish</Headling>
            {error && <div className={styles['error']}>{error}</div>}
            <form
                className={styles['form']}
                onSubmit={submit}>
                <div className={styles['field']}>
                    <label
                        htmlFor='email'>
                        Emailingiz
                    </label>
                    <Input
                        placeholder='Email'
                        id='email'
                    />
                </div>
                <div className={styles['field']}>
                    <label
                        htmlFor='password'>
                        Parolingiz
                    </label>
                    <Input
                        placeholder='parol'
                        name='password'
                        id='password'
                        type="password"
                    />
                </div>
                <Button appearence='big'>Kirish</Button>
                <div className={styles['links']}>
                    <div>Akountingiz yo'qmi?</div>
                    <Link to='/auth/register'>
                        Ro'yxatdan o'tish
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login