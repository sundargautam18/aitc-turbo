// packages/assets/images.d.ts
declare module "*.png";
declare module "*.jpg";
declare module "*.svg" {
  import * as React from "react";
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
declare module "*.woff2";
