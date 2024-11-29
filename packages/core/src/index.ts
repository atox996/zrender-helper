import { Element, Rect, type ElementEvent, type ZRenderType } from "zrender";
import { uniqueName } from "./utils";
import type { ZrenderHelperOptions } from "./type";
import { merge } from "zrender/lib/core/util";
import { OPTIONS } from "./constants";

export class ZrenderHelper {
  zr: ZRenderType;

  options = OPTIONS;

  get roots() {
    return this.zr.storage.getRoots().filter((el) => el !== this.#rect);
  }

  #rect = new Rect({ silent: true });

  constructor(zr: ZRenderType, options: ZrenderHelperOptions = {}) {
    this.zr = zr;
    this.zr.add(this.#rect);
    this.updateOptions(options);
  }
  updateOptions(options: ZrenderHelperOptions) {
    this.options = merge(this.options, options);
    if (this.options.inspection) {
      this.zr.on("mousemove", this.onMouseMove, this);
    } else {
      this.zr.off("mousemove", this.onMouseMove);
    }
    this.#rect.attr({
      ...this.options.rectProps,
    });
  }
  update(el: Element) {
    const rect = el.getBoundingRect();
    this.#rect.attr({
      shape: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      },
      extra: {
        uuid: uniqueName(el),
      },
    });
  }
  show() {
    this.#rect.show();
  }
  hide() {
    this.#rect.hide();
  }

  onMouseMove(e: ElementEvent) {
    if (e.target) {
      this.update(e.target);
      this.show();
    } else {
      this.hide();
    }
  }

  dispose() {
    this.zr.remove(this.#rect);
    this.zr.off("mousemove", this.onMouseMove);
  }
}
