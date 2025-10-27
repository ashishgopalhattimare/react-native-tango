import { PropsWithChildren } from 'react';
import { Platform, ScrollView, View } from 'react-native';

export const ThemedScrollView = ({ children }: PropsWithChildren) => {
  return Platform.select({
    android: <View style={[{ overflow: 'scroll' }]}>{children}</View>,
    ios: <View style={[{ overflow: 'scroll' }]}>{children}</View>,
    default: (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {children}
      </ScrollView>
    ),
  });
};
