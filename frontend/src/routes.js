import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import New from './pages/New/New'
import propiedad from './pages/Propiedad/propiedad'
import select from './pages/Select/select'


const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/new" component={New}/>
                <Route path="/propiedad" component={propiedad}/>
                <Route path="/select" component={select}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes