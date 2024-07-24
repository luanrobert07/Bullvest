import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './TalkingBallonm.styles';

interface TalkingBallonProps {
  sentence: string;
}

const TalkingBallon: React.FC<TalkingBallonProps> = ({ sentence }) => {
  const words = sentence ? sentence.split(' ') : [];

  return (
    <View style={styles.dialog}>
      <View style={styles.leftPoint}>
        <View style={styles.innerLeftPoint}></View>
      </View>
      <Text>
        {words.map((word, index) => (
          <TouchableOpacity key={index}>
            <Text style={styles.text}>{word}</Text>
          </TouchableOpacity>
        ))}
      </Text>
    </View>
  );
};

export default TalkingBallon;
