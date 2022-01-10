import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { LOCALSTORAGE_JWT } from "../__helpers__/common";
import RealmContext from "../__helpers__/realmContext";
import CommonHeader from "./CommonHeader";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    min-height: 100vh;
    width: 100vw;
`;

const General = () => {
    return (
        <Container>
            <CommonHeader />
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
