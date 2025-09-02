import {useEffect} from "react";
import {useAuth} from "./useAuth";

/**
 * Hook to initialize authentication state on app startup
 * Should be called in the root component (App.tsx or _layout.tsx)
 */
export const useAuthInitializer = () => {
  const {initialize, isInitialized} = useAuth();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  return {isInitialized};
};
