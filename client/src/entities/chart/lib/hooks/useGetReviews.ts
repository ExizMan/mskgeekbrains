import { useLazyGetReviewsQuery } from '@entities/chart';

export const useGetReviews = () => {
    const [reviewTrigger, { data: reviewsData }] = useLazyGetReviewsQuery();

    const reviewsTrigger = async (id: string) => {
        if (id) {
            await reviewTrigger(id);
        }
    };
    return {reviewsData, reviewsTrigger}
};