import { useEffect, useState } from 'react';
import styles from './Votes.module.css';

const Votes= ({numVotes, userVote, bitId, isExpanded, makeVote})=>{
    const [myVote, setMyVote] = useState(0);
    const [votes, setVotes] = useState(0);
    useEffect(()=>{
        setMyVote(userVote);
        setVotes(numVotes);
    },[numVotes,userVote]);
    return (
        <div className={`${styles.votes} ${isExpanded?styles.expanded:styles.condensed}`}>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 16 16"
                className={myVote===1 ? styles.selected : undefined}
                onClick={()=>{
                    if(myVote===1){
                        setMyVote(0);
                        makeVote(0);
                        setVotes(state=>state-1);
                    }
                    else if(myVote===0){
                        setMyVote(1);
                        makeVote(1);
                        setVotes(state=>state+1);
                    }else{
                        setMyVote(1);
                        makeVote(1);
                        setVotes(state=>state+2);
                    }
                }}>
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
            </svg>
            {votes}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 16 16"
                className={myVote===-1 ? styles.selected : undefined}
                onClick={()=>{
                    if(myVote===-1){
                        setMyVote(0);
                        makeVote(0);
                        setVotes(state=>state+1);
                    }
                    else if(myVote===0){
                        setMyVote(-1);
                        makeVote(-1);
                        setVotes(state=>state-1);
                    }else{
                        setMyVote(-1);
                        makeVote(-1);
                        setVotes(state=>state-2);
                    }
                }}>
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
        </div>
    );
}

export default Votes;