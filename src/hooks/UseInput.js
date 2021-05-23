import { useState } from "react";

export function useInput(initialValue) {
  const [value, setvalue] = useState(initialValue);
  return [
    {
      value,
      onChange: (e) => setvalue(e.target.value),
    },
    () => setvalue(initialValue),
  ];
}
