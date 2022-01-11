import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { formatISO } from "date-fns";
import format from "date-fns/format";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

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
        }
    }
`;

const AddEditActivity = () => {
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        reValidateMode: "onChange",
    });
    const { activityId }: any = useParams();
    const navigate = useNavigate();

    const [addActivity] = useMutation(ADD_ACTIVITY, {
        onCompleted: (value) => {
            if (value) {
                navigate("/activiteiten");
            }
        },
        update(cache, { data }) {
            console.log(data);
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
                                }
                            `,
                        });
                        return [...exisitingActivities, newActivityRef];
                    },
                },
            });
        },
    });

    const [updateActivity] = useMutation(UPDATE_ACTIVITY, {
        onCompleted: (value) => {
            if (value) {
                navigate("/activiteiten");
            }
        },
    });

    const [getActivity] = useLazyQuery(GET_ACTIVITY, {
        onCompleted: (resp: any) =>
            reset({
                ...resp.activity,
                startDate: format(
                    new Date(resp.activity.startDate * 1000),
                    "yyyy-MM-dd'T'HH:mm"
                ),
                endDate: format(
                    new Date(resp.activity.endDate * 1000),
                    "yyyy-MM-dd'T'HH:mm"
                ),
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
    }, [activityId, getActivity]);

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
                    },
                },
            });
        }
    };

    console.log(getValues());

    return (
        <div className="section">
            <div className="content">
                <div className="row">
                    <h5>Activiteit toevoegen</h5>
                </div>
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
                                            required: true,
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
                                            required: true,
                                            validate: (value) =>
                                                value > getValues().startDate,
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
                                <div className="col-2">
                                    <button
                                        type="submit"
                                        className="btn-primary"
                                    >
                                        {activityId ? "bewerken" : "toevoegen"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditActivity;
