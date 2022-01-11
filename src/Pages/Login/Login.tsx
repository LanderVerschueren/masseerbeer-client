import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import RealmContext from "../../__helpers__/realmContext";
import * as Realm from "realm-web";

const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const realmApp = useContext(RealmContext);

    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        const resp = await realmApp.logIn(
            Realm.Credentials.emailPassword(data.email, data.password)
        );

        if (resp) {
            navigate("/");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="section">
                <div className="content">
                    <div className="row u-flex u-justify-center">
                        <div className="col-4">
                            <h4>inloggen</h4>
                            <div className="divider" />
                            <div className="form-section">
                                <label htmlFor="">E-mail</label>
                                <div className="input-control">
                                    <input
                                        type="text"
                                        placeholder="E-mail"
                                        className={
                                            errors.email
                                                ? "text-danger input-error input-contains-icon"
                                                : "input-contains-icon"
                                        }
                                        {...register("email", {
                                            required: true,
                                        })}
                                    />
                                    <span className="icon">
                                        <i className="far fa-wrapper fa-envelope-open small"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="form-section">
                                <label htmlFor="">Paswoord</label>
                                <div className="input-control">
                                    <input
                                        {...register("password", {
                                            required: true,
                                        })}
                                        placeholder="Paswoord"
                                        type="password"
                                        className={
                                            errors.password
                                                ? "text-danger input-error input-contains-icon"
                                                : "input-contains-icon"
                                        }
                                    />
                                    <span className="icon">
                                        <i className="fas fa-wrapper fa-key small"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="row form-section">
                                <div className="col-12 u-flex u-justify-flex-end">
                                    <Link to="/registreren">registreren</Link>
                                </div>
                            </div>
                            <div className="form-section u-text-right">
                                <div className="mt-1 u-inline-block">
                                    <button className="btn-info" type="submit">
                                        inloggen
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
