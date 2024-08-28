import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BoxName from '../UI/BoxName';
import Timestamp from '../UI/timestamp';
import UserName from '../UI/UserName';
import Votes from '../UI/Votes';
import styles from './BitTile.module.css';

const BitTile = ({bit, isExpanded})=>{
    const user = useSelector(state=>state.Auth);
    const spans = bit.body===undefined? [] : bit.body.split("~").map((element,index)=>{
        const lines = element.split("\n").map((line,index)=>{return <p key={index}>{line}</p>});
        if(index%2===0){
            return <span key={index}>{[...lines]}</span>
        }
        return <div key={index}className={styles.code}>{[...lines]}</div>
    });
    const numVotes = bit.upVotes===undefined||bit.downVotes===undefined
        ?0
        :bit.upVotes.length - bit.downVotes.length;
    var userVote = 0
    if(bit.upVotes!==undefined&&bit.upVotes.includes(user.userId))userVote = 1;
    else if(bit.downVotes!==undefined&&bit.downVotes.includes(user.userId))userVote = -1;
    
    const vote = async (type)=>{
        const updatedUpVotes = bit.upVotes.filter(element=>element!==user.userId);
        const updatedDownVotes = bit.downVotes.filter(element=>element!==user.userId);
        if(type===1){updatedUpVotes.push(user.userId);}
        else if(type===-1){updatedDownVotes.push(user.userId);}
        const data = JSON.stringify({
            upVotes:updatedUpVotes,
            downVotes:updatedDownVotes,
        })
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+bit._id, {
            method: 'PATCH',
            headers:{
                'Authorization':'Bearer '+user.token,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        });
        const responseObject = await response.json();
        console.log(responseObject);
    }    

    return (
        <Link to={'/box/'+bit.boxName+'/bit/'+bit._id} className={`${styles.bitTile} ${isExpanded?styles.expanded:styles.condensed}`}>
            <Votes 
                numVotes={bit.votes} 
                userVote={userVote} 
                bitId={bit.id}
                makeVote ={vote}
                isExpanded={true}/>
            <div className={styles.mainContent}>
                <div className={styles.bitMeta}>
                    <BoxName boxName={bit.boxName}/>
                    <UserName user={{id:bit.userId,name:bit.username}}/>
                    <Timestamp time={bit.createdAt}/>
                </div>
                <div className={styles.bitTitle}>
                    {bit.title}
                </div>
                {isExpanded&&
                <div className={styles.body}>
                    {[...spans]}
                </div>}
                {!isExpanded&&
                <div className={styles.bitMeta}>
                    <div>
                        {bit.comments}
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="#ccc"
                            width="12"
                            height="12"
                            viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        </svg>
                    </div>
                </div>}
            </div>
            {!isExpanded&&
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#ccc"
                className={`${styles.star} ${bit.isSolved && styles.solved}`}
                viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>}
    </Link>
    );
}

export default BitTile;