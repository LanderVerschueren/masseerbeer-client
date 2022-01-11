import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { commonHeights, LOCALSTORAGE_JWT } from "../__helpers__/common";
import RealmContext from "../__helpers__/realmContext";

const ChildrenContainer = styled.div`
    flex: 1;
    height: 100vh;

    margin-top: ${commonHeights.navHeight}px;
`;

const CommonHeader = () => {
    const realmApp = useContext(RealmContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        realmApp.currentUser?.logOut().then(() => {
            localStorage.removeItem(LOCALSTORAGE_JWT);
        });
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <div className="header header-fixed u-unselectable header-animated">
                <div className="header-brand">
                    <div className="nav-item no-hover">
                        <Link onClick={() => closeMenu()} to={"/"}>
                            <h6 className="title uppercase">OKRA</h6>
                        </Link>
                    </div>
                    <div
                        className="nav-item nav-btn"
                        id="header-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div
                    className={menuOpen ? "header-nav active" : "header-nav"}
                    id="header-menu"
                >
                    <div className="nav-left">
                        <div className="nav-item text-center">
                            <Link
                                onClick={() => closeMenu()}
                                to="/activiteiten"
                            >
                                activiteiten
                            </Link>
                        </div>
                    </div>

                    <div className="nav-right">
                        <div className="nav-item text-center">
                            {realmApp.currentUser?.providerType ===
                            "local-userpass" ? (
                                <button
                                    className="btn-transparent"
                                    onClick={() => logout()}
                                >
                                    uitloggen
                                </button>
                            ) : (
                                <Link onClick={() => closeMenu()} to="/login">
                                    inloggen
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* <div className="nav-right">
                        <div className="nav-item active">
                            <a href="#">Active</a>
                        </div>
                        <div className="nav-item">
                            <a href="#">Link 1</a>
                        </div>
                        <div className="nav-item has-sub" id="dropdown">
                            <a className="nav-dropdown-link">Click Me</a>
                            <ul className="dropdown-menu" role="menu">
                                <li role="menu-item">
                                    <a href="#">First Item</a>
                                </li>
                                <li role="menu-item">
                                    <a href="#">Second Item</a>
                                </li>
                                <li role="menu-item">
                                    <a href="#">Third Item</a>
                                </li>
                                <li className="dropdown-menu-divider"></li>
                                <li role="menu-item">
                                    <a href="#">Fourth Item</a>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            </div>
            <ChildrenContainer>
                <Outlet />
            </ChildrenContainer>
        </>
    );
};

export default CommonHeader;
