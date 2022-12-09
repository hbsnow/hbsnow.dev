import { useCallback, useEffect, useReducer } from "react";

import { debounce } from "throttle-debounce";

type State = {
  button: boolean;
  hidden: boolean;
};

type Action =
  | {
      type: "enableButton";
    }
  | {
      type: "disableButton";
    }
  | {
      type: "toggle";
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "enableButton": {
      return {
        ...state,
        button: true,
        hidden: true,
      };
    }
    case "disableButton": {
      return {
        ...state,
        button: false,
        hidden: false,
      };
    }
    case "toggle": {
      return {
        ...state,
        hidden: !state.hidden,
      };
    }
  }
};

export const useToc = (id: string, wideWidth: number) => {
  const [tocState, dispatch] = useReducer(reducer, {
    button: true,
    hidden: true,
  });

  const toggle = useCallback(() => {
    dispatch({ type: "toggle" });
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(
      debounce<ResizeObserverCallback>(300, (entries) => {
        entries.forEach((entry) => {
          if (entry.contentRect.width > wideWidth) {
            dispatch({ type: "disableButton" });
          } else {
            dispatch({ type: "enableButton" });
          }
        });
      })
    );
    const target = document.querySelector(`#${id}`);
    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [id]);

  return [tocState, toggle] as const;
};
