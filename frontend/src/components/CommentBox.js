import styles from "./CommentBox.module.css";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchComments } from "../store/CommentSlice";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

const CommentBox = ()=>{
    const token = useSelector(state=>state.Auth.token);
    const params = useParams();
    const [query] = useSearchParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchComments({token, bitId:params.id, filter:query.get("filter")}));
    },[query]);
    const comments = useSelector((state)=>state.Comment.comments);
    const commentsC = [];
    const commentsB = [];
    const commentsA = [];
    comments.forEach((comment)=>{
        if(comment.level===0){commentsA.push({...comment, subComments:[]})}
        if(comment.level===1){commentsB.push({...comment, subComments:[]})}
        if(comment.level===2){commentsC.push({...comment, subComments:[]})}
    });
    commentsC.forEach((commentC)=>{
        const index = commentsB.findIndex((commentB)=>commentB._id===commentC.parentId);
        commentsB[index].subComments.push(commentC);
    });
    commentsB.forEach((commentB)=>{
        const index = commentsA.findIndex((commentA)=>commentA._id===commentB.parentId);
        commentsA[index].subComments.push(commentB);
    });
    return (
        <div className={styles.commentBox}>
            {commentsA.map((comment)=><Comment key={comment._id} comment={comment}/>)}
        </div>
    );
}

export default CommentBox;