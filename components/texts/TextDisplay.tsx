import {StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

type Props = {
  variant: any;
  text: string;
  extraTextStyle: any;
  lines: any | null;
};

const TextDisplay = (props: Props) => {
  return (
    <Text
      variant={`display${props.variant}`}
      style={[styles.text, props.extraTextStyle]}
      numberOfLines={props.lines}>
      {props.text}
    </Text>
  );
};

export default TextDisplay;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterBold',
  },
});
