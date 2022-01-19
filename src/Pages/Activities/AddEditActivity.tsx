import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { formatISO } from "date-fns";
import format from "date-fns/format";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

interface FormData {
    activityName: string;
    startDate: Date;
    endDate: Date;
    street: string;
    houseNumber: number;
    bus?: string;
    postalCode: number;
    city: string;
    hasCosts: boolean;
    state: boolean;
    doodleUrl?: string;
}

const ADD_ACTIVITY = gql`
    mutation insertOneActivity($data: ActivityInsertInput!) {
        insertOneActivity(data: $data) {
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
            created_by
            state
            doodleUrl
        }
    }
`;

const UPDATE_ACTIVITY = gql`
    mutation updateOneActivity(
        $data: ActivityQueryInput
        $set: ActivityUpdateInput!
    ) {
        updateOneActivity(query: $data, set: $set) {
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
            created_by
            state
            doodleUrl
        }
    }
`;

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
            created_by
            state
            doodleUrl
        }
    }
`;

const AddEditActivity = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        reValidateMode: "onChange",
    });
    const stateActive = watch('state');
    const { activityId }: any = useParams();
    const navigate = useNavigate();

    const { state }: any = useLocation();

    const [addActivity, { loading: loadingAdd }] = useMutation(ADD_ACTIVITY, {
        onCompleted: (value) => {
            if (value) {
                if (state && state.prevUrl) {
                    navigate(state.prevUrl);
                } else {
                    navigate('/activiteiten/overzicht/gepland')
                }
            }
        },
        update(cache, { data }) {
            cache.modify({
                fields: {
                    activities(exisitingActivities = []) {
                        const newActivityRef = cache.writeFragment({
                            data: data.insertOneActivity,
                            fragment: gql`
                                fragment NewActivity on Activities {
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
                            `,
                        });
                        return [...exisitingActivities, newActivityRef];
                    },
                },
            });
        },
    });

    const [updateActivity, { data: activity, loading: loadingEdit }] = useMutation(UPDATE_ACTIVITY, {
        onCompleted: (value) => {
            if (value) {
                if (state && state.prevUrl) {
                    navigate(state.prevUrl);
                } else {
                    navigate('/activiteiten/overzicht/gepland')
                }
            }
        },
    });

    const [getActivity, { loading: loadingGetActivity }] = useLazyQuery(GET_ACTIVITY, {
        onCompleted: (resp: any) =>
            reset({
                ...resp.activity,
                startDate: resp.startDate ? format(
                    new Date(resp.activity.startDate * 1000),
                    "yyyy-MM-dd'T'HH:mm"
                ) : null,
                endDate: resp.endDate ? format(
                    new Date(resp.activity.endDate * 1000),
                    "yyyy-MM-dd'T'HH:mm"
                ) : null,
                state: resp.activity.state === "PLANNED" ? false : true
            }),
    });

    useEffect(() => {
        if (activityId) {
            getActivity({
                variables: {
                    query: {
                        _id: activityId,
                    },
                },
            });
        }
    }, []);

    const onSubmit = (data: FormData) => {
        if (activityId) {
            updateActivity({
                variables: {
                    query: {
                        _id: activityId,
                    },
                    set: {
                        activityName: data.activityName,
                        houseNumber: Number(data.houseNumber),
                        postalCode: Number(data.postalCode),
                        startDate: new Date(data.startDate).getTime() / 1000,
                        endDate: new Date(data.endDate).getTime() / 1000,
                        hasCosts: data.hasCosts ? data.hasCosts : false,
                        street: data.street,
                        bus: data.bus,
                        city: data.city,
                        state: !data.state ? "PLANNED" : "NOT_PLANNED",
                        doodleUrl: data.doodleUrl
                    },
                },
            });
        } else {
            addActivity({
                variables: {
                    data: {
                        activityName: data.activityName,
                        houseNumber: Number(data.houseNumber),
                        postalCode: Number(data.postalCode),
                        startDate: new Date(data.startDate).getTime() / 1000,
                        endDate: new Date(data.endDate).getTime() / 1000,
                        hasCosts: data.hasCosts ? data.hasCosts : false,
                        street: data.street,
                        bus: data.bus,
                        city: data.city,
                        state: !data.state ? "PLANNED" : "NOT_PLANNED",
                        doodleUrl: data.doodleUrl
                    },
                },
            });
        }
    };

    console.log(activity)
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{activityId ? `OKRA - '${getValues('activityName')}' bewerken` :  "OKRA - Activiteit toevoegen"}</title>
                <link rel="canonical" href={activityId ? `https://okra-kapelle-op-den-bos.be/activiteiten/${activityId}/bewerken` : "https://okra-kapelle-op-den-bos.be/activiteiten/toevoegen"} />
            </Helmet>
            <div className="section">
                <div className="content">
                    <div className="row">
                        <h5>{activityId ? "Activiteit bewerken" : "Activiteit toevoegen"}</h5>
                    </div>
                    {loadingGetActivity ? <Loading /> :
                        <div className="row">
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="col-12">
                                            <input
                                                type="text"
                                                {...register("activityName", {
                                                    required: true,
                                                })}
                                                placeholder="naam activiteit"
                                                className={
                                                    errors.activityName &&
                                                    "text-danger input-error"
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <input
                                                type="datetime-local"
                                                id="startDate"
                                                {...register("startDate", {
                                                    required: !stateActive,
                                                })}
                                                className={
                                                    errors.startDate &&
                                                    "text-danger input-error"
                                                }
                                            />
                                        </div>
                                        <div className="col-6">
                                            <input
                                                type="datetime-local"
                                                id="endDate"
                                                {...register("endDate", {
                                                    required: !stateActive,
                                                    // validate: (value) =>
                                                    //     !stateActive && value > getValues().startDate,
                                                })}
                                                className={
                                                    errors.endDate &&
                                                    "text-danger input-error"
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <input
                                                type="text"
                                                {...register("street", {
                                                    required: true,
                                                })}
                                                placeholder="straat"
                                                className={
                                                    errors.street &&
                                                    "text-danger input-error"
                                                }
                                            />
                                        </div>
                                        <div className="col-3">
                                            <input
                                                type="number"
                                                {...register("houseNumber", {
                                                    required: true,
                                                })}
                                                placeholder="huisnummer"
                                                className={
                                                    errors.houseNumber &&
                                                    "text-danger input-error"
                                                }
                                            />
                                        </div>
                                        <div className="col-3">
                                            <input
                                                type="text"
                                                {...register("bus")}
                                                placeholder="bus"
                                                className={
                                                    errors.bus &&
                                                    "text-danger input-error"
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <input
                                                type="number"
                                                {...register("postalCode", {
                                                    required: true,
                                                })}
                                                placeholder="postcode"
                                                className={
                                                    errors.postalCode &&
                                                    "text-danger input-error"
                                                }
                                            />
                                        </div>
                                        <div className="col-9">
                                            <input
                                                type="text"
                                                {...register("city", {
                                                    required: true,
                                                })}
                                                placeholder="stad"
                                                className={
                                                    errors.city &&
                                                    "text-danger input-error"
                                                }
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="row">
                                <div className="col-3">
                                    <div className="form-ext-control form-ext-checkbox">
                                        <input
                                            id="check1"
                                            type="checkbox"
                                            {...register("hasCosts")}
                                            placeholder="hasCosts"
                                            className={
                                                errors.hasCosts
                                                    ? "text-danger input-error form-ext-input"
                                                    : "form-ext-input"
                                            }
                                        />
                                        <label
                                            className="form-ext-label"
                                            htmlFor="check1"
                                        >
                                            kosten toevoegen
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                                    <div className="row">
                                        <div className="col-3">
                                            <div className="form-ext-control form-ext-checkbox">
                                                <input
                                                    id="stateCheckbox"
                                                    type="checkbox"
                                                    {...register("state")}
                                                    placeholder="state"
                                                    className={
                                                        errors.state
                                                            ? "text-danger input-error form-ext-input"
                                                            : "form-ext-input"
                                                    }
                                                />
                                                <label
                                                    className="form-ext-label"
                                                    htmlFor="stateCheckbox"
                                                >
                                                    Nog in te plannen?
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {stateActive && (
                                        <div className="row">
                                            <div className="col-12">
                                                <input
                                                    type="text"
                                                    {...register("doodleUrl", {
                                                        required: true,
                                                    })}
                                                    placeholder="url van doodle"
                                                    className={
                                                        errors.doodleUrl &&
                                                        "text-danger input-error"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="row u-flex u-justify-flex-end">
                                        <div className="col-2 u-flex u-justify-flex-end">
                                            <button
                                                type="submit"
                                                className={loadingAdd || loadingEdit ? "btn-primary animated loading hide-text" : "btn-primary"}
                                            >
                                                {activityId ? "bewerken" : "toevoegen"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default AddEditActivity;
