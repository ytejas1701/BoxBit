import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NewBit from "../components/NewBit";
import NewBox from "../components/NewBox";
import styles from "./Appbar.module.css";

const Appbar = ({showModal})=>{ 
    const user = useSelector(state=>state.Auth);
    const newBoxForm = (
        <form>
            <label>Choose a name for your Box</label>
            <input/>
            <label>Add some description</label>

            <textarea></textarea>
            <button>Submit</button>
        </form>);
    const newBitForm = (
        <form className="newBitForm">
            <label>Box</label>
            <input/>
            <label>Title</label>
            <input className="bitTitle"/>
            <label>Body</label>
            <textarea/>
            <button>Submit</button>
        </form>
    );

    return(
        <header className={styles.appbar}>
            <Link to={'/'} className={styles.logo}>
                BoxBit
            </Link>
            <div className={styles.searchBox}>
                <input/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </div>
            <div className={styles.icons}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 16 16"
                    onClick={()=>{showModal({title:"Post a Bit",content:<NewBit/>})}}>
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                </svg>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 16 16"
                    onClick={()=>{showModal({title:"Create a Box",content:<NewBox/>})}}>
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                </svg>
                {/* <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                </svg> */}
                <Link to={'/user/'+user.userId} className={styles.username}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    {user.username}
                </Link>
            </div>
        </header>
    );
}

export default Appbar;