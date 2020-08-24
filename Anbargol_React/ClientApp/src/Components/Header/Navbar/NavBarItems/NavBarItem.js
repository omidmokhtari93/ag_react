import React from 'react';
import Wrapper from '../../../../Shared/Wrapper/Wrapper';
import './NavBarItems.module.css';
import { Link , NavLink} from 'react-router-dom';

const NavBarItems = props => {
    return (
        <Wrapper>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/program">برنامه</NavLink>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle pointer"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ثبت
                        </a>
                <div className="dropdown-menu text-right" >
                    <NavLink className="dropdown-item" activeClassName="active" to={{
                        pathname: "/addnew"
                    }}>گل جدید</NavLink>
                    <a className="dropdown-item" href="#">برگ خروج</a>
                    <a className="dropdown-item" href="#">کپی آیتم ها</a>
                </div>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" exact to="/">گزارشات</NavLink>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">ویرایش کنترل ها</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">پشتیبان گیری</a>
            </li>
            <li className="nav-item pl-4">
                <a className="nav-link" href="#">خروج</a>
            </li>
        </Wrapper>
    )
}

export default NavBarItems;