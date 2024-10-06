import { CSSObject } from '@emotion/react';
import { breakPoints } from '@styles/breakpoints';

export type FontWeight = number | 'medium' | 'bold' | 'regular' | 'lighter' | 'bolder';
export type ScreenSize = keyof typeof breakPoints;

export interface ResponsiveCSSObjects {
  xs?: CSSObject;
  sm?: CSSObject;
  md?: CSSObject;
  lg?: CSSObject;
}

export type ResponsiveColumns = { [key in ScreenSize]: string | number };
