import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';
import { ErrorMessage } from "@hookform/error-message";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

var FormData = [];
var KeyUser = ["1"]

export default () => {
  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    }
  });
  
  const onSubmit = data => {
    FormData.push(data)
    console.log(FormData);
    alert(JSON.stringify(data))
  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log('errors', errors);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>First name</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="firstName"
        rules={{ required: true, message:"Neumis" }}
      />



      <Text style={styles.label}>Last name</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="lastName"
        rules={{ required: true }}
      />


      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="something@email.com"
          />
        )}
        name="email"
        type="email"
        rules={{ required: true, pattern: {value: /\S+@\S+\.\S+/, message:"Bad Mail" }}}
      />

      <Text style={styles.label}>Phone Number</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            defaultValue="+420"
            placeholder="+420123456789"
          />
          )}
        name="phone"
        type="phone"
        rules={{ required: true,minLength:13, maxLength:13, pattern: {value: /^[+-]?\d*(?:[.,]\d*)?$/, message:"Bad Number" }}}
      />

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Send"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      {FormData.map(item => (
                  <View>
                    <Text style={styles.card}>
                      First Name: {item.firstName}{"\n"}Last Name: {item.lastName}{"\n"}Email: {item.email}{"\n"}Phone Number: {item.phone}
                    </Text>
                  </View>
                ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  card:{
    flex: 1,
    backgroundColor: "#ec5990",
    borderRadius: 50,
    alignItems: 'center',
    margin: 5,
    marginTop: 40,
    padding: 8,
    color: 'white',
    fontWeight: 'bold'
},
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
