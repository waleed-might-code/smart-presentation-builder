
// Subscription logic removed - all features are now free
export const useSubscription = () => {
  return {
    subscription: null,
    loading: false,
    incrementPresentationCount: async () => {},
    setPaidStatus: async () => {},
    canCreatePresentation: () => true, // Always allow creating presentations
  };
};
