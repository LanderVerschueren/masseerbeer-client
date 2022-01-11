import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useContext } from "react";
import RealmContext from "../../__helpers__/realmContext";

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
    const { data } = useQuery(GET_ACTIVITIES);
    const realmApp = useContext(RealmContext);

    return (
        <div className="section">
            <div className="content">
                <div className="row">
                    <div className="col-6">
                        <h5>Activiteiten</h5>
                    </div>
                    {realmApp.currentUser?.providerType ===
                        "local-userpass" && (
                        <div className="col-6 u-flex u-justify-flex-end">
                            <Link to="toevoegen" className="btn">
                                <i className="fa-wrapper fa fa-plus pad-right" />{" "}
                                voeg activieit toe
                            </Link>
                        </div>
                    )}
                </div>

                <div className="row u-wrap">
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
                                    <>
                                        <div
                                            key={`${index}-activity`}
                                            className="col-xs-12 col-sm-6 col-4 mb-2"
                                        >
                                            <div className="card h-100 u-flex u-flex-column">
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
                                                                "dd/MM/yyyy"
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="col-12">
                                                        <div
                                                            className="divider"
                                                            data-content="periode"
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <p className="u-text-center">
                                                            {format(
                                                                new Date(
                                                                    activity.endDate *
                                                                        1000
                                                                ),
                                                                "dd/MM/yyyy"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="card__action-bar u-flex u-justify-flex-end">
                                                    <Link
                                                        to={`${activity._id}`}
                                                        className="btn btn-transparent"
                                                    >
                                                        details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            }
                        )}
                </div>
            </div>
        </div>
    );
};

export default Activities;
