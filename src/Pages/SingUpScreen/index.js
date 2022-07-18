import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Platform,
    Dimensions
} from "react-native";
import { theme } from "../../global/theme";
import HomeCinemaSvg from "../../assets/undraw_home_cinema_l7yl 1.svg";
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { InputWithIcon } from "../../components/InputWithIcon";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { navigateAndReset } from "../../components/publicFunctions/navigateAndReset";
import { myApiFunctions } from "../../services/backend";

const bannerHeight = parseInt(Math.round((Dimensions.get("screen").height) * 0.4).toFixed(0));
export function SingUpScreen() {

    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [nameText, setNameText] = useState("");
    const [canShowErrorMessage, setCanShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigation = useNavigation();

    async function handleSubmit() {
        const data = await myApiFunctions.register({ email: emailText, password: passwordText, name: nameText });


        if (data.error) {
            setCanShowErrorMessage(true);
            setErrorMessage(data.msg);
            return;
        }

        console.log(data);
        setCanShowErrorMessage(false);



        navigateAndReset(navigation, "TabBarNavigator");
    }

    function handleEmailTextChange(text) {
        setEmailText(text);
    }
    function handlePasswordTextChange(text) {
        setPasswordText(text);
    }

    function handleNameTextChange(text) {
        setNameText(text);
    }




    return (
        <KeyboardAwareScrollView
            style={styles.container}
            alwaysBounceVertical={false}
            extraScrollHeight={30}
        >


            <SafeAreaView style={styles.bannerContainer}>
                <HomeCinemaSvg height="100%" style={styles.banner} />
            </SafeAreaView>


            <View style={[styles.content, { justifyContent: "flex-end" }]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Register</Text>
                    {
                        canShowErrorMessage && (
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        )
                    }
                </View>

                <View style={styles.inputsContainer}>

                    <InputWithIcon placeholder="Your email" Icon={<MaterialIcons name="email" size={24} color={theme.colors.text} />} onChangeText={handleEmailTextChange} keyboardType="email-address" autoCapitalize="none" />
                    <InputWithIcon placeholder="Your Name" Icon={<FontAwesome name="user" size={24} color={theme.colors.text} />} onChangeText={handleNameTextChange} autoCapitalize="none" />
                    <InputWithIcon placeholder="Your password" Icon={<FontAwesome5 name="key" size={24} color={theme.colors.text} />} secureTextEntry={true} onChangeText={handlePasswordTextChange} autoCapitalize="none" />
                    <PrimaryButton color={theme.colors.primary} text="Create account" textColor={theme.colors.text} onPress={handleSubmit} />

                    <View style={styles.bottomInfo}>
                        <Text style={styles.text}>Join us before?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigateAndReset(navigation, "LogInScreen");
                            }}
                        >
                            <Text style={[styles.text, {
                                color: theme.colors.text,
                                fontWeight: "bold",
                                marginLeft: 4,
                            }]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


        </KeyboardAwareScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    bannerContainer: {
        height: bannerHeight,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    banner: {

    },
    titleContainer: {
        marginHorizontal: 24,

    },
    title: {
        fontSize: 40,
        color: theme.colors.text,
        fontWeight: 'bold',
    },
    errorMessage: {
        color: theme.colors.secondary,
        marginTop: 8,
        fontWeight: 'bold',
        fontSize: 16
    },
    inputsContainer: {
        marginHorizontal: 24,
    },
    bottomInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 29

    },
    text: {
        color: theme.colors.secondaryInformation,
        fontSize: 14,
    }
})