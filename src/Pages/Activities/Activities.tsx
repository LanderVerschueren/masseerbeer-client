import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { commonHeights } from "../../__helpers__/common";
import { format } from "date-fns";
import { useContext } from "react";
import RealmContext from "../../__helpers__/realmContext";

const Container = styled.div`
    margin-top: ${commonHeights.navHeight}px;
`;

const GridContainer = styled.div`
    width: 100%;
`;

const GET_ACTIVITIES = gql`
    query activities {
        activities {
            _id
            activityName
            startDate
            endDate
            street
            houseNumber
            bus
            postalCode
            city
            hasCosts
        }
    }
`;

const Activities = () => {
    const { loading, data, error } = useQuery(GET_ACTIVITIES);
    const realmApp = useContext(RealmContext);

    console.log(data);

    const sortFunction = (a: any, b: any) => {
        console.log(a, b);

        return a.startDate - b.startDate;
    };

    return (
        <Container>
            <div className="section">
                <div className="content">
                    <div className="row">
                        <div className="col-6">
                            <h5>Activiteiten</h5>
                        </div>
                        {realmApp.currentUser?.providerType ===
                            "local-userpass" && (
                            <div className="col-6 u-flex u-justify-flex-end">
                                <Link
                                    to="activiteiten/toevoegen"
                                    className="btn"
                                >
                                    <i className="fa-wrapper fa fa-plus pad-right" />{" "}
                                    voeg activieit toe
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="row u-wrap">
                        {/* <GridContainer className="grid grid-gap-3 grid-cols-3"> */}
                        {data &&
                            data.activities.map(
                                (
                                    activity: {
                                        _id: string;
                                        activityName: string;
                                        startDate: number;
                                        endDate: number;
                                        street: string;
                                        houseNumber: number;
                                        bus: string | undefined;
                                        postalCode: number;
                                        city: string;
                                        hasCosts: boolean;
                                    },
                                    index: number
                                ) => {
                                    return (
                                        <div
                                            key={`${index}-activity`}
                                            className="col-xs-12 col-sm-6 col-4 mb-2"
                                        >
                                            <div className="card h-100 u-flex u-flex-column">
                                                <div className="content">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <p className="title u-text-center">
                                                                {
                                                                    activity.activityName
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="col-12">
                                                            <p className="u-text-center">
                                                                {format(
                                                                    new Date(
                                                                        activity.startDate *
                                                                            1000
                                                                    ),
                                                                    "dd/MM/yyyy HH:mm"
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="col-12">
                                                            <div
                                                                className="divider"
                                                                data-content="time"
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <p className="u-text-center">
                                                                {format(
                                                                    new Date(
                                                                        activity.endDate *
                                                                            1000
                                                                    ),
                                                                    "dd/MM/yyyy HH:mm"
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="row pb-0">
                                                        <div className="col-12">
                                                            <p className="title u-text-center">
                                                                <i className="fa-wrapper fa fa-map-marker-alt" />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="row p-0">
                                                        <div className="col-12 u-text-center">
                                                            <p className="m-0">
                                                                {
                                                                    activity.street
                                                                }{" "}
                                                                {
                                                                    activity.houseNumber
                                                                }{" "}
                                                                {activity.bus &&
                                                                    `bus ${activity.bus}`}
                                                            </p>
                                                            <p className="m-0">
                                                                {
                                                                    activity.postalCode
                                                                }{" "}
                                                                {activity.city}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {realmApp.currentUser
                                                    ?.providerType ===
                                                    "local-userpass" && (
                                                    <div className="card__action-bar u-flex u-justify-flex-end">
                                                        {activity.hasCosts && (
                                                            <Link
                                                                to={`activiteiten/kosten/${activity._id}`}
                                                                className="btn outline"
                                                            >
                                                                <i className="fa-wrapper fa fa-money-check-alt" />
                                                            </Link>
                                                        )}
                                                        <Link
                                                            to={`activitetien/bewerken/${activity._id}`}
                                                            className="btn outline"
                                                        >
                                                            <i className="fa-wrapper fa fa-edit" />
                                                        </Link>
                                                    </div>
                                                )}
                                                {/* <div className="card__footer">
                                                    <div className="u-text-center">
                                                        <span>
                                                            This is additional
                                                            footer text in{" "}
                                                            <code>
                                                                card__footer
                                                            </code>
                                                            .
                                                        </span>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        {/* </GridContainer> */}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Activities;
