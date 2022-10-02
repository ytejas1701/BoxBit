import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBox } from "../store/BoxSlice";

const NewBox = ({hideModal, changeLoadState})=>{
    const user = useSelector(state=>state.Auth);
    const dispatch = useDispatch();

    const boxNameRef = useRef(null);
    const descriptitonRef = useRef(null);

    const [boxNameValid, setBoxNameValid] = useState(true); 
    const [descriptionValid, setDescriptionValid] = useState(true);

    const [boxNameTag, setBoxNameTag] = useState("Name your Box in Pascal Case (BoxName, Boxname, MyBoxName)."); 
    const [descriptionTag, setDescriptionTag] = useState(null);
    
    const [errorMessage, setErrorMessage] = useState("");
    
    const isValid = ()=>{
        var ans = true;
        const name = boxNameRef.current.value;
        const description = descriptitonRef.current.value;
        if(name===undefined||name===null||name===""||name.includes(" ")){
            ans = false;
            setBoxNameTag("You must provide a name.");
            setBoxNameValid(false);
        }else if(name[0].toUpperCase()!==name[0]){
            ans = false;
            setBoxNameTag("Name your Box in Pascal Case (BoxName, Boxname, MyBoxName).");
            setBoxNameValid(false);
        }else {
            setBoxNameTag("");
            setBoxNameValid(true);
        }
        if(description===undefined||description===null||description===""){
            ans = false;
            setDescriptionTag("You must provide a description.");
            setDescriptionValid(false);
        }else {
            setDescriptionTag("");
            setDescriptionValid(true);
        }
        return ans;
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        const name = boxNameRef.current.value;
        const description = descriptitonRef.current.value;
        if(isValid()){
            const newBox = JSON.stringify({
                name,
                description,
                admins:[{
                    userId:user.userId,
                    username:user.username
                }]
            })
            changeLoadState(true);
            setErrorMessage("");
            dispatch(createBox({token:user.token, data:newBox})).unwrap().then((gffg)=>{
                console.log(gffg);    
                hideModal();
                }).catch(()=>{
                    changeLoadState(false);
                    setErrorMessage("Something went wrong. Please try again.")
                });
        }
    }
    return (
        <form className="newBitForm" onSubmit={submitHandler}>
            <label>Give a name to your Box*</label>
            <input
                className={!boxNameValid&&"invalid"}
                ref={boxNameRef}/>
            <label className="tag">{boxNameTag}</label>
            <label>Add a description*</label>
            <textarea
                className={!descriptionValid&&"invalid"} 
                ref={descriptitonRef}/>
            <label className="tag">{descriptionTag}</label>
            <button type="submit">CREATE</button>
            <label className="error">{errorMessage}</label>
        </form>
    );
}


export default NewBox;