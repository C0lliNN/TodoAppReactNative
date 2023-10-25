import { Button } from "react-native";

type Props = {
  onPress: () => void;
};

export default function AddButton({ onPress }: Props) {
  return (
    <Button title="+ Add" accessibilityLabel="Add a new item" onPress={onPress} />
  );
}
