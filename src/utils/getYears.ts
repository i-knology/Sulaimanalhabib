function getYears() {
  const publishYear = Number(import.meta.env?.VITE_PUBLISH_YEAR);
  const currentYear = new Date().getFullYear() + 1;

  if (!publishYear || Number.isNaN(publishYear)) return [];

  const years = Array.from({ length: currentYear - publishYear })
    .fill(publishYear as number)
    .map((year, index) => {
      const value = (year as number) + index;
      return {
        value,
        label: value,
      };
    });
  return years;
}

export const years = getYears();
