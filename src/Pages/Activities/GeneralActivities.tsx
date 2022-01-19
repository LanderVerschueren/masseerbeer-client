import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components';
import RealmContext from '../../__helpers__/realmContext';

const AddActivityContainer = styled.div`
    @media screen and (max-width: 767px) {
        justify-content: start !important;
    }
`

const GeneralActivities = ({ children }: any) => {
    const realmApp = useContext(RealmContext);
    const { pathname } = useLocation();

    return (
        <div className="section">
            <div className="content">
                <div className="row">
                    <div className="col-6">
                        <h5>Activiteiten</h5>
                    </div>
                    {realmApp.currentUser?.providerType ===
                        "local-userpass" && (
                            <AddActivityContainer className="col-6 u-flex u-justify-flex-end">
                                <Link to="../toevoegen" className="btn" state={{ prevUrl: pathname }}>
                                    <i className="fa-wrapper fa fa-plus pad-right" />{" "}
                                    voeg activieit toe
                                </Link>
                            </AddActivityContainer>
                        )}
                </div>
                {children}
            </div>
        </div>
    )
}

export default GeneralActivities
