import { Link } from 'react-router-dom';
import styles from './UserName.module.css';

const UserName = ({user})=>{
    return (
        <Link to={'/user/'+user.id} className={styles.userName}>
            {user.name}
        </Link>
    );
}

export default UserName;