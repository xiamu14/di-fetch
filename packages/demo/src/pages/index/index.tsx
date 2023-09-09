import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useGetPetById } from "@src/api/generated/spec/pet";

export default function Index() {
  const { data, isLoading } = useGetPetById(1);
  useLoad(() => {
    console.log("Page loaded.");
  });

  if (isLoading) return <View>Loading...</View>;

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <Text>{data?.name}</Text>
    </View>
  );
}
