import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RealmContext from "../../__helpers__/realmContext";
import * as Realm from "realm-web";

const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const realmApp = useContext(RealmContext);

    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        await realmApp.emailPasswordAuth.registerUser(
            data.email,
            data.password
        );

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
                            <h4>registreren</h4>
                            <div className="divider" />
                            <div className="form-section">
                                <label htmlFor="">Voornaam</label>
                                <div className="input-control">
                                    <input
                                        type="text"
                                        placeholder="Voornaam"
                                        className={
                                            errors.email
                                                ? "text-danger input-error input-contains-icon"
                                                : "input-contains-icon"
                                        }
                                        {...register("firstName", {
                                            required: true,
                                        })}
                                    />
                                    <span className="icon">
                                        <i className="far fa-wrapper fa-envelope-open small"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="form-section">
                                <label htmlFor="">Achternaam</label>
                                <div className="input-control">
                                    <input
                                        type="text"
                                        placeholder="lastName"
                                        className={
                                            errors.email
                                                ? "text-danger input-error input-contains-icon"
                                                : "input-contains-icon"
                                        }
                                        {...register("lastName", {
                                            required: true,
                                        })}
                                    />
                                    <span className="icon">
                                        <i className="far fa-wrapper fa-envelope-open small"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="divider"></div>
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
                            <div className="form-section">
                                <label htmlFor="">Paswoord herhalen</label>
                                <div className="input-control">
                                    <input
                                        {...register("password_repeat", {
                                            required: true,
                                            validate: (value) =>
                                                value === password.current ||
                                                "Paswoorden komen niet overeen.",
                                        })}
                                        placeholder="Paswoord"
                                        type="password"
                                        className={
                                            errors.password_repeat
                                                ? "text-danger input-error input-contains-icon"
                                                : "input-contains-icon"
                                        }
                                    />
                                    <span className="icon">
                                        <i className="fas fa-wrapper fa-key small"></i>
                                    </span>
                                </div>
                                {errors.password_repeat && (
                                    <p className="text-danger">
                                        {errors.password_repeat.message}
                                    </p>
                                )}
                            </div>
                            <div className="form-section u-text-right">
                                <div className="mt-1 u-inline-block">
                                    <button className="btn-info" type="submit">
                                        registreren
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
