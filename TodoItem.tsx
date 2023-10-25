import { Button, StyleSheet, Text, View } from "react-native";
import { Todo } from "./Todo";

type Props = {
  todo: Todo;
  onSave: (id: string, newTitle: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem(props: Props) {
  const titleStyles = props.todo.completed
    ? [styles.title, styles.completed]
    : styles.title;

  return (
    <View style={styles.container}>
      <Text style={titleStyles}>{props.todo.title}</Text>
      <View style={styles.buttons}>
        <Button
          title="✏️"
          onPress={() => props.onSave(props.todo.id, "test")}
          disabled={props.todo.completed}
        />
        <Button
          title="✅"
          onPress={() => props.onComplete(props.todo.id)}
          disabled={props.todo.completed}
        />
        <Button
          title="❌"
          onPress={() => props.onDelete(props.todo.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginHorizontal: 20,
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
});
