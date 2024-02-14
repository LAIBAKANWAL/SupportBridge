import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import COLORS from '../../constants/Colors';
import Button from "../components/Button";
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {

  const navigation = useNavigation();
  return (

    <View style={{ flex: 1,backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/images/main.jpg")}
          style={{
            height: 400,
            width: 300,
            borderRadius: 20,
            position: "absolute",
            top: 10,
            borderWidth: 2
          }}
        />
      </View>
      <View style={{
        paddingHorizontal: 22,
        position: "absolute",
        top: 400,
        width: "100%"
      }}>
        <Text style={{
          fontSize: 35,
          fontWeight: 800,
          color: COLORS.black,
          marginTop: 20,
          textAlign: 'center'
        }}>Everyone Can</Text>
        <Text style={{
          fontSize: 35,
          fontWeight: 800,
          color: COLORS.black,
          textAlign: 'center'
        }}>Help Someone</Text>
        <View style={{ marginVertical: 22 }}>
          <Text style={{
            fontSize: 16,
            color: COLORS.grey,
            marginVertical: 4, textAlign: 'center'
          }}>When we give cheerfully and accept gratefully, everyone is blessed</Text>
        </View>

        <Button
          onPress={() => navigation.navigate("Signup")}
          title="Sign Up"
          filled={true}
          width='100%'
          style={{
            marginBottom: 4,
          }}
        />

        <View style={{
          flexDirection: "col",
          marginTop: 12,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Pressable
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{
              fontSize: 16,
              color: COLORS.grey
            }}>Already have an account ? <Text style={{
              fontSize: 16,
              color: COLORS.black,
              fontWeight: "bold",
              marginLeft: 4
            }}>Login</Text></Text>
          </Pressable>

        </View>

      </View>
    </View>

  )
}
export default Onboarding;