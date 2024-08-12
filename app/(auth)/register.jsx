import { View, Image, Alert, ImageBackground } from "react-native";
import React, { useState } from "react";
import { images } from "../../constants/images";
import FormField from "../../components/forms/FormField";
import CustomButton from "../../components/buttons/CustomButton";
import Heading from "../../components/texts/Heading";
import Text from "../../components/texts/Text";
import { Link } from "expo-router";
import { useAuth } from "../../authProvider/AuthProvider";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { onRegister, onLogin } = useAuth();

  const handleRegistration = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      // Validate email format
      if (!/\S+@\S+\.\S+/.test(form.email)) {
        throw new Error("Please enter a valid email address.");
      }
      const registrationResult = await onRegister(
        form.username,
        form.email,
        form.password
      );

      if (registrationResult.data.success) {
        await onLogin(form.email, form.password);
      } else {
        setErrorMessage(registrationResult.data.message);
        Alert.alert("Registration Error", registrationResult.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return form.username && form.email && form.password;
  };

  return (
    <ImageBackground
      source={images.background}
      resizeMode="cover"
      className="h-full w-full"
    >
      <View className="p-6">
        <View className="w-full justify-center min-h-[75vh] px-4 my-10 ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[215px] h-[65px] justify-center mx-auto"
          />
          <Heading className="text-32 mt-4 text-center">Sign Up</Heading>

          {errorMessage ? (
            <Text className="text-red-500 text-center mt-4">
              {errorMessage}
            </Text>
          ) : null}

          <FormField
            title="Name"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            placeholder="Your Name"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-4"
            keyboardType="email-address"
            placeholder="Your email"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
            placeholder="Your password"
          />

          <CustomButton
            title="Register"
            handlePress={handleRegistration}
            containerStyles="mt-7 bg-primary"
            isLoading={isSubmitting}
            disabled={!isFormValid() || isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-base">Have an account already?</Text>
            <Link className="text-base text-primary" href="/login">
              Login here
            </Link>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Register;
