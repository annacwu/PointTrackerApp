import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { InfoPreviewBlock } from "./InfoPreviewBlock";
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
                <Text style={styles.label}>{label}</Text>
                <TouchableOpacity>
                    <Text> see all</Text>
                </TouchableOpacity>
            </View>

            <Spacing vertical={10} />

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.list} horizontal={true}>
                {content.map(item => renderItem(item))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        height: 250,
        padding: 10,
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '20%',
    },
    label: {
        fontSize: 30,
        color: 'black',
    },
    scrollView: {},
    list: {
        flexDirection: 'row',
        width: '100%',
    },
});