import {StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

type Props = {
  variant: any;
  text: string;
  extraTextStyle: any;
  lines: any | null;
};

const TextBody = (props: Props) => {
  return (
    <Text
      variant={`body${props.variant}`}
      style={[styles.text, props.extraTextStyle]}
      numberOfLines={props.lines}>
      {props.text}
    </Text>
  );
};

export default TextBody;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PoppinsSemiBold',
  },
});
