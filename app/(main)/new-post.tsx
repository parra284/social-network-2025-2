import Button from "@/components/Button";
import Header from "@/components/Header";
import { colors } from "@/styles/colors";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function NewPost() {
	const [title, setTitle] = useState("");
	const [idea, setIdea] = useState("");

	return (
		<View style={styles.container}>
      <Header 
        title="New Post"
      />
			<View style={styles.mainContent}>
				<Text style={styles.label}>Título</Text>
				<TextInput
					style={styles.input}
					placeholder="Escribe el título..."
					placeholderTextColor={colors.neutral400}
					value={title}
					onChangeText={setTitle}
				/>
				<Text style={styles.label}>Idea</Text>
				<TextInput
					style={[styles.input, styles.textarea]}
					placeholder="Comparte tu idea..."
					placeholderTextColor={colors.neutral400}
					value={idea}
					onChangeText={setIdea}
					multiline
				/>
				<View style={styles.buttonRow}>
					<Button
					label="Publicar"
					onPress={() => (console.log('Publicar clicked'))}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.neutral50,
		paddingHorizontal: 0,
		paddingTop: 20,
	},
	mainContent: {
		flex: 1,
		paddingHorizontal: 18,
		justifyContent: "flex-start",
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		color: colors.primary700,
		marginBottom: 6,
		marginTop: 18,
	},
	input: {
		backgroundColor: colors.neutral100,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.primary100,
		paddingHorizontal: 14,
		paddingVertical: 10,
		fontSize: 15,
		color: colors.neutral900,
		marginBottom: 8,
	},
	textarea: {
		minHeight: 80,
		textAlignVertical: "top",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 24,
	},
	submitText: {
		color: colors.neutral50,
		fontWeight: "500",
	},
})