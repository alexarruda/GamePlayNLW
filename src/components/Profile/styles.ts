import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    user: {
        flexDirection: 'row',
    },
    greeting: {
        fontFamily: theme.fonts.title500,
        fontSize: 24,
        color: theme.colors.heading,
        marginRight: 6,
    },
    username: {
        fontFamily: theme.fonts.title700,
        fontSize: 24,
        color: theme.colors.highlight,
    },
    message: {
        fontFamily: theme.fonts.title700,
        fontSize: 13,
        color: theme.colors.highlight,
    },
    modal : {
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    modalHeader: {
        fontFamily: theme.fonts.title700,
        fontSize: 22,
        color: theme.colors.highlight,
        marginBottom: 20,
        textAlign: 'center',
    },
});