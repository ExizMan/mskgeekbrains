import { mainApi } from '@shared/lib';

export const chartApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getReviews: build.query({
            query: (id: string) => ({
                url: `/bot/api/review/${id}/get_by_observer/`,
                method: 'GET',
            }),
        }),

    }),
});
export const { useLazyGetReviewsQuery } = chartApi;