import React, { useContext, useEffect, useState } from "react";
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

const ChildrenContainer = styled.div`
    flex: 1;
    height: 100vh;
`;

const GeneralNoFooter = () => {
    const realmApp = useContext(RealmContext);

    const logout = () => {
        realmApp.currentUser?.logOut().then(() => {
            localStorage.removeItem(LOCALSTORAGE_JWT);
        });
    };

    return (
        <Container>
            <CommonHeader />
        </Container>
    );
};

export default GeneralNoFooter;
