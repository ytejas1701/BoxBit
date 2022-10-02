import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBit } from "../store/BitSlice";
import { fetchBoxByName } from "../store/BoxSlice";

const NewBit = ({hideModal, changeLoadState})=>{
    const user = useSelector(state=>state.Auth);
    const dispatch = useDispatch();

    const boxNameRef = useRef(null);
    const titleRef = useRef(null);
    const bodyRef = useRef(null);

    const [boxNameValid, setBoxNameValid] = useState(true);
    const [titleValid, setTileValid] = useState(true);
    const [bodyValid, setBodyValid] = useState(true);

    const [boxNameTag, setBoxNameTag] = useState("");
    const [titleTag, setTileTag] = useState("Please ensure that you are not posting a duplicate.");
    const [bodyTag, setBodyTag] = useState("");

    const [boxId, setBoxId] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const checkBoxName = (boxName)=>{
        dispatch(fetchBoxByName({token:user.token, boxName})).unwrap().then((fetchedBox)=>{
            setBoxId(fetchedBox._id);
            setBoxNameTag("Found it!");
            setBoxNameValid(true);
        }).catch(error=>{
            setBoxId("");
            setBoxNameTag("This Box does not exist.");
            setBoxNameValid(false);
        })
    }

    const submitHandler = (event)=>{
        event.preventDefault();
        const boxName = boxNameRef.current.value;
        const title = titleRef.current.value;
        const body = bodyRef.current.value;
        if(title===undefined||title===null||title===""){
            setTileTag("You must provide a title.");
            setTileValid(false);
            return;
        }
        setTileTag("");
        setTileValid(true);
        const newBit = JSON.stringify({
            boxName,
            boxId,
            title,
            body,
            username:user.username,
            userId:user.userId,
        });
        changeLoadState(true);
        setErrorMessage("");
        dispatch(createBit({token:user.token, data:newBit})).unwrap().then(()=>{
                hideModal();
            }
        ).catch(error=>{
            setErrorMessage("Something went wrong. Please try again.")
            changeLoadState(false);
        });
    }

    return (
        <form className="newBitForm" onSubmit={submitHandler}>
            <label>Box*</label>
            <div className={`boxNameSearch ${boxId===""?"":"found"}`}>
                <input
                    className={!boxNameValid&&"invalid"}
                    ref={boxNameRef}
                    disabled={boxId!==""}/>
                    {boxId===""
                    ?<svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 16 16"
                        onClick={(e)=>{
                            e.preventDefault();
                            const boxName = boxNameRef.current.value;
                            if(boxName===undefined||boxName===null||boxName===""){
                                setBoxNameTag("You must provide a name for the Box.");
                                setBoxNameValid(false);
                            }else{
                                checkBoxName(boxName);
                            }
                        }}>
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    :<svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>}
            </div>
            <label className="tag">{boxNameTag}</label>
            <label>Title*</label>
            <input
                className={`bitTitle ${!titleValid&&"invalid"}`}
                ref={titleRef}/>
            <label className="tag">{titleTag}</label>
            <label>Body</label>
                <textarea
                    className={!bodyValid&&"invalid"}
                    ref={bodyRef}/>
                <div className="actions">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                    </svg>
                </div>
            <label className="tag">{bodyTag}</label>
            <button 
                disabled={boxId===""} 
                type="submit">
                POST
            </button>
            <label className="error">{errorMessage}</label>
        </form>
    );
}


export default NewBit;