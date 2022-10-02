import styles from './timestamp.module.css';

const Timestamp = ({time})=>{
    const now = new Date();
    const createdOn = new Date(Date.parse(time));
    const difYear = now.getUTCFullYear()-createdOn.getUTCFullYear();
    const difMonth = now.getUTCMonth()-createdOn.getUTCMonth();
    const difDay = now.getUTCDate()-createdOn.getUTCDate();
    const difHour = now.getUTCHours()-createdOn.getUTCHours();
    const difMin = now.getUTCMinutes()-createdOn.getUTCMinutes();
    var dif;
    if(!difYear){
        if(!difMonth){
            if(!difDay){
                if(!difHour){
                    dif = difMin.toString()+" minutes ago";
                }else{
                    dif = difHour.toString()+" hours ago";
                }
            }else{
                dif = difDay.toString()+" days ago";
            }
        }else{
            dif = difMonth.toString()+" months ago";
        }
    }else{
        dif = difYear.toString()+" years ago";
    }
    return(
        <span className={styles.timestamp}>
            {dif}
        </span>
    );
}

export default Timestamp;