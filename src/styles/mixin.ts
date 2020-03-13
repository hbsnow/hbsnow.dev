import { colors } from './const'
import Color from 'color'

/**
 * 背景色の明るさをから、最適なフォントカラーを戻す
 * @param bgColor 背景色
 */
export const textColor = (bgColor: string): string =>
  Color(bgColor).isLight() ? colors.text.light : colors.text.dark