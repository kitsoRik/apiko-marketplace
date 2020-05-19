export const mapFeedbacksIdsToFeedbacks = (ids, feedbacks) =>
	feedbacks.filter(({ id }) => !!ids.find(id));
