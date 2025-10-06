import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";
import { colors } from "@/styles/colors";
import { Message } from "@/types/common.type";
import { supabase } from "@/utils/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Chat() {
  const { id, name } = useLocalSearchParams<{ id: string, name: string }>();

  const { getMessages, sendMessage } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel(`chat-${id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newMsg = payload.new as any;

            const mappedMsg: Message = {
              id: newMsg.id,
              text: newMsg.text,
              sentBy: newMsg.sent_by, // 👈 usa el nombre real de tu columna,
              sentAt: newMsg.sent_at,
              chatId: newMsg.chat_id,
              createdAt: newMsg.created_at,
            };

            setMessages((prev) => [...prev, mappedMsg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const loadMessages = async () => {
    const res = await getMessages(id);
    setMessages(res);
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(id, text, user.id);
    setText("");
  };

  return (
    <LinearGradient
      colors={[colors.primary50, colors.primary200, colors.primary400]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* Header estilo WhatsApp */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{name}</Text>
        </View>

        {/* Mensajes */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isMine = item.sentBy === user.id;
            return (
              <View
                style={[
                  styles.messageBubble,
                  isMine ? styles.myMessage : styles.theirMessage,
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            );
          }}
          contentContainerStyle={styles.messagesContainer}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Escribe un mensaje..."
            placeholderTextColor={colors.neutral600}
          />
          <TouchableOpacity onPress={handleSend} style={styles.button} >
            <Text>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 50, 
    backgroundColor: colors.primary50
  },
  header: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary200,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.neutral900,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
  },
  myMessage: {
    backgroundColor: colors.primary300,
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    backgroundColor: colors.neutral200,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: colors.neutral900,
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.neutral400,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginRight: 4,
    marginBottom: 8,
    backgroundColor: "white",
    color: colors.neutral50,
  },
  button: {
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.primary300
  }
});
