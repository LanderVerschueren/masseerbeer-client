import { format } from 'date-fns'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface ActivityProps {
    index: number;
    activity: any;
}

const Activity = ({ index, activity }: ActivityProps) => {
    const { pathname} = useLocation();

    return (
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
                            {activity.startDate ? format(
                                new Date(
                                    activity.startDate *
                                    1000
                                ),
                                "dd/MM/yyyy"
                            ) : "TBD"}
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
                            {activity.endDate ? format(
                                new Date(
                                    activity.endDate *
                                    1000
                                ),
                                "dd/MM/yyyy"
                            ) : "TBD"}
                        </p>
                    </div>
                </div>
                <div className="card__action-bar u-flex u-justify-flex-end">
                    <Link
                        to={`../../details/${activity._id}`}
                        state={{
                            prevUrl: pathname
                        }}
                        className="btn btn-transparent"
                    >
                        details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Activity
