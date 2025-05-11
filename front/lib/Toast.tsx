/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

interface CardDatas {
  message: string;
  toggle_message: boolean;
  set_show_message: (value: boolean) => void;
  counter: number;
}

function Toast({
  message,
  toggle_message,
  set_show_message,
  counter,
}: CardDatas) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      set_show_message(false);
    }, 3000);

    // Clear the interval when the component is unmounted or when seconds reach 0
    return () => clearInterval(intervalId);
  }, [toggle_message]);
  return (
    toggle_message &&
    counter > 1 && (
      <div
        id="toast-default"
        className="flex items-center w-full max-w-xs mt-8 p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-100 dark:bg-gray-500"
        role="alert"
      >
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-500">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
            />
          </svg>
        </div>
        <div className="ms-3 text-sm font-normal">{message}</div>
      </div>
    )
  );
}
export default Toast;
