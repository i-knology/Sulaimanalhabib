import { Button } from "antd";
import { ComponentProps } from "react";

interface HeaderButtonProps extends ComponentProps<typeof Button> {}

export default function HeaderButton({ className, ...rest }: HeaderButtonProps) {
  return (
    <Button
      className={`border-none bg-lightGray !w-11 !h-11 !min-w-0 ${className}`}
      shape="circle"
      {...rest}
    />
  );
}

// const HeaderButton = forwardRef(
//   ({ icon, onClick, ...rest }: { onClick?: () => void; icon: ReactNode }) => {
//     return (
//       <Button
//       onClick={onClick}
//         className="bg-lightGray text-[#03314B] font-bold text-lg border-none hover:bg-[#595BFC] *:
//       flex-shrink-0
//       "
//         {...rest}
//         shape="circle"
//       >
//         {icon}
//       </Button>
//     );
//   }
// );

// export default HeaderButton;
