import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Pressable,
} from "react-native";

export default function App() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [goalsList, setGoalsList] = React.useState<
    { id: string; title: string }[]
  >([]);

  const inputValueHandler = (newValue: string) => {
    setInputValue(newValue);
  };

  const addGoalHandler = () => {
    if (inputValue.length < 1) return;

    setGoalsList((prevValue) => [
      ...prevValue,
      { id: `g${prevValue.length++}`, title: inputValue },
    ]);
    setInputValue("");
  };

  const clearGoalsHandler = () => {
    setGoalsList([]);
  };

  const removeGoalHandler = (id: string) => {
    setGoalsList((prevValue) => prevValue.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.goalsContainer}>
        {goalsList.length > 0 ? (
          <FlatList
            data={goalsList}
            renderItem={(itemData) => (
              <Pressable
                onPress={removeGoalHandler.bind(null, itemData.item.id)}
              >
                <View style={styles.goal}>
                  <Text style={styles.goalText}>{itemData.item.title}</Text>
                </View>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.goalText}>No goals yet.</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Goal title"
          style={styles.input}
          value={inputValue}
          onChangeText={inputValueHandler}
        />
        <Button title="Add" onPress={addGoalHandler} />
        <Button title="Clear" onPress={clearGoalsHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 60,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  goalsContainer: {
    flex: 5,
  },
  goal: {
    marginVertical: 5,
    paddingVertical: 10,
    borderWidth: 1,
  },
  goalText: {
    fontSize: 16,
    textAlign: "center",
  },
  inputContainer: {
    flex: 1,
    gap: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    paddingBottom: 6,
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
  },
});
