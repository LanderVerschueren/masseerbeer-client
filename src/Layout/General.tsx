import React from "react";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const General = (props: Props) => {
    const { children } = props;
    return (
        <Container>
            <div className="header header-fixed u-unselectable header-animated">
                <div className="header-brand">
                    <div className="nav-item no-hover">
                        <a>
                            <h6 className="title">Logo</h6>
                        </a>
                    </div>
                    <div className="nav-item nav-btn" id="header-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="header-nav" id="header-menu">
                    <div className="nav-left">
                        <div className="nav-item text-center">
                            <a href="#">
                                <span className="icon">
                                    <i
                                        className="fab fa-wrapper fa-github"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </a>
                        </div>
                        <div className="nav-item text-center">
                            <a href="#">
                                <span className="icon">
                                    <i
                                        className="fab fa-wrapper fa-slack"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </a>
                        </div>
                        <div className="nav-item text-center">
                            <a href="#">
                                <span className="icon">
                                    <i
                                        className="fab fa-wrapper fa-twitter"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </a>
                        </div>
                        <div
                            className="nav-item has-sub toggle-hover"
                            id="dropdown"
                        >
                            <a className="nav-dropdown-link">Animated</a>
                            <ul
                                className="dropdown-menu dropdown-animated"
                                role="menu"
                            >
                                <li role="menu-item">
                                    <a href="#">First Item</a>
                                </li>
                                <li role="menu-item">
                                    <a href="#">Second Item</a>
                                </li>
                                <li role="menu-item">
                                    <a href="#">Third Item</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="nav-right">
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
                    </div>
                </div>
            </div>
            {children}
        </Container>
    );
};

export default General;
