import styles from "./Comment.module.css";
import UserName from '../UI/UserName';
import Votes from "../UI/Votes";
import Timestamp from "../UI/timestamp";
import NewComment from "./NewComment";

import { useSelector } from "react-redux";
import { Fragment, useState } from "react";

const Comment = ({comment})=>{
    const [showForm, setShowForm] = useState(false);
    const username = useSelector((state=>state.Auth.username));
    const subComments = comment.subComments.map((subComment)=>(<Comment key={subComment._id} comment={subComment}/>))
    const spans = comment.body===undefined? [] : comment.body.split("~").map((element,index)=>{
        const lines = element.split("\n").map((line,index)=>{return <p key={index}>{line}</p>});
        if(index%2===0){
            return <span key={index}>{[...lines]}</span>
        }
        return <div key={index}className={styles.code}>{[...lines]}</div>
    });

    return (
        <div className={styles.comment}>
            <div className={styles.meta}>
                <UserName user={{id:'bvfr5678ijgt7',name:comment.username}}/>
                {comment.isSolution &&
                <svg xmlns="http://www.w3.org/2000/svg" fill="skyblue" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>}
                {comment.username===username &&
                <svg xmlns="http://www.w3.org/2000/svg" fill="#32de84" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>}
                <Timestamp time={comment.createdAt}/>
            </div>
            <div className={styles.body}>
                {[...spans]}
                <div className={`${styles.meta} ${styles.bottomBar}`}>
                    <Votes numVotes={comment.votes} bitId={comment.bitId}isExpanded={false}/>
                    {comment.level<2&&
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="#ccc" 
                        viewBox="0 0 16 16"
                        onClick={()=>{setShowForm(state=>state^1)}}>
                        <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg>}
                    {comment.username===username &&
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#ccc"
                            viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>}
                </div>
                {showForm
                    ?<NewComment 
                        bitId={comment.bitId}
                        level={comment.level+1}
                        parentId={comment._id}/>
                    :<Fragment/>}
                {subComments}
            </div>
        </div>
    );
}

export default Comment;