import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import BitTile from "../../components/BitTile";
import {fetchBitById} from "../../store/BitSlice";
import CommentBox from "../../components/CommentBox";
import CenterContent from "../../UI/CenterContent";
import FilterBar from "../../UI/FilterBar";
import styles from "./Bit.module.css";
import NewComment from "../../components/NewComment";
import Loader from "../../UI/Loader";

const Bit = ()=>{
    const {id} = useParams();
    const dispatch = useDispatch();
    const token = useSelector((state)=>state.Auth.token);
    const [bit, setBit] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        dispatch(fetchBitById({token, bitId:id})).unwrap().then((fetchedBit)=>{
            if(fetchedBit){
                setBit(fetchedBit);
                setLoading(false);
            }else throw new Error();
        }).catch((error)=>{
            console.log("error");
        })
    }, [token, id]);
    
    return (
        <CenterContent>
            {isLoading && <Loader/>}
            {!isLoading && <div className={styles.mainColumn}>
                <BitTile bit={bit} isExpanded={true}/>
                <NewComment 
                    bitId={id}
                    level={0}
                    parentId={null}/>
                <FilterBar/>
                <CommentBox/>
            </div>}
        </CenterContent>
    );
}

export default Bit;