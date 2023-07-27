import classNames from "classnames";
import {
  FunctionComponent,
  MouseEventHandler,
  ReactElement,
  useCallback,
} from "react";
import { createPortal } from "react-dom";

import "./styles.css";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { usePortal } from "../../hooks/usePortal";

interface PropTypes {
  children: ReactElement;
  clickCallback?: MouseEventHandler;
  maskClass?: string;
  isLockBodyScroll?: boolean;
  // 是否透明
  isTransparent?: boolean;
  // 位置
  position?: "center";
}

export const Mask: FunctionComponent<PropTypes> = ({
  children,
  clickCallback,
  maskClass,
  isLockBodyScroll = true,
  isTransparent = false,
  position,
}): ReactElement => {
  const target = usePortal("root");
  useLockBodyScroll(isLockBodyScroll);

  const onMaskClick = useCallback(
    (e: never) => {
      clickCallback?.(e);
    },
    [clickCallback]
  );
  return createPortal(
    <div
      id="refs"
      className={classNames("mask", maskClass, {
        maskTransparent: isTransparent,
        maskPositionCenter: position === "center",
      })}
      onClick={onMaskClick}
      aria-hidden
    >
      {children}
    </div>,
    target
  );
};
