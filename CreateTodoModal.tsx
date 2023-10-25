import { useState } from "react";
import { Button, Modal, TextInput, View, StyleSheet } from "react-native";

type Props = {
    visible: boolean;
    onClose: () => void;
    onSave: (title: string) => void;
}

export default function CreateTodoModal({ visible, onClose, onSave }: Props) {
    const [title, setTitle] = useState("");

    function handleSave() {
        onSave(title);
        setTitle("");
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <TextInput
                    placeholder="Todo title"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
                <View style={styles.buttons}>
                    <Button title="Cancel" onPress={onClose} />
                    <Button title="Save" onPress={handleSave} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    input: {
        borderWidth: 0.2,
        borderRadius: 8,
        padding: 10,
        width: "80%",
        marginBottom: 20,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
    },
});