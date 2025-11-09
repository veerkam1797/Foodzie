import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';

type Props = {
  mode: any | undefined;
  icon: string;
  iconSize: number;
  iconColor: string;
  onPress: () => void;
  contentStyle: any | undefined;
  extraStyle: any | undefined;
};

const CommonIconButton = (props: Props) => {
  return (
    <IconButton
      mode={props.mode}
      icon={props.icon}
      iconColor={props.iconColor || undefined}
      size={props.iconSize}
      style={props.extraStyle}
      contentStyle={props.contentStyle}
      onPress={props.onPress}
    />
  );
};

export default CommonIconButton;

const styles = StyleSheet.create({});
