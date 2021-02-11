import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import PaintPage from "./pages/paint/PaintPage";
import AlphabetPage from "./pages/alphabet/AlphabetPage";
import {NAVIGATION_URL} from "./__data__/constants";
import MainBackground from "./components/main-background/MainBackground";

function App() {
    return (
        <Router>
            <MainBackground />
            <div>
                <p>Hello, world!</p>
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
    );
}

export default App;
