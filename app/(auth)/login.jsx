import { View, Image, Alert, ImageBackground } from "react-native";
import React, { useState } from "react";
import { images } from "../../constants/images";
import FormField from "../../components/forms/FormField";
import CustomButton from "../../components/buttons/CustomButton";
import Heading from "../../components/texts/Heading";
import Text from "../../components/texts/Text";
import { Link } from "expo-router";

import { useAuth } from "../../authProvider/AuthProvider";

const Login = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  const { onLogin } = useAuth();
  const handleLogin = async () => {
    try {
      setisSubmitting(true);
      console.log(form.email, form.password);
      await onLogin(form.email, form.password);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message || "Failed to login");
    } finally {
      setisSubmitting(false);
    }

    setisSubmitting(false);
  };

  const isFormValid = () => {
    return form.email && form.password;
  };

  return (
    <ImageBackground
      source={images.background}
      resizeMode="cover"
      className="h-full w-full"
    >
      <View className="p-6">
        <View className="w-full justify-center min-h-[75vh] px-4 my-10">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[215px] h-[65px] justify-center mx-auto"
          />
          <Heading className="text-32 mt-4 text-center">Log in</Heading>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setform({ ...form, email: e })}
            otherStyles="mt-4"
            keyboardType="email-address"
            placeholder={"Your email"}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyles="mt-4"
            placeholder={"Your password"}
          />

          <CustomButton
            title="Login"
            handlePress={handleLogin}
            containerStyles="mt-7 bg-primary"
            isLoading={isSubmitting}
            disabled={!isFormValid() || isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-base">Don't have an account?</Text>
            <Link className="text-base text-primary" href="/register">
              Sign up here
            </Link>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
