import React, { useState } from "react"

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Cardsdata from "./CardData";
import "./style.css"
import {useDispatch } from 'react-redux';
import {ADD} from "../redux/action/action"

export default function Cards() {
    const [data, setData] = useState(Cardsdata);
    const dispatch = useDispatch();
    const send = (e)=>{
        console.log(e);
        dispatch(ADD(e))
      }
    return (
        <div className="container mt-3">
            <h2 className="text-center">Add to Cart Projects</h2>
            <div className="row d-flex justify-content-center align-items-center">
                {
                    data.map((element, id) => {
                        return (
                            <>
                                <Card style={{ width: '22rem',border:"none" }} className="mx-2 mt-4 card_style">  
                                        <img variant="top" src={element.imgdata} style={{height:"16rem"}} alt="" className="mt-3"/>
                                        <h1>{element.rname}</h1>
                                        <h3> Price : ₹ {element.price}</h3>
                                        <div className="button_div d-flex justify-content-center" >
                                        <Button variant="primary" 
                                        onClick={()=> send(element)}
                                        className='col-lg-12' style={{color:"red"}}>Add to Cart</Button>
                                        </div>
                                    
                                </Card>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}