import React, { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { InputData } from "./InputData";
import { SafeAreaView } from "react-native-safe-area-context";
import { CloseButton } from "./CloseButton";
import { SubmitButton } from "./SubmitButton";
import { ButtonText } from "./ButtonText";
import { FIREBASE_COLLECTIONS, generateFirebaseId } from "../firestore/utils";
import { Tag } from "../model/tag";
import { createTagDocument } from "../services/tag";
import { ColorsInput } from "./ColorsInput";

type AddTagModalProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
};

export const AddTagModal = (props: AddTagModalProps) => {
    const { modalVisible, setModalVisible } = props;
    const [tagName, setTagName] = useState('');
    const [tagColor, setTagColor] = useState('');

    const closeModal = () => {
        setModalVisible(false);
    };

    const addTag = async () => {
        const id = generateFirebaseId(FIREBASE_COLLECTIONS.TAG);

        const newTag: Tag = {
            id,
            name: tagName,
            color: tagColor,
        };

        await createTagDocument(newTag);
        setTagName('');
        setModalVisible(false); // later i could change this to some onError/onSuccess condition
    };

    return (
        <Modal 
        visible={modalVisible} 
        animationType="slide" 
        transparent={true}
        >
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.centeredView}>
                    <View style={styles.content}>
                        <CloseButton onPress={closeModal}/>

                        <Text style={styles.label}> Tag Name: </Text>

                        <InputData 
                        value={tagName}
                        onChangeText={(text) => setTagName(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        />

                        <Text style={styles.label}> Tag Color: </Text>
                        <ColorsInput itemColor={tagColor} setItemColor={setTagColor} />

                       <SubmitButton child={<ButtonText text={'Add Tag'}/>} onPress={addTag} /> 
                    </View>
                </View>
                
            </SafeAreaView>
        </Modal>
        
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 280,
        width: 300,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
    },
    label: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: 600,
    },
});