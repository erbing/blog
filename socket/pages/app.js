import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'

import store from './store'

import Index from './index/index.js'
import './assets/base.less'
// const APP = () => {
// }

ReactDom.render((
    <BrowserRouter>
        <Provider store={store}>
            <Index />
        </Provider>
    </BrowserRouter>
), document.getElementById('root'))