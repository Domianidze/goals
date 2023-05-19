import React from "react";
import { StyleSheet, Modal, View, TextInput, Button } from "react-native";

type PropsType = {
  visible: boolean;
  toggleVisibility: () => void;
  onAddGoal: (inputValue: string) => void;
};

const AddModal: React.FC<PropsType> = (props) => {
  const { visible, toggleVisibility, onAddGoal } = props;

  const [inputValue, setInputValue] = React.useState<string>("");

  const inputValueHandler = (newValue: string) => {
    setInputValue(newValue);
  };

  const addGoalHandler = () => {
    if (inputValue.length < 1) return;

    onAddGoal(inputValue);
    setInputValue("");
    toggleVisibility();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Goal title"
          style={styles.input}
          value={inputValue}
          onChangeText={inputValueHandler}
        />
        <View style={styles.buttonsContainer}>
          <Button title="Cancel" onPress={toggleVisibility} />
          <Button title="Add" onPress={addGoalHandler} />
        </View>
      </View>
    </Modal>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 32,
    gap: 16,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    paddingBottom: 6,
    fontSize: 16,
    borderBottomWidth: 1,
  },
  buttonsContainer: {
    gap: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
});
