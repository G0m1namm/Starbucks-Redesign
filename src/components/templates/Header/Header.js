import React, { useContext, useEffect, useState } from "react";
import LogoIcon from "../../../assets/icons/starbucks_logo.svg";
import { IconButton } from "../../atoms/IconButton";
import { MapPin, ArrowDown, ChevronDown } from "react-feather";
import './Header.scss';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthProvider";
import { Menu, Avatar, Dropdown, List, Icon } from "antd";
import { signOut } from "../../../utils/SignOutUser";
const { SubMenu } = Menu;

export function AuthButtons({history}){

    return (
        <div className="auth-actions-wrapper">
            <button className="btn btn-secondary" onClick={() => history.push("/login")}>Sign In</button>
            <button className="btn btn-primary">Sign Up</button>
        </div>
    );
}

export function DropdownMenu({history}) {
    console.log(history);
    
    return (
        <Menu>
            <Menu.Item key="menu:dashboard">
                Dashboard
            </Menu.Item>
            <Menu.Item key="menu:logout" onClick={() => signOut(() => history.push("/home"))}>
                Logout
            </Menu.Item>
        </Menu>
    );
}

export function UserLoggedMenu({ nickName, history }) {
    return (
        <Dropdown
            overlay={<DropdownMenu history={history}/>}
            trigger={['click']}
        >
            <List>
                <List.Item actions={[<ChevronDown />]} style={{ padding: 0 }}>
                    <List.Item.Meta
                        avatar={
                            <Avatar size="large">
                                {nickName[0].toUpperCase()}
                            </Avatar>
                        }
                        title={nickName}
                        description={`level ${nickName.length}`}
                    />
                </List.Item>
            </List>
        </Dropdown>
    );
}

export default function Header() {
    const user = useContext(AuthContext);
    const [nickName, setNickName] = useState('');
    let history = useHistory();

    useEffect(() => {
        if (user) {
            console.table(user.currentUser);
            setNickName(user.currentUser.email);
        }
    }, [user])

    return (
        <header>
            <div className="logo-wrapper">
                <img className="logo-image" src={LogoIcon} alt="logo de starbucks" />
                <IconButton
                    icon={<MapPin />}
                    className="btn btn-secondary-outlined icon-btn open-map-button"
                >
                    Prague, CZ
                </IconButton>
            </div>
            {nickName ? (<UserLoggedMenu nickName={nickName} history={history}/>) : (<AuthButtons history={history}/>)}
        </header>
    );
}
