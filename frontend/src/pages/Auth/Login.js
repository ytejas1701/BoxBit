import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Loader from "../../UI/Loader";

import styles from './Auth.module.css';
import { login } from '../../store/AuthSlice';

const Login = ()=>{
    const emailRef = useRef();
    const passwordRef = useRef();

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const [emailTag, setEmailTag] = useState("");
    const [passwordTag, setPasswordTag] = useState("");
    const [errorTag, setErrorTag] = useState("");

    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isValid = ()=>{
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        var ans = true;
        if(enteredEmail===undefined||enteredEmail===null||enteredEmail===""){
            setEmailValid(false);
            setEmailTag("You must provide an email.");
            ans = false;
        }else{
            setEmailValid(true);
            setEmailTag("");
        }

        if(enteredPassword===undefined||enteredPassword===null||enteredPassword===""){
            setPasswordValid(false);
            setPasswordTag("You must provide a password.");
            ans = false;
        }else{
            setPasswordValid(true);
            setPasswordTag("");
        }
        return ans;
    }

    const submitHandler = async(event)=>{
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        if(isValid()){
            setLoading(true);
            try{
                const data = JSON.stringify({
                    email:enteredEmail,
                    password:enteredPassword,
                });        
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/login', {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:data,
                });
                if(!response.ok){
                    throw new Error();
                }else{
                    const responseObject = await response.json();
                    dispatch(login(responseObject));
                    setLoading(false);
                    setErrorTag("Successfully Authenticated!");
                    navigate("/");
                }
            }catch(error){
                console.log({error});
                setLoading(false);
                setErrorTag("Something went wrong.")
            }
        }
    }

    return(
        <div className={styles.mainContent}>
            <div className={styles.authCard}>
                <form onSubmit={submitHandler}>
                    <span className={styles.heading}>Login</span>
                    <label>Email*</label>
                    <input
                        className={!emailValid?styles.invalid:""}
                        ref={emailRef}/>
                    <label className={styles.tag}>{emailTag}</label>
                    <label>Password*</label>
                    <input
                        className={!passwordValid?styles.invalid:""} 
                        ref={passwordRef} 
                        type="password"/>
                    <label className={styles.tag}>{passwordTag}</label>
                    <label className={`${styles.tag} ${styles.error}`}>{errorTag}</label>
                    {isLoading
                    ?<Loader/>
                    :<button>LOGIN</button>}
                    <span className={styles.option}>
                        New to BoxBit?
                        <Link to='/register'>
                            <span className={styles.textButton}> Signup</span> 
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;