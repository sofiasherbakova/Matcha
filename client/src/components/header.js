import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container, 
    UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logOut } from '../redux/login/ActionCreators';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { initFilter } from '../redux/filter/ActionCreators';
import './Header.css';
import moment from 'moment';

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut()),
    clearFilter: () => dispatch(initFilter())
});


function NotificationList(props) {
    let listItems;

    if (props.item.length > 0) {
        listItems = props.item.map((item) =>
        {
            switch(item.event){
                case 'like': 
                    return(
                        <DropdownItem>
                            <span className="nickname">{item.nickname}</span> liked your profile
                            <div className="time">{moment(item.time).fromNow()}</div>
                        </DropdownItem>
                    );
                case 'ignore': 
                    return(
                        <DropdownItem>
                            <span className="nickname">{item.nickname}</span> ignored your profile
                            <div className="time">{moment(item.time).fromNow()}</div>
                        </DropdownItem>
                    );
                case 'message': 
                    return(
                        <DropdownItem>
                            new message from <span className="nickname">{item.nickname}</span>
                            <div className="message">"{item.message}"</div>
                            <div className="time">{moment(item.time).fromNow()}</div>
                        </DropdownItem>
                    );
            }
        }
        );
        return (
            <label>{listItems}</label>
        );
    }
    return (
        <DropdownItem>
            Nothing
        </DropdownItem>
    );
}


const Notification = () => {
    const mock = [
        {
            nickname: 'rkina',
            event: 'like',
            time: new Date(2020, 10, 11, 20, 30)
        },
        {
            nickname: 'rkina',
            event: 'ignore',
            time: new Date()
        },
        {
            nickname: 'mgrass',
            event: 'message',
            message: 'helloooooo :)))',
            time: new Date()
        },
        {
            nickname: 'rkina',
            event: 'like',
            time: new Date(2020, 10, 11, 20, 30)
        },
        {
            nickname: 'mgrass',
            event: 'ignore',
            time: new Date()
        },
        {
            nickname: 'rkina',
            event: 'message',
            message: 'I am here',
            time: new Date()
        }
    ]

    return (
        <UncontrolledButtonDropdown>
            <DropdownToggle color="none">
                    <i className="icon fa fa-bell"></i>
            </DropdownToggle>
            <DropdownMenu modifiers={{
                setMaxHeight: {
                    enabled: true,
                    order: 890,
                    fn: (data) => {
                    return {
                        ...data,
                        styles: {
                        ...data.styles,
                        overflow: 'auto',
                        maxHeight: '350px',
                        maxWidth: '300px',
                        },
                    };
                    },
                },
                }}>
                <NotificationList item={mock}/>
            </DropdownMenu>
        </UncontrolledButtonDropdown>
    );
  }



const Header = (props) => {
    const history = useHistory();
    const name = props.login.isLogged === 'true' ? <i className="fa fa-sign-out"></i> : <i className="fa fa-sign-in"></i>;
    const urls = ['/login', '/register', '/remind', '/confirm'];
    const path = props.location.pathname;

    useEffect(() => {
        if (!props.login.isLogged && !path.includes('/register') && !path.includes('/remind') && !path.includes('/confirm'))
            history.push('/login');
    }, [path]);

    return (
        <Navbar color="light" light expand="xs">
            <Container>
                <NavbarBrand>Matcha</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    {!urls.includes(path) &&
                        <Notification></Notification>
                    }
                    {(!urls.includes(path) || path !== '/edit') && path.includes('/users/page') &&
                        <NavItem>
                            <NavLink href={`/users/${props.login.me.nickname}`}>
                                <i className="fa fa-user"></i>
                            </NavLink>
                        </NavItem>
                    }
                    {(!urls.includes(path) || path === '/edit') && !path.includes('/users/page') &&
                        <NavItem>
                            <NavLink href="/users/page/1">
                                <i className="fa fa-users"></i>
                            </NavLink>
                        </NavItem>
                    }
                    {!urls.includes(path) &&
                        <NavItem>
                            <NavLink href='/login' onClick={() => {
                                props.clearFilter();
                                props.logOut();
                            }}>
                                {name}
                            </NavLink>
                        </NavItem>
                    }
                </Nav>
            </Container>
        </Navbar>
    );

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));