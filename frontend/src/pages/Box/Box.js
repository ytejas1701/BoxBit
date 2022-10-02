import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import BitTile from "../../components/BitTile";
import BoxTile from "../../components/BoxTile";
import { fetchBits } from "../../store/BitSlice";
import { fetchBoxByName } from "../../store/BoxSlice";
import CenterContent from "../../UI/CenterContent";
import FilterBar from "../../UI/FilterBar";
import Loader from "../../UI/Loader";

import styles from "./Box.module.css";

const Box = ()=>{
    const token = useSelector((state)=>state.Auth.token);
    const [query] = useSearchParams();
    const {name} = useParams();

    const [isLoading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const [box, setBox] = useState({
        name:"--/--",
        description:"--/--",
        admins:[{username:"--/--", userId:"--/--"}]
    });
    const [bits, setBits] = useState([]);

    useEffect(()=>{
        dispatch(fetchBoxByName({token, boxName:name})).unwrap().then((fetchedBox)=>{
            if(fetchedBox){
                dispatch(fetchBits({token, boxId:fetchedBox._id, filter:query.get("filter")})).unwrap().then(((fetchedBits)=>{
                    if(fetchedBits){
                        setBox(fetchedBox);
                        setBits(fetchedBits);
                        setLoading(false);
                    }else throw new Error();
                }))    
            }else throw new Error();
        }).catch(error=>{
            console.log(error);
        });
    },[token, name, query]);
    
    return (
        <CenterContent>
            {isLoading && <Loader/>}
            {!isLoading && <div className={styles.mainColumn}>
                <FilterBar option={query.get("filter")}/>
                {bits && bits.map((bit)=>{
                    return <BitTile key={bit._id} bit = {bit} isExpanded={false}/>
                })}
            </div>}
            {!isLoading && <div className={styles.sideColumn}>
                <BoxTile key={Math.random()}box={box}/>
            </div>}
        </CenterContent>
    );
}

export default Box;