import Header from "@/components/Header";
import { DataContext } from "@/contexts/DataContext";
import { colors } from "@/styles/colors";
import { ChatWithName } from "@/types/common.type";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function index() {
  const router = useRouter();

  const { getChats, createChat } = useContext(DataContext)
  const [chats, setChats] = useState<ChatWithName[]>([]); 

  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [otherUsername, setOtherUsername] = useState("");

  useEffect(() => {
    loadChats();
  }, [])

  const loadChats = async () => {
    try {
      const response = await getChats();
      setChats(response);
    } catch(error) {
      Alert.alert("Error", "No se cargaron los chats")
    }
  };

  const handleNewChat = async () => {
    setShowNewChatModal(true);
  };

  const createChatFromModal = async () => {
    try {
      const newChat = await createChat(otherUsername);
      setChats((prev) => [...prev, newChat]);
      setOtherUsername("");
      setShowNewChatModal(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo crear el chat");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header: Logo and App Name */}
      <Header 
        title="Chats"
      />
      <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
        <Text style={styles.newChatButtonText}>+ New Chat</Text>
      </TouchableOpacity>

      <View style={styles.mainContent}>
        {chats?.map((value) => (
          <TouchableOpacity 
            key={value.id}
            style={styles.chatSpaceContainer}
            onPress={() => router.push({
              pathname: "/(main)/chat/[id]", 
              params: { id: value.id },
            })}
          >
          <View style={styles.chatTextContainer}>
            <Text style={styles.chatName}>Chat with {value.name}</Text>
            <Text style={styles.lastMessage} numberOfLines={1}>
              ¡Hola! Este es el último mensaje recibido.
            </Text>
          </View>
        </TouchableOpacity>
        ))}
      </View>
      <Modal visible={showNewChatModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Chat</Text>

            <TextInput
              placeholder="Enter other's username"
              value={otherUsername}
              onChangeText={setOtherUsername}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelBtn]}
                onPress={() => {
                  setOtherUsername("");
                  setShowNewChatModal(false);
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmBtn]}
                onPress={createChatFromModal}
              >
                <Text style={styles.confirmText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral50,
    paddingTop: 20,
  },
  newChatButton: {
    backgroundColor: colors.primary600,
    marginHorizontal: 18,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  newChatButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  chatSpaceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary100,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    width: "100%",
    shadowColor: colors.primary900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chatTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  chatName: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary700,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.neutral700,
  },

  /* Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: colors.primary700,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  cancelBtn: {
    marginRight: 8,
    backgroundColor: "#f1f1f1",
  },
  confirmBtn: {
    backgroundColor: colors.primary600,
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "700",
  },
});