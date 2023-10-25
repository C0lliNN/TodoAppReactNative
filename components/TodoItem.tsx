import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Todo } from "../Todo";
import { useState } from "react";

type Props = {
  todo: Todo;
  onSave: (id: string, newTitle: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem(props: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');

  const titleStyles = props.todo.completed
    ? [styles.title, styles.completed]
    : styles.title;

    function handleSave() {
        props.onSave(props.todo.id, title);
        setEditing(false);
    }

  return (
    <View style={styles.container}>
      {editing ? (
        <>
          <TextInput
            defaultValue={props.todo.title}
            onChangeText={(text) => setTitle(text)}
            onBlur={handleSave}
            autoFocus
            style={styles.input}
          />
          <View style={styles.buttons}>
            <Button title="👍" onPress={handleSave} />
          </View>
        </>
      ) : (
        <>
          <Text style={titleStyles}>{props.todo.title}</Text>
          <View style={styles.buttons}>
            <Button
              title="✏️"
              onPress={() => setEditing(true)}
              disabled={props.todo.completed}
            />
            <Button
              title="✅"
              onPress={() => props.onComplete(props.todo.id)}
              disabled={props.todo.completed}
            />
            <Button title="❌" onPress={() => props.onDelete(props.todo.id)} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 50,
    borderRadius: 4,
    marginBottom: 8,
    borderWidth: 0.2,
  },
  title: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "grey",
  },
  buttons: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  }
});
