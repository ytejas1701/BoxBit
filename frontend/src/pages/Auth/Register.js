import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import styles from './Auth.module.css';
import { login } from '../../store/AuthSlice';
import Loader from '../../UI/Loader';

const Register = ()=>{
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [usernameValid, setUsernameValid] = useState(true);

    const [emailTag, setEmailTag] = useState("");
    const [passwordTag, setPasswordTag] = useState("");
    const [usernameTag, setUsernameTag] = useState("Please enter your username in Camel Case (userName, myUserName).")
    const [errorTag, setErrorTag] = useState("");

    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isValid = ()=>{
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredUsername = usernameRef.current.value;
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

        if(enteredUsername===undefined||enteredUsername===null||enteredUsername===""){
            setUsernameValid(false);
            setUsernameTag("You must provide a username.");
            ans = false;
        }else if(enteredUsername[0]!==enteredUsername[0].toLowerCase()){
            setUsernameValid(false);
            setUsernameTag("Please enter your username in Camel Case (userName, myUserName).");
            ans = false;
        }else{
            setUsernameValid(true);
            setUsernameTag("");
        }

        return ans;
    }


    const submitHandler = async(event)=>{
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredUsername = usernameRef.current.value;

        if(isValid()){
            setLoading(true);
            try{
                const data = JSON.stringify({
                    email:enteredEmail,
                    password:enteredPassword,
                    username:enteredUsername,
                });        
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/register', {
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
                    dispatch(login(responseObject.token));
                    setLoading(false);
                    setErrorTag("Successfully Authenticated!");
                    navigate("/");
                }
            }catch(error){
                console.log({error});
                setErrorTag("Something went wrong.");
                setLoading(false);
            }
        }
    }

    return(
        <div className={styles.mainContent}>
            <div className={styles.authCard}>
                <form onSubmit={submitHandler}>
                    <span className={styles.heading}>Signup</span>
                    <label>Email*</label>
                    <input
                        className={emailValid?"":styles.invalid} 
                        ref={emailRef}/>
                    <label className={styles.tag}>{emailTag}</label>
                    <label>Password*</label>
                    <input
                        className={passwordValid?"":styles.invalid}  
                        ref={passwordRef} type="password"/>
                    <label className={styles.tag}>{passwordTag}</label>
                    <label>Username*</label>
                    <input
                        className={usernameValid?"":styles.invalid}   
                        ref={usernameRef}/>
                    <label className={styles.tag}>{usernameTag}</label>
                    <label className={`${styles.tag} ${styles.error}`}>{errorTag}</label>
                    {isLoading
                    ?<Loader/>
                    :<button type='submit'>SIGNUP</button>}
                    <span className={styles.option}>
                        Already have an account? 
                        <Link to='/login'>
                        <span className={styles.textButton}> Login</span> 
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Register;