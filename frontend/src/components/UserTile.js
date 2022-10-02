import { useDispatch } from 'react-redux';
import styles from './UserTile.module.css';

const UserTile = ({user})=>{
    return (
        <div className={styles.userTile}>
            <div className={styles.username}>
                {user.username}
            </div>
            <div className={styles.field}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={styles.answer} 
                    viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
                <span>{user.answers + " answers"}</span>
            </div>
            <div className={styles.field}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={styles.upvote} 
                    viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                </svg>
                <span>{user.upvotes + " upvotes"}</span>
            </div>
            <div className={styles.field}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.star} 
                    viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <span>{user.stars + " stars"}</span>
            </div>
            <div className={styles.field}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.date} 
                    viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
                <span>12/09/2022</span>
            </div>
            {/* <button>LOGOUT</button> */}

        </div>
    );
}

export default UserTile;