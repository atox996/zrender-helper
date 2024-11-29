import { Circle, Droplet, Group, init } from "zrender";
import { ZrenderHelper } from "@zrender-helper/core";

const zr = init(document.getElementById("app"), {
  devicePixelRatio,
});
const helper = new ZrenderHelper(zr);

const circle = new Circle({
  shape: {
    cx: 150,
    cy: 50,
    r: 40,
  },
  style: {
    fill: "blue",
    stroke: "#F00",
  },
});
const group = new Group();
const droplet = new Droplet({
  shape: {
    cx: 150,
    cy: 50,
    width: 20,
    height: 50,
  },
});
group.add(droplet);
zr.add(circle);
zr.add(group);

console.log(helper.roots, "roots");
window.helper = helper;

// 版本信息
console.log(`%cBuild Time:  ${__BUILDTIME__}`, "color: #3488ff");
console.log(`%cLast Commit: ${__COMMITID__}`, "color: #3488ff");
