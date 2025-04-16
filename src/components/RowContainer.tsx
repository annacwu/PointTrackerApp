import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Spacing } from "./Spacing";

type RowContainerProps<T> = {
    label: string;
    content: T[];
    renderItem: (item: T) => React.ReactNode;
}

export const RowContainer = <T,>(props: RowContainerProps<T>) => {
    const { label, content, renderItem } = props;

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Spacing horizontal={5} />
                <Text style={styles.label}>{label}</Text>
                <Spacing horizontal={5} />
                <TouchableOpacity>
                    <Text>see all</Text>
                </TouchableOpacity>
            </View>

            <Spacing vertical={5} />

            <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                <Spacing horizontal={5} />
                <View style={styles.list}>
                    {content.map(item => renderItem(item))}
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
        flexDirection: 'row',
        alignItems: 'baseline',
        height: '20%',
    },
    label: {
        fontSize: 30,
        color: 'black',
    },
    scrollView: {
        width: '100%',
        flex: 1,
    },
    list: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        width: '100%',
    },
});