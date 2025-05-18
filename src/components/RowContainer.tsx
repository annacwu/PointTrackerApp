import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from "react-native";
import { Spacing } from "./Spacing";

type RowContainerProps<T> = {
  label: string;
  content: T[];
  renderItem: (item: T) => React.ReactNode;
  heading: boolean;
  customStyles?: ViewStyle;
};

export const RowContainer = <T,>(props: RowContainerProps<T>) => {
  const { label, content, renderItem, heading, customStyles = {} } = props;

  const listStyles: ViewStyle = {
    ...styles.list,
    ...customStyles,
  };

  return (
    <View style={styles.container}>
      {heading && (
        <View style={styles.heading}>
          <Text style={styles.label}>{label}</Text>
          <Spacing horizontal={5} />
          <TouchableOpacity style={styles.seeButton}>
            <Text>See All</Text>
          </TouchableOpacity>
        </View>
      )}

      <Spacing vertical={5} />

      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <Spacing horizontal={5} />
        <View style={listStyles}>
          {content.map((item) => renderItem(item))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
  },
  heading: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    height: "20%",
  },
  label: {
    marginLeft: 10,
    fontSize: 30,
    color: "black",
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
  list: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    minWidth: "100%",
  },
  seeButton: {
    margin: 10,
  },
});
