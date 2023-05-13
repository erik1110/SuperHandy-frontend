const { req } = useHttp();

export const getCompletedCases = () => req("GET", `/home/completed-cases`);
export const getTaskStats = () => req("GET", `/home/task-stats`);
export const getExcellentHelpers = () => req("GET", `/home/excellent-helpers`);
export const getCompletedReviews = () => req("GET", `/home/completed-reviews`);
