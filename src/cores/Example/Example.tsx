import { useEffect } from "react";

export default function Example(): JSX.Element {
  useEffect(() => {
    console.log("hello");
  }, []);

  return <div>Example</div>;
}
