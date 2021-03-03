import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { Provider } from 'react-redux'
import MainPage from "./pages/main/MainPage";
import PaintPage from "./pages/paint/PaintPage";
import AlphabetPage from "./pages/alphabet/AlphabetPage";
import {NAVIGATION_URL} from "./__data__/constants";
import MainBackground from "./components/main-background/MainBackground";
import style from './App.module.css'
import LoadingIcon from "./components/loading-icon/LoadingIcon";
import {store} from "./__data__/store";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <MainBackground />
                <LoadingIcon />
                <div className={style.content}>
                    <Switch>
                        <Route path={NAVIGATION_URL.PAINT}>
                            <PaintPage/>
                        </Route>
                        <Route path={NAVIGATION_URL.ALPHABET}>
                            <AlphabetPage/>
                        </Route>
                        <Route path={NAVIGATION_URL.MAIN}>
                            <MainPage/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
