import { HTMLAttributes, ReactNode } from 'react';
import { FontWeight, ResponsiveCSSObjects } from '@/types/styles';
import { ScreenSize } from '@/types/styles';
import { CSSObject } from '@emotion/react';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  weight?: FontWeight;
  responsiveSize?: { [key in ScreenSize]?: string };
  defaultSize?: string;
  color?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export interface GridProps {
  children: ReactNode;
  columns?: string | number;
  responsiveColumns?: ResponsiveColumns;
  rows?: string | number;
  gap?: number | string;
  columnGap?: number | string;
  rowGap?: number | string;
  style?: CSSObject;
  responsiveStyle?: ResponsiveCSSObjects;
}
