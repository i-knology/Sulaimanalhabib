import Skeleton from "react-loading-skeleton";

interface Option {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

type RenderSelectOptionsProps = {
  options: Option[];
  isLoading: boolean;
  loadingSkeleton?: React.ReactNode;
};

export const renderSelectOptions = ({
  options,
  isLoading,
  loadingSkeleton = (
    <div className="p-0">
      <Skeleton count={1} height={20} />
    </div>
  ),
}: RenderSelectOptionsProps): Option[] => {
  return isLoading
    ? [
        {
          label: loadingSkeleton,
          value: "",
          disabled: true,
        },
      ]
    : options;
};
