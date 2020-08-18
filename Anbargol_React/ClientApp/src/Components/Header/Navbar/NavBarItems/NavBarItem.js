import React from 'react';
import Wrapper from '../../../../Shared/Wrapper/Wrapper';
import './NavBarItems.module.css';

const NavBarItems = props => {
    return (
        <Wrapper>
            <li className="nav-item active">
                <a className="nav-link" href="#">برنامه</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle pointer"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ثبت
                        </a>
                <div className="dropdown-menu text-right" >
                    <a className="dropdown-item" href="#">گل جدید</a>
                    <a className="dropdown-item" href="#">برگ خروج</a>
                    <a className="dropdown-item" href="#">کپی آیتم ها</a>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">گزارشات</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">ویرایش کنترل ها</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">پشتیبان گیری</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">خروج</a>
            </li>
        </Wrapper>
    )
}

export default NavBarItems;