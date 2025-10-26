import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  isTransparent?: boolean;
};

export function ThemedView({ style, lightColor, darkColor, isTransparent, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const bgStyle = isTransparent ? undefined : backgroundColor;
  return <View style={[{ backgroundColor: bgStyle }, style]} {...otherProps} />;
}
