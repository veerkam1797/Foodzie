import {StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

type Props = {
  variant: any;
  text: string;
  extraTextStyle: any;
  lines: any | null;
};

const TextLabel = (props: Props) => {
  return (
    <Text
      variant={`label${props.variant}`}
      style={[styles.text, props.extraTextStyle]}
      numberOfLines={props.lines}>
      {props.text}
    </Text>
  );
};

export default TextLabel;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterBold',
  },
});
