import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  CameraType,
  CameraView
} from "expo-camera";
import React, { useRef, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View
} from "react-native";

type ModalCameraProps = {
  onClose: () => void;
  onCapture: (uri: string) => void;
};

export default function ModalCamera({ onClose, onCapture }: ModalCameraProps) {
  const ref = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync({ base64: true });    
    if (photo?.uri) {
      onCapture(photo.uri); 
      onClose();     
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <Modal animationType="slide" transparent={false}>
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          ref={ref}
          facing={facing}
          mute={false}
        />

        {/* Controls */}
        <View style={styles.controls}>
          {/* Close */}
          <Pressable onPress={onClose}>
            <AntDesign name="close" size={36} color="white" />
          </Pressable>

          {/* Shutter */}
          <Pressable onPress={takePicture}>
            <View style={styles.shutterBtn}>
              <View style={styles.shutterBtnInner} />
            </View>
          </Pressable>

          {/* Flip */}
          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={36} color="white" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  controls: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "white",
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  permissionBtn: {
    marginTop: 16,
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
