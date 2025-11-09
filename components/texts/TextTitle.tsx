import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

type Props = {
  variant: any;
  text: string;
  extraTextStyle: any;
  lines: any | null;
};

const TextTitle = (props: Props) => {
  return (
    <Text
      variant={`title${props.variant}`}
      style={[styles.text, props.extraTextStyle]}
      numberOfLines={props.lines}>
      {props.text}
    </Text>
  );
};

export default TextTitle;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PoppinsBold',
  },
});
