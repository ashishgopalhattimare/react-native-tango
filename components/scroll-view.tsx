import { PropsWithChildren } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

export const ThemedScrollView = ({ children }: PropsWithChildren) => {
  return Platform.select({
    ios: <View style={styles.native}>{children}</View>,
    default: (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {children}
      </ScrollView>
    ),
  });
};

const styles = StyleSheet.create({
  native: {
    overflow: "scroll",
    flex: 1
  }
});
