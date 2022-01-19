import { gql, useMutation, useQuery } from "@apollo/client";
import format from "date-fns/format";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Modal from "../../Components/Modal/Modal";
import RealmContext from "../../__helpers__/realmContext";

const GET_ACTIVITY = gql`
    query activity($query: ActivityQueryInput) {
        activity(query: $query) {
            _id
            startDate
            activityName
            endDate
            street
            houseNumber
            bus
            postalCode
            city
            hasCosts
            state
            doodleUrl
        }
    }
`;

const DELETE_ACTIVITY = gql`
    mutation deleteOneActivity($query: ActivityQueryInput!) {
        deleteOneActivity(query: $query) {
            _id
            activityName
        }
    }
`;


const ActivityDetails = () => {
    const { state }: any = useLocation();
    const { activityId }: any = useParams();
    const [openDialog, setOpenDialog] = useState<string | null>(null);
    const navigate = useNavigate();

    const [deleteActivity, { loading: loadingDelete }] = useMutation(DELETE_ACTIVITY);
    const { data: activity, loading: loadingData } = useQuery(GET_ACTIVITY, {
        variables: {
            query: {
                _id: activityId,
            },
        },
    });

    const realmApp = useContext(RealmContext);

    const handleDeleteActivity = async () => {
        const resp = await deleteActivity({
            variables: {
                query: {
                    _id: activityId,
                },
            },
            update(cache) {
                cache.modify({
                    fields: {
                        activities(exisitingActivitiesRefs, { readField }) {
                            return exisitingActivitiesRefs.filter(
                                (activityRef: any) =>
                                    activityId !== readField("_id", activityRef)
                            );
                        },
                    },
                });
            },
        });

        if (resp && resp.data.deleteOneActivity._id) {
            setOpenDialog(null);
            if (state && state.prevUrl) {
                navigate(state.prevUrl);
            } else {
                navigate('/activiteiten/overzicht/gepland')
            }
        }
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`OKRA - Activiteit ${activity && activity.activity.activityName}`}</title>
                <link rel="canonical" href={`https://okra-kapelle-op-den-bos.be/activiteiten/${activityId}/details`} />
            </Helmet>
            {loadingData ? <Loading /> :
                <>
                    {activity && activity.activity && (
                        <>
                            <div className="section">
                                <div className="content">
                                    <>
                                        <div className="row">
                                            <div className="col">
                                                <h2>
                                                    {activity.activity.activityName}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                {realmApp.currentUser?.providerType ===
                                                    "local-userpass" &&
                                                    activity && (
                                                        <>
                                                            {activity &&
                                                                activity.activity.hasCosts && (
                                                                    <Link
                                                                        to={`kosten`}
                                                                        className="btn btn-small btn-transparent pad-right"
                                                                    >
                                                                        kosten
                                                                        <i className="fa-wrapper fa fa-money-check-alt pad-left" />
                                                                    </Link>
                                                                )}
                                                            <Link
                                                                to={`bewerken`}
                                                                className="btn mr-2"
                                                                style={{
                                                                    height: "100%",
                                                                }}
                                                            >
                                                                bewerken
                                                                <i className="fa-wrapper fa fa-edit pad-left" />
                                                            </Link>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                        <div className="row u-flex u-flex-row">
                                            <div className="col-6">
                                                <h5>
                                                    <i className="fa-wrapper fa fa-calendar-alt pr-2" />
                                                    Wanneer
                                                </h5>
                                                <div className="row">
                                                    <div className="col u-flex u-flex-column">
                                                        <label className="font-bold">
                                                            start
                                                        </label>
                                                        <p>
                                                            {activity.activity.startDate ? format(
                                                                new Date(
                                                                    activity.activity
                                                                        .startDate *
                                                                    1000
                                                                ),
                                                                "dd/MM/yyyy HH:mm"
                                                            ) : "TBD"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col u-flex u-flex-column">
                                                        <label className="font-bold">
                                                            einde
                                                        </label>
                                                        <p>
                                                            {activity.activity.endDate ? format(
                                                                new Date(
                                                                    activity.activity
                                                                        .endDate * 1000
                                                                ),
                                                                "dd/MM/yyyy HH:mm"
                                                            ) : "TBD"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <h5>
                                                    <i className="fa-wrapper fa fa-map-marker-alt pr-2" />
                                                    Waar
                                                </h5>
                                                <div className="row">
                                                    <div className="col u-flex u-flex-column">
                                                        <label className="font-bold">
                                                            adres
                                                        </label>
                                                        <p>
                                                            {activity.activity.street}{" "}
                                                            {
                                                                activity.activity
                                                                    .houseNumber
                                                            }
                                                            <br />
                                                            {
                                                                activity.activity
                                                                    .postalCode
                                                            }{" "}
                                                            {activity.activity.city}
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* <div className="row">
                                        <div
                                            style={{ height: 200, width: 200 }}
                                        >
                                            <GoogleMapReact
                                                bootstrapURLKeys={{
                                                    key: GOOGLE_API,
                                                }}
                                                defaultZoom={8}
                                                yesIWantToUseGoogleMapApiInternals
                                            >
                                                <AnyReactComponent
                                                    lat={59.955413}
                                                    lng={30.337844}
                                                    text="My Marker"
                                                />
                                            </GoogleMapReact>
                                        </div>
                                    </div> */}
                                            </div>
                                        </div>
                                        {activity.activity.doodleUrl && <div className="row u-flex u-flex-column">
                                            <div className="col-12">
                                                <h5>
                                                    <i className="fa-wrapper fa fa-book-open pr-2" />
                                                    Doodle
                                                </h5>
                                                <iframe height={500} src={activity.activity.doodleUrl} />
                                            </div></div>}
                                        {realmApp.currentUser?.providerType ===
                                            "local-userpass" && (
                                                <div className="row">
                                                    <div className="col u-flex u-justify-flex-end">
                                                        <button
                                                            onClick={() =>
                                                                setOpenDialog(
                                                                    activity.activity._id
                                                                )
                                                            }
                                                            className="btn btn-danger mb-0"
                                                        >
                                                            verwijderen
                                                            <i className="fa-wrapper fa fa-trash pad-left" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                    </>
                                </div>
                            </div>
                            {realmApp.currentUser?.providerType ===
                                "local-userpass" && (
                                    <Modal
                                        modalTitle="verwijderen"
                                        open={
                                            activity && openDialog === activity.activity._id
                                                ? true
                                                : false
                                        }
                                        closeDialog={() => setOpenDialog(null)}
                                    >
                                        <>
                                            <div className="row u-text-center">
                                                <div className="col">
                                                    {activity && (
                                                        <p>
                                                            Wil je de activiteit{" "}
                                                            {activity.activityName}{" "}
                                                            verwijderen?
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col u-flex u-justify-flex-end">
                                                    <button
                                                        onClick={() => setOpenDialog(null)}
                                                    >
                                                        annuleren
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteActivity()
                                                        }
                                                        className={loadingDelete ? "btn-danger ml-2 animated loading hide-text" : "btn-danger ml-2"}
                                                    >
                                                        verwijderen
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    </Modal>
                                )}
                        </>
                    )}
                </>
            }
        </>
    );
};

export default ActivityDetails;
