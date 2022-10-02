import styles from './BoxTile.module.css';

const BoxTile = ({box})=>{
    const createdOn = new Date(Date.parse(box.createdAt));
    return (
        <div className={styles.boxTile}>
            <span className={styles.boxName}>{`[${box.name}]`}</span>
            {box.description}
            <div className={styles.boxMeta}>
                CREATED ON
                <div className={styles.adminList}>
                    <span>{createdOn.toLocaleDateString('in', {
                        year:'numeric',
                        month:'short',
                        day:'2-digit'})}
                    </span>
                </div>
            </div>
            <div className={styles.boxMeta}>
                ADMINS
                <div className={styles.adminList}>
                    {box.admins.map((element)=><span key={element.userId} style={{color:"#32de84"}}>{element.username}</span>)}
                </div>
            </div>
        </div>
    );
}

export default BoxTile;