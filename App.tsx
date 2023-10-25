import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddButton from './AddButton';
import { useEffect, useState } from 'react';
import { Todo } from './Todo';
import TodoList from './TodoList';
import CreateTodoModal from './CreateTodoModal';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("todos").then((todos) => {
      if (todos) {
        setTodos(JSON.parse(todos));
      }
    });
  }, [])

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function modifyTodos(newTodos: Todo[]) {
    setTodos(newTodos);
    AsyncStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function addTodo(title: string) {
    const newTodo: Todo = { title, completed: false, id: Math.random().toString() };
    modifyTodos([...todos, newTodo]);
    closeModal();
  }

  function completeTodo(id: string)  {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      }
      return todo;
    });

    modifyTodos(newTodos);
  }

  function deleteTodo (id: string) {
    const newTodos = todos.filter(todo => todo.id !== id);
    modifyTodos(newTodos);
  }

  function saveTodo(id: string, newTitle: string) {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });

    modifyTodos(newTodos);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
        <AddButton onPress={openModal} />
      </View>
      <TodoList todos={todos} onSave={saveTodo} onComplete={completeTodo} onDelete={deleteTodo} />
      <CreateTodoModal visible={modalVisible} onClose={closeModal} onSave={addTodo} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 80,
  },
  header: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
