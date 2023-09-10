import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { addPet, useGetPetById } from "@src/api/generated/spec/pet";

export default function Index() {
  const { data, isLoading, error } = useGetPetById(12123);
  // const { data: pets, isLoading: isLoading2 } = useFindPetsByStatus({
  //   status: ["pending", "available"],
  // });
  useLoad(() => {
    console.log("Page loaded.");
  });
  const handleAddPet = () => {
    addPet({
      name: "",
      photoUrls: [""],
    });
  };

  if (error) {
    console.log(error.statusCode);
  }

  if (isLoading) return <View>Loading...</View>;

  // if (isLoading2) return <View>Loading2...</View>;

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <Text onClick={handleAddPet}>{data?.name}</Text>
      {/* {pets?.map((pet) => {
        return <Text key={pet.id}>{pet?.name}</Text>;
      })} */}
    </View>
  );
}
