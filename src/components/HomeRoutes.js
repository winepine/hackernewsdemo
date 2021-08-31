import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import HomePage from './HomePage';
import Post from './Post';
class HomeRoutes extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/posts/:id" component={Post}/>
                </BrowserRouter>
            </div>
        );
    }
}

export default HomeRoutes;