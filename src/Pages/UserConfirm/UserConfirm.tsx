import React, { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import RealmContext from '../../__helpers__/realmContext';

const UserConfirm = () => {
    const [search] = useSearchParams();
    const realmApp = useContext(RealmContext);

    const confirm = async () => {
        const token = search.get('token');
        const tokenId = search.get('tokenId');

        console.log(token, tokenId);

        if (token && tokenId) {
            await realmApp.emailPasswordAuth.confirmUser({token, tokenId});
        }
    }

    return (
        <div className="section">
            <div className="content">
                <div className="row u-flex u-justify-center">
                    <div className="col">
                        <h2>
                            E-mailadres bevestigen
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>Klik hieronder op de knop om je e-mailadres en account te bevestigen.</p>
                    </div>
                    <div className="col">
                        <button className="btn" onClick={() => confirm()}>bevestigen</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserConfirm
