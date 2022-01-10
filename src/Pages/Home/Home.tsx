import React from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
    background: url(${process.env.PUBLIC_URL}/masseerbeer/hero.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const CardContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.66);
`;

const Lyrics = styled.h4`
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Home = () => {
    return (
        <div className="section">
            <HeroContainer className="hero fullscreen hero-img parallax-img">
                <div className="hero-body">
                    <div className="content">
                        <div className="u-text-center">
                            {/* <img
                                style={{ maxWidth: 500 }}
                                className="img-contain"
                                src={`${process.env.PUBLIC_URL}/masseerbeer/logo_transparent.png`}
                                alt="logo"
                            /> */}
                            <div className="row">
                                <div className="content white u-text-center">
                                    {/* <CardContainer className="card u-flex u-flex-column"> */}
                                    <Lyrics className="uppercase">
                                        Dag Vriendjes
                                        <br />
                                        Dag Vriendinnetjes
                                        <br />
                                        Dat was het dan alweer
                                        <br />
                                        <br />
                                        Dag Vriendjes
                                        <br />
                                        Dag Vriendinnetjes
                                        <br />
                                        Tot de volgende keer maar weer
                                    </Lyrics>
                                    {/* </CardContainer> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </HeroContainer>
            {/* <div className="content mt-3">
                <div className="row">
                    <div className="col-6 u-center">
                        <img
                            className="img-contain m-3"
                            src={`${process.env.PUBLIC_URL}/masseerbeer/logo_transparent.png`}
                            alt="logo"
                        />
                    </div>
                    <div className="col-6">
                        <h2 className="primary text-red-500">MasseerBEER</h2>
                        <p className="mr-3"></p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Home;
