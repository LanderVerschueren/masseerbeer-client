import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    min-height: 100vh;
    width: 100vw;
`;

const ChildrenContainer = styled.div`
    flex: 1;
    height: 100vh;
`;

const General = (props: Props) => {
    const { children } = props;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () => {
            window.removeEventListener("scroll", listenToScroll);
        };
    }, []);

    const listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        if (winScroll > 0) {
            setScrolled(true);
        }

        if (winScroll === 0) {
            setScrolled(false);
        }
    };

    const getClassNames = () => {
        let toReturn = "header header-fixed u-unselectable header-animated";

        if (!scrolled) {
            toReturn += " header-clear header-dark";
        }
        return toReturn;
    };

    return (
        <Container>
            <div className={getClassNames()}>
                <div className="header-brand">
                    <div className="nav-item no-hover">
                        <Link to={"/"}>
                            <h6 className="title">Masseerbeer</h6>
                        </Link>
                    </div>
                    <div className="nav-item nav-btn" id="header-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="header-nav" id="header-menu">
                    {/* <div className="nav-left">
                        <div className="nav-item text-center">
                            <Link to="/activities">activiteiten</Link>
                        </div>
                    </div> */}

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
            <ChildrenContainer>{children}</ChildrenContainer>
            <footer className="footer">
                <h6 className="footer__title white uppercase">Masseerbeer</h6>
                <div className="content">
                    <div className="divider"></div>

                    <div className="row">
                        <div className="col-12">
                            <ul className="no-bullets">
                                <Link to="/">
                                    <li className="footer__list-item">Home</li>
                                </Link>
                                {/* <a href="!#">
                                    <li className="footer__list-item">
                                        Sign Up
                                    </li>
                                </a>
                                <a href="!#">
                                    <li className="footer__list-item">
                                        Downloads
                                    </li>
                                </a> */}
                                <ul></ul>
                            </ul>
                        </div>
                        {/* <div className="col-4">
                            <ul className="no-bullets">
                                <a href="!#">
                                    <li className="footer__list-item">
                                        Company Information
                                    </li>
                                </a>
                                <a href="!#">
                                    <li className="footer__list-item">
                                        Contact Us
                                    </li>
                                </a>
                                <a href="!#">
                                    <li className="footer__list-item">
                                        Reviews
                                    </li>
                                </a>
                                <ul></ul>
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="no-bullets">
                                <a href="!#">
                                    <li className="footer__list-item">FAQ</li>
                                </a>
                                <a href="!#">
                                    <li className="footer__list-item">
                                        Help Desk
                                    </li>
                                </a>
                                <a href="!#">
                                    <li className="footer__list-item">
                                        Forums
                                    </li>
                                </a>
                                <ul></ul>
                            </ul>
                        </div> */}
                    </div>
                </div>
                <p className="subtitle">
                    Masseerbeer © {new Date().getFullYear()}
                </p>
            </footer>
        </Container>
    );
};

export default General;
