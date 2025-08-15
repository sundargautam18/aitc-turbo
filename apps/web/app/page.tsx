"use client"
import { axiosClient } from "@repo/axios-client";
import { add } from "@repo/math/add";
import { useCounter } from "@repo/react-hooks";
import Sample from "@repo/ui/sample";
export default function Page() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <>
      <h1>Web {count}</h1>
      <Sample />
      <button onClick={() => alert(add(2, 3))}>Click me</button>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => {
        axiosClient.get("/api/data").then((response) => {
          console.log(response.data);
        });
      }}>Fetch</button>
    </>
  );
}
