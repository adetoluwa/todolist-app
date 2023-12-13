import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Task from "./components/Task";
import { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  function handleAddTask() {
    setTaskItems([...taskItems, task]);
    setTask(null);
    Keyboard.dismiss();
  }
  
  function completeTask(index) {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  
  return (
    <>
    <StatusBar style="auto" className="bg-primary" backgroundColor="#34a5cf" />
      <View className="px-7 pt-16 h-full w-full bg-gray-200 overflow-y-scroll">
        <Text className="text-2xl font-bold text-center">Today's Tasks</Text>
        <View className="mt-10">
          {taskItems.map((item, index) => {
            return (
              <Task
                key={index}
                text={item}
                delete={() => completeTask(index)}
              ></Task>
            );
          })}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute bottom-5 px-5 w-full flex flex-row justify-around mx-auto"
        enabled={false}
      >
        <TextInput
          className="w-3/4 py-2 px-3 bg-white rounded-lg border border-gray-300"
          placeholder="Write A Task"
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <TouchableOpacity
          className="w-14 h-14 bg-white rounded-full flex justify-center items-center border border-gray-200"
          onPress={() => handleAddTask()}
        >
          <Text className="text-6xl text-primary">+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
});
