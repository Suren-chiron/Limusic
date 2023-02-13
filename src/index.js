import React from "react";
import { render } from "react-dom";
import App from "./containers/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import "swiper/css/bundle"
import 'swiper/css';
import "swiper/swiper-bundle.min.css";
import "swiper/css/pagination"
import "swiper/css/grid";

render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </ BrowserRouter>,
    document.getElementById('root')
)