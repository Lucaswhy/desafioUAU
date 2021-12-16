import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './template/component/Home'
import Signup from './template/component/Signup'
import Signin from './template/component/Signin'
import Me from './template/component/Me'

function myRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/me" element={<Me/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default myRoutes; 