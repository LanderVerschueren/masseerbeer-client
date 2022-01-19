import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import Activity from '../../../Components/Activity/Activity';
import Loading from '../../../Components/Loading/Loading';

const GET_ACTIVITIES = gql`
    query activities($sortBy: ActivitySortByInput, $query: ActivityQueryInput) {
        activities(sortBy: $sortBy, query: $query) {
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
            created_by
            state
        }
    }
`;

const Planned = () => {
    const { data, loading } = useQuery(GET_ACTIVITIES, {
        variables: {
            query: {
                state: "PLANNED"
            }
        }
    });

    const sortData = () => {
        const sortedData = [...data.activities];

        return sortedData.sort((a: any, b: any) => a.startDate - b.startDate);
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>OKRA - Geplande Activiteiten</title>
                <link rel="canonical" href="https://okra-kapelle-op-den-bos.be/activiteiten/overzicht/gepland" />
            </Helmet>
            {loading ? <Loading /> :
                <div className="row u-wrap">
                    {data && data.activities.length > 0 ?
                        sortData().map(
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
                                    <Activity key={index} index={index} activity={activity} />
                                );
                            }
                        ) : <div className="col-12 u-flex u-items-center u-justify-center"><p>Geen activiteiten</p></div>}
                </div>
            }
        </>
    )
}

export default Planned
