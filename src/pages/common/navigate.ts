declare global {
  interface WindowEventMap {
    "historyChange": HistoryChangeEvent;
  }
}

export interface HistoryChangeEvent extends Event {
  detail: {
    to: string;
    isReplace: boolean;
  }
}

export const navigate = (to: String, isReplace: boolean = false) => {
  const historyChangeEvent = new CustomEvent("historyChange", {
    detail: {
      to,
      isReplace,
    },
  });

  dispatchEvent(historyChangeEvent);
};

export default navigate;
