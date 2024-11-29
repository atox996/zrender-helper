import type { RectProps } from "zrender";

export interface ZrenderHelperOptions {
  inspection?: boolean;
  rectProps?: Omit<RectProps, "silent"> & {
    extra?: {
      uuid: string;
    };
  };
}
