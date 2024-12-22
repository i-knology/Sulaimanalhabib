// declare module "*.svg" {
//   const content: React.FC<React.SVGProps<SVGElement>>;
//   export default content;
// }

declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  // export { ReactComponent };

  export default ReactComponent;
}
