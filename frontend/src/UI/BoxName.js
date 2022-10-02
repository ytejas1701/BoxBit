import styles from './BoxName.module.css';

import { Link } from 'react-router-dom';


const BoxName = ({boxName})=>{
    return(
        <Link to={'/box/'+boxName} className={styles.boxName}>
            {'['+boxName+']'}
        </Link>
    );
}

export default BoxName;