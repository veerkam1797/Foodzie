import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

type Props = {
  label: string;
  extraStyle: any | undefined;
  onPress: () => void;
};

const TextButton = (props: Props) => {
  return (
    <Button
      mode="text"
      onPress={props.onPress}
      labelStyle={[styles.text, props.extraStyle]}>
      {props.label}
    </Button>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PoppinsMedium',
  },
});
