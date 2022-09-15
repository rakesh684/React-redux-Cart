import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./component/Header"
import "./App.css"
import {Routes,Route} from "react-router-dom"
import Cards from "./component/Cards"
import { CardDetails } from "./component/CardDetails";

function App(props){
  
    return(
        <>
            <Header/>
            
            <Routes>
                <Route exact path="/" element={<Cards/>}/>
                <Route path="/cart/:id" element={<CardDetails/>}/>
            </Routes>
        </>
    )
}
export default App