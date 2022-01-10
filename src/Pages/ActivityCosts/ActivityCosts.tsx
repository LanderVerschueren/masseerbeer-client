import { gql, useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { commonHeights } from "../../__helpers__/common";

const Container = styled.div`
    margin-top: ${commonHeights.navHeight}px;
`;

const GET_ACTIVITY_COSTS = gql`
    query GetActivityCosts($fkActivityId: ID) {
        getActivityCosts(fkActivityId: $fkActivityId) {
            costs {
                name
                amount
            }
            fkActivityId
        }
    }
`;

const ADD_ACTIVITY_COSTS = gql`
    mutation Mutation($costs: ActivityCostsInput) {
        addCosts(costs: $costs) {
            costs {
                name
                amount
            }
            fkActivityId
        }
    }
`;

const ActivityCosts = () => {
    const {
        register,
        control,
        getValues,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const { fields, append, prepend, remove, swap, move, insert } =
        useFieldArray({
            control,
            name: "costs",
        });
    watch("costs");

    const [getActivityCosts] = useLazyQuery(GET_ACTIVITY_COSTS, {
        onCompleted: ({ getActivityCosts }) => {
            reset({ costs: getActivityCosts.costs });
        },
    });
    const [addCosts, { data, loading, error }] =
        useMutation(ADD_ACTIVITY_COSTS);
    const { activityId }: any = useParams();

    useEffect(() => {
        if (activityId) {
            getActivityCosts({
                variables: {
                    fkActivityId: activityId,
                },
            }).then((resp: any) =>
                reset({
                    costs: resp.getAllActivityCosts.costs,
                })
            );
        }
    }, [activityId]);

    const getAllCosts = (input: any) => {
        const { costs } = getValues();
        let total = 0;
        if (costs) {
            costs.forEach((field: any) => (total += Number(field.amount)));
        }

        return total;
    };

    const onSubmit = (data: any) => {
        const variables = {
            costs: {
                costs: data.costs.map((cost: any) => ({
                    name: cost.name,
                    amount: Number(cost.amount),
                })),
                fkActivityId: activityId,
            },
        };
        addCosts({
            variables: { ...variables },
        });
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="section">
                    <div className="content">
                        {fields.length > 0 &&
                            fields.map((field, index) => (
                                <div className="row" key={field.id}>
                                    <div className="col-8">
                                        <input
                                            type="text"
                                            {...register(
                                                `costs.${index}.name`,
                                                {
                                                    required: true,
                                                }
                                            )}
                                            placeholder="naam kost"
                                            // className={
                                            //     errors &&
                                            //     errors.costs[index].name &&
                                            //     "text-danger input-error"
                                            // }
                                        />
                                    </div>
                                    <div className="col-4 u-text-center">
                                        <input
                                            type="number"
                                            {...register(
                                                `costs.${index}.amount`,
                                                {
                                                    required: true,
                                                }
                                            )}
                                            placeholder="bedrag"
                                            className="u-text-center"
                                            // className={
                                            //     errors &&
                                            //     errors.costs[index].amount &&
                                            //     "text-danger input-error"
                                            // }
                                        />
                                    </div>
                                </div>
                            ))}
                        {fields.length > 0 && (
                            <div className="row u-flex u-justify-flex-end u-text-center">
                                <div className="col-4">
                                    <p className="font-bold">
                                        € {getAllCosts(fields)}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="row u-flex u-justify-flex-end">
                            <div className="col-4">
                                <button
                                    onClick={() =>
                                        append({ name: "", amount: 0 })
                                    }
                                    style={{ width: "100%" }}
                                >
                                    kost toevoegen
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <button type="submit" className="btn-primary">
                                    kosten opslaan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Container>
    );
};

export default ActivityCosts;
