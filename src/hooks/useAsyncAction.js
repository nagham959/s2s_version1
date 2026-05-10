import { useCallback, useState } from "react";
import { normalizeApiError } from "../utils/normalizeApiError";

export const useAsyncAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  const run = useCallback(
    async (action, options = {}) => {
      if (isLoading) return undefined;

      setIsLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const result = await action();
        setSuccess(true);
        return result;
      } catch (err) {
        const normalized = normalizeApiError(err, options);
        setError(normalized);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  return { isLoading, error, success, run, reset };
};

export default useAsyncAction;
