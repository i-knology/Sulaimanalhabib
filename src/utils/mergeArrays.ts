export function mergeUniqueArrays(arr1, arr2) {
    const mergedMap = new Map();
  
    arr1?.forEach((item) => {
      const normalizedValue = item.value.toLowerCase();
      mergedMap.set(normalizedValue, item);
    });
  
    arr2?.forEach((item) => {
      const normalizedValue = item.value.toLowerCase();
      mergedMap.set(normalizedValue, item);
    });
  
    return Array.from(mergedMap.values());
  }