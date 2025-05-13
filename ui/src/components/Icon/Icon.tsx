import { createElement } from "react";
import { type IconBaseProps } from "react-icons";
import { TbTrashX } from "react-icons/tb";

const icons = {
  delete: TbTrashX,
};

type TProps = {
  name: keyof typeof icons;
};

export const Icon = ({ name, ...props }: TProps & IconBaseProps) => {
  return createElement(icons[name], props);
};
