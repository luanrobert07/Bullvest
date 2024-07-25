import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Trophy } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../../components/Header';
import { QuizCard } from '../../../components/QuizCard';

import { styles } from './styles';
import { QUIZZES } from '../data/quizzes';

export function SimulationTeste() {
  const [quizzes, setQuizzes] = useState(QUIZZES);
  const [levels, setLevels] = useState([1, 2, 3]);

  const { navigate } = useNavigation();

  function handleLevelFilter(level: number) {
    const levelAlreadySelected = levels.includes(level);

    if (levelAlreadySelected) {
      if (levels.length > 1) {
        setLevels(prevState => prevState.filter(item => item !== level));
      }
    } else {
      setLevels(prevState => [...prevState, level]);
    }
  }

  useEffect(() => {
    setQuizzes(QUIZZES.filter(quiz => levels.includes(quiz.level)));
  }, [levels]);

  return (
    <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
      <Header
        icon={Trophy}
        title="Perfil investidor"
        subtitle="Descubra já o seu..."
        onPress={() => navigate('history')}
      />

      <FlatList
        data={quizzes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <QuizCard
            data={item}
            onPress={() => navigate('perfilInvestidorQuestions', { id: item.id })}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.cards, { alignItems: 'center' }]}
      />
    </View>
  );
}
