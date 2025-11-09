import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

type CommonTextInputProps = {
  label: string;
  placeholder: string;
  value: any;
  autoCapitalize: any;
  secureText: boolean;
  rightIcon?: any;
  onChangeText: (text: string) => void;
  onPress: () => void | undefined;
  extraStyle: any;
  outlineStyle: any;
  dense: boolean;
};

const CommonTextInput = (props: CommonTextInputProps) => {
  return (
    <TextInput
      mode="outlined"
      style={props.extraStyle}
      autoCapitalize={props.autoCapitalize}
      label={props.label}
      placeholder={props.placeholder}
      contentStyle={styles.text}
      value={props.value}
      secureTextEntry={props.secureText}
      right={<TextInput.Icon icon={props.rightIcon} onPress={props.onPress} />}
      dense={props.dense}
      onChangeText={props.onChangeText}
      outlineStyle={props.outlineStyle}
    />
  );
};

export default CommonTextInput;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PoppinsSemiBold',
  },
});
