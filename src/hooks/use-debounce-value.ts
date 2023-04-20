import { useEffect, useState } from "react";

export default (value: string, time = 250) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debouncedValue;
};