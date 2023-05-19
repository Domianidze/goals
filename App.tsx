import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  FlatList,
  Pressable,
} from "react-native";

import AddModal from "./components/AddModal";

export default function App() {
  const [addModal, setAddModal] = React.useState<boolean>(false);
  const [goalsList, setGoalsList] = React.useState<
    { id: string; title: string }[]
  >([]);

  const toggleAddModal = () => {
    setAddModal((prevState) => !prevState);
  };

  const addGoalHandler = (inputValue: string) => {
    setGoalsList((prevValue) => [
      ...prevValue,
      { id: `g${prevValue.length++}`, title: inputValue },
    ]);
  };

  const removeGoalHandler = (id: string) => {
    setGoalsList((prevValue) => prevValue.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.mainContainer}>
      <AddModal
        visible={addModal}
        toggleVisibility={toggleAddModal}
        onAddGoal={addGoalHandler}
      />
      <View style={styles.goalsContainer}>
        {goalsList.length > 0 ? (
          <FlatList
            data={goalsList}
            renderItem={(itemData) => (
              <View style={styles.goal}>
                <Text style={styles.goalText}>{itemData.item.title}</Text>
                <Pressable
                  onPress={removeGoalHandler.bind(null, itemData.item.id)}
                >
                  <Image
                    source={require("./assets/img/x-icon.png")}
                    style={styles.goalDeleteIcon}
                  />
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.goalText}>No goals yet.</Text>
        )}
      </View>
      <Button title="Add new goal" onPress={toggleAddModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  goalsContainer: {
    flex: 5,
    paddingHorizontal: 32,
  },
  goal: {
    marginVertical: 5,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  goalText: {
    fontSize: 16,
    textAlign: "center",
  },
  goalDeleteIcon: {
    width: 20,
    height: 20,
  },
});
