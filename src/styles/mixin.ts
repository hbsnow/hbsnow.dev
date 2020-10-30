import Color from "color";

import { colors } from "./const";

/**
 * 背景色の明るさをから、最適なフォントカラーを戻す
 * @param bgColor 背景色
 */
export const textColor = (bgColor: string, type = "text"): string =>
  Color(bgColor).isLight() ? colors[type].light : colors[type].dark;
