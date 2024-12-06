import normSort, { normSortColumn } from "@/utils/sort";

interface ApiOptionsState {
  searchKeyword: string | null;
  pageSize: number;
  pageIndex: number;
  sortType: string | null; //"asc" | "desc";
  sortField: string;
  isActive: boolean | null;
}

interface SearchAction {
  type: "search";
  payload: string;
}

interface PaginateAction {
  type: "paginate";
  payload: {
    pageSize: number;
    current: number;
  };
}

interface SortAction {
  type: "sort";
  payload: {
    order: "ascend" | "descend" | null;
    field: string;
  };
}

interface StatusAction {
  type: "status";
  payload: boolean | null;
}

type ApiOptionsAction =
  | SearchAction
  | PaginateAction
  | SortAction
  | StatusAction;

const initialState: ApiOptionsState = {
  searchKeyword: null,
  pageSize: 10,
  pageIndex: 1,
  sortType: "desc",
  sortField: "createdAt",
  isActive: null,
};

export default function ApiOptions(
  state: ApiOptionsState = initialState,
  action: ApiOptionsAction
): ApiOptionsState {
  switch (action.type) {
    case "search":
      return {
        ...state,
        searchKeyword: action.payload.trim() || null,
      };
    case "paginate":
      return {
        ...state,
        pageSize: action.payload.pageSize,
        pageIndex: action.payload.current,
      };
    case "sort":
      return {
        ...state,
        sortType: action.payload.order
          ? normSort(action.payload.order)
          : "desc",
        sortField: normSortColumn(action.payload.field) || "createdAt",
      };
    case "status":
      return {
        ...state,
        isActive: action.payload,
      };
    default:
      return state;
  }
}

export { initialState };
