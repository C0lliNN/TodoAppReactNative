import { FlatList, Text, View, StyleSheet } from "react-native";
import TodoItem from "./TodoItem";
import { Todo } from "../Todo";

type Props = {
  todos: Todo[];
  onSave: (id: string, newTitle: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoList(props: Props) {
  if (props.todos.length === 0) {
    return (
      <View style={styles.noItemsContainer}>
        <Text style={styles.noItemsText}>No todos</Text>
      </View>
    );
  }

  const sortedTodos = props.todos.sort((a, b) => {
    if (a.completed && !b.completed) {
      return 1;
    }

    if (!a.completed && b.completed) {
      return -1;
    }

    return 0;
  });

  return (
    <FlatList
      data={sortedTodos}
      style={styles.list}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <TodoItem
          todo={item.item}
          onDelete={props.onDelete}
          onSave={props.onSave}
          onComplete={props.onComplete}
        />
      )}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    fontSize: 18,
  },
  list: {
    flex: 1,
    width: "100%",
    marginVertical: 30,
  },
});
