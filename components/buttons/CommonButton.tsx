import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

type Props = {
  mode: 'contained' | 'outlined' | 'contained-tonal' | 'elevated' | undefined;
  label: string;
  onPress: () => void;
  extraStyle: any | undefined;
  extraLabelStyle: any | undefined;
};

const CommonButton = (props: Props) => {
  return (
    <Button
      mode={props.mode}
      onPress={props.onPress}
      style={props.extraStyle}
      labelStyle={{fontFamily: 'PoppinsBold', ...props.extraLabelStyle}}>
      {props.label}
    </Button>
  );
};

export default CommonButton;

const styles = StyleSheet.create({});
