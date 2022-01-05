import React from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
    background: url(${process.env.PUBLIC_URL}/joke/hero.jpg);
    background-size: cover;
    background-repeat: no-repeat;
`;

const Home = () => {
    return (
        <div className="section">
            <HeroContainer className="hero fullscreen hero-img parallax-img">
                <div className="hero-body">
                    <div className="content">
                        <div className="u-text-center">
                            <img
                                style={{ maxWidth: 300 }}
                                className="img-contain"
                                src={`${process.env.PUBLIC_URL}/joke/icoon_600x600.png`}
                                alt="logo"
                            />
                            <div className="row">
                                <div className="content u-text-center">
                                    <h3 className="uppercase black sub-title">
                                        Welkom bij Masseerbeer Nieuwenrode
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="grid grid-gap-3 ">
                                <div className="grid-c-4">
                                    <div
                                        className="card h-100 u-flex u-flex-column"
                                        style={{ maxWidth: 350 }}
                                    >
                                        <div className="content">
                                            <h6 className="u-text-center">
                                                Openingsuren
                                            </h6>
                                            <div className="col-12">
                                                <div className="row row--no-wrap">
                                                    <div className="col-6 font-thin">
                                                        Alle dagen
                                                    </div>
                                                    <div className="col-2 font-thin">
                                                        -
                                                    </div>
                                                    <div className="col-4">
                                                        24/7
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="col-12">
                                                <div className="row row--no-wrap">
                                                    <div className="col-5 font-thin">
                                                        Dinsdag
                                                    </div>
                                                    <div className="col-1 font-thin">
                                                        -
                                                    </div>
                                                    <div className="col-6 flex-end">
                                                        Rustdag
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="col-12">
                                                <p className="font-bold">
                                                    Enkel op afspraak
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-c-4">
                                    <div
                                        className="card h-100 u-flex u-flex-column"
                                        style={{ maxWidth: 350 }}
                                    >
                                        <div className="content u-text-center">
                                            <h6>Therapieën</h6>
                                            <div className="col-12">
                                                <p>
                                                    U kan in de praktijk terecht
                                                    voor manuele therapie of
                                                    revalidatie na ongeval of
                                                    post-operatief.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-c-4">
                                    <div
                                        className="card h-100 u-flex u-flex-column"
                                        style={{ maxWidth: 350 }}
                                    >
                                        <div className="content u-text-center">
                                            <h6>KinePlus</h6>
                                            <div className="col-12">
                                                <p>
                                                    Bij KinePLUS staat de
                                                    patiënt als persoon
                                                    centraal. Een persoonlijke
                                                    aanpak in overleg met de
                                                    behandelende vrouw/man wordt
                                                    gegarandeerd.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </HeroContainer>
            <div className="content mt-3">
                <div className="row">
                    <div className="col-6 u-center">
                        <img
                            className="img-contain m-3"
                            src={`${process.env.PUBLIC_URL}/joke/icoon_600x600.png`}
                            alt="logo"
                        />
                    </div>
                    <div className="col-6">
                        <h2 className="primary text-green-400">MasseerBEER</h2>
                        <p className="mr-3">
                            Mijn naam is Joke Everaert. In 2012 studeerde ik af
                            als Master in de Revalidatie Wetenschappen en
                            Kinesitherapie aan de Vrije Universiteit Brussel met
                            een specialisatie in de inwendige aandoeningen.
                            Datzelfde jaar ben ik als zelfstandig
                            kinesitherapeut aan het werk gegaan in het Nationaal
                            MS-center te Melsbroek enerzijds en in een
                            privé-praktijk anderzijds. Momenteel ben ik nog
                            steeds halftijds werkzaam in het Nationaal MS-center
                            als kinesitherapeut in loondienst. In 2014 heb ik
                            mijn postgraduaat in de Manuele therapie behaald. Om
                            de patiënten optimaal te kunnen helpen volg ik
                            regelmatig opleidingen, waaronder de basisopleiding
                            voor masseren. Momenteel ben ik nog in opleiding
                            voor Fascia Therapie aan het Fascia College te
                            Drongen.
                        </p>
                        <p>Tot snel!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
