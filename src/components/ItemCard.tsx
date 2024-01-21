import React from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";


interface FileCardProps {
  name: string;
  ".tag": string;
}

const getFileIcon = (tag: string) => {
  const tagToIcon = {
    file: 'file1',
    folder: 'folder1',
  };

  const iconName = tagToIcon[tag] || 'file1';
  return <AntDesign name={iconName} size={80} />;
};

function FileCard(props: FileCardProps) {
  return (
    <View style={styles.container}>
      {getFileIcon(props[".tag"])}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    width: '33.33%', 
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#888888",
  },
});

export default FileCard;
