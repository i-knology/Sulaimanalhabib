export default function normSort(direction: "ascend" | "descend" | null): "asc" | "desc" | null {
    switch (direction) {
      case "ascend":
        return "asc";
      case "descend":
        return "desc";
      default:
        return null;
    }
  }
  
  function normSortColumn(field: string | string[] | null): string | null {
    if (!field) {
      return null;
    }
    if (Array.isArray(field)) {
      return field[field.length - 1];
    }
    return field;
  }
  
  export { normSortColumn };
  