import { useEffect, useRef } from "react";

function useOutsideClick(handler, element) {
  const ref = useRef();
  //used to find the reference we use useRef hook
  useEffect(
    function () {
      function handleClick(e) {
        if (e.target.closest("button") === element) {
          return;
        }
        if (ref.current && !ref.current.contains(e.target)) {
          //console.log(openName);
          //console.log("click out");
          handler();
        }
      }
      //we use true here to handle click only in capturing phase not in bubbling phase
      document.addEventListener("click", handleClick, true);
      return () => {
        document.removeEventListener("click", handleClick, true);
        //console.log("event removed");
      };
    },
    [handler, element]
  );
  return ref;
}
export default useOutsideClick;
