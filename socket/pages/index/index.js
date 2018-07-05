import React from 'react'
import { connect } from 'react-redux'

import io from 'socket.io-client';

// var fs = require('fs')

var socket = io('http://127.0.0.1:3000/')

socket.on('hello', function(data) {
    console.log(data)
})

import './index.less'
const avators = require('./images/qq1.png')

const Index = (props) => {
    return (
        <div>
            <div className="main">
                <div className="header">
                    <div className="header-left flex-y">
                        <div className="dots">
                            <ul>
                                <li className="li li1"></li>
                                <li className="li li2"></li>
                                <li className="li li3"></li>
                            </ul>
                        </div>

                        <div className="search"></div>
                    </div>

                    <div className="header-right flex-y">
                        <img src={avators} className="header-img" />
                        <div className="header-close"></div>
                    </div>
                </div>
                <div className="content">
                    <div className="slide">
                        <ul>
                            <li className="lis flex-y">
                                <div className="avator">
                                    <img src={avators} className="avator-img" />
                                </div>
                                <div className="lis-right">
                                    <div className="title">众安深圳屌丝群...</div>
                                    <div className="desc">村长：你是真的皮</div>
                                </div>
                            </li>
                            <li className="lis lis-active flex-y">
                                <div className="avator">
                                    <img src={avators} className="avator-img" />
                                </div>
                                <div className="lis-right">
                                    <div className="title">中洲小分队..</div>
                                    <div className="desc">船长：jio抬一下。。。</div>
                                </div>
                            </li>
                            <li className="lis flex-y">
                                <div className="avator">
                                    <img src={avators} className="avator-img" />
                                </div>
                                <div className="lis-right">
                                    <div className="title">杏仁派前置开发群...</div>
                                    <div className="desc">focus：华哥快发红包...</div>
                                </div>
                            </li>
                            <li className="lis flex-y">
                                <div className="avator">
                                    <img src={avators} className="avator-img" />
                                </div>
                                <div className="lis-right">
                                    <div className="title">沉迷加班(InsWelfare)</div>
                                    <div className="desc">才哥：我是真球迷，你们都是伪球迷...</div>
                                </div>
                            </li>
                            <li className="lis flex-y">
                                <div className="avator">
                                    <img src={avators} className="avator-img" />
                                </div>
                                <div className="lis-right">
                                    <div className="title">众安深圳屌丝群...</div>
                                    <div className="desc">村长：你是真的皮</div>
                                </div>
                            </li>
                            <li className="lis flex-y">
                                <div className="avator">
                                    <img src={avators} className="avator-img" />
                                </div>
                                <div className="lis-right">
                                    <div className="title">众安深圳屌丝群...</div>
                                    <div className="desc">村长：你是真的皮</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="chatting">
                        <div className="chatting-content">
                            
                        </div>
                        <div className="chattingi-input">
                            <textarea  className="chattingi-input-all"/>
                        </div>
                    </div>

                    <div className="numbers">
                        <div className="gonggao">
                            <p className="title">本群须知:</p>
                            <p className="content">
                                少灌水，多读书多交流，推荐每日拍照打卡~￼
                                少灌水，多读书多交流，推荐每日拍照打卡~￼
                                少灌水，多读书多交流，推荐每日拍照打卡~￼
                                少灌水，多读书多交流，推荐每日拍照打卡~￼
                                少灌水，多读书多交流，推荐每日拍照打卡~￼
                                少灌水，多读书多交流，推荐每日拍照打卡~￼
                            </p>
                        </div>
                        <div className="allNumber">
                            <div className="curNumbers">成员 203/303</div>
                            <ul>
                                <li className="lis flex-y">
                                    <img src={avators}  className="avator-img" />
                                    <div className="avator-nick">老村长</div>
                                </li>
                                <li className="lis flex-y">
                                    <img src={avators}  className="avator-img" />
                                    <div className="avator-nick">老船长</div>
                                </li>
                                <li className="lis flex-y">
                                    <img src={avators}  className="avator-img" />
                                    <div className="avator-nick">Jerry && Tom</div>
                                </li>
                                <li className="lis flex-y">
                                    <img src={avators}  className="avator-img" />
                                    <div className="avator-nick">@fouse</div>
                                </li>
                                <li className="lis flex-y">
                                    <img src={avators}  className="avator-img" />
                                    <div className="avator-nick">亮晶晶</div>
                                </li><li className="lis flex-y">
                                    <img src={avators}  className="avator-img" />
                                    <div className="avator-nick">老村长</div>
                                </li>
                                <li className="lis flex-y">
                                    <img src={avators}  className="avator-img" />
                                    <div className="avator-nick">老船长</div>
                                </li>
                                <li className="lis flex-y">
                                    <img src={avators}  className="avator-img" />
                                    <div className="avator-nick">Jerry && Tom</div>
                                </li>
                                <li className="lis flex-y">
                                    <img src={avators}  className="avator-img" />
                                    <div className="avator-nick">@fouse</div>
                                </li>
                                <li className="lis flex-y">
                                    <img src={avators}  className="avator-img" />
                                    <div className="avator-nick">亮晶晶</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state, 'mapStateToProps')
    return { state }
}

const mapDispatchToProps  = (dispatch) => {
    return {
        changeName() {
            dispatch({
                type: "CHANGE_NAME",
                card: {
                    name: 'xxx---changing',
                    avator: 'b.jpg---changing'
                },
                dialog: {
                    status:  true
                }
            })
        },
        showDialog() {
            dispatch({
                type: 'SHOW_DIALOG',
                dialog: {
                    status:  true
                }
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)