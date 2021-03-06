import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        width: 62,
        height: 62,
        borderRadius: 8,
        backgroundColor: theme.colors.discord,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 62,
        height: 62,
    },
});