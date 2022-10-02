import styles from './User.module.css';

import CenterContent from "../../UI/CenterContent";
import UserTile from '../../components/UserTile';
import BitTile from '../../components/BitTile';

import FilterBar from "../../UI/FilterBar";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/UserSlice';
import { useParams, useSearchParams } from 'react-router-dom';
import Loader from '../../UI/Loader';
import { fetchBitsOfUser } from '../../store/BitSlice';

const User = ()=>{
    const token = useSelector((state)=>state.Auth.token);
    const [query] = useSearchParams();
    const {id} = useParams();

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        username:"--/--",
        _id:id,
    });
    const [bits, setBits] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        dispatch(fetchUser({token, userId:id})).unwrap().then(fetchedUser=>{
            if(fetchedUser){
                dispatch(fetchBitsOfUser({token, userId:id, filter:query.get("filter")})).unwrap().then(fetchedBits=>{
                    if(fetchedBits){
                        setUser(fetchedUser);
                        setBits(fetchedBits);
                        setLoading(false);
                    }
                })
            }
        });
    }, [token, id, query]);

    return (
        <CenterContent>
            {isLoading&&<Loader/>}
            {!isLoading&&<div className={styles.sideColumn}>
                <UserTile user={user}/>
            </div>}
            {!isLoading&&<div className={styles.mainColumn}>
                <FilterBar/>
                {bits && bits.map((bit)=>{
                    return <BitTile key={bit._id} bit = {bit} isExpanded={false}/>
                })}
            </div>}
        </CenterContent>
    );
}

export default User;