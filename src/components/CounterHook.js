import React, { useState, useEffect } from "react";
// import useEventListener from "./hook_utils/useEventListener";
import CounterBox from "../containers/CounterBox";

export default () => {
	const [count, setCount] = useState(50);

	useEffect(() => {
        document.querySelector("x-counter").addEventListener("incrementClick", (e) => {
            setCount(count + 1);
        });

        return () => {
            document.querySelector("x-counter").removeEventListener("incrementClick", (e) => {
                setCount(count + 1);
            });
        }
    }, [count, setCount]);

    useEffect(() => {
        document.querySelector("x-counter").addEventListener("decrementClick", (e) => {
            setCount(count - 1);
        });

        return () => {
            document.querySelector("x-counter").removeEventListener("decrementClick", (e) => {
                setCount(count - 1);
            });
        }
    }, [count, setCount]);

	return (
		<>
            <CounterBox>
                <h5>Imperative Counter</h5>
                <x-counter value={count}></x-counter>
            </CounterBox>
		</>
	);
};
