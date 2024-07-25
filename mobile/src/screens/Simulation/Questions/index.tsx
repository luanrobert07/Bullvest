import { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { INVESTOR_PROFILE_QUIZ } from '../data/quiz';
import { historyAdd } from '../../../storage/quizHistoryStorage';
import { Loading } from '../../../components/Loading';
import { Question } from '../../../components/Question';
import { QuizHeader } from '../../../components/QuizHeader';
import { ConfirmButton } from '../../../components/ConfirmButton';
import { OutlineButton } from '../../../components/OutlineButton';

interface Params {
  id: string;
}

type QuizProps = typeof INVESTOR_PROFILE_QUIZ[0];

export function Questions() {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps);
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(null);
  const [responses, setResponses] = useState<number[]>([]);

  const { navigate } = useNavigation();
  const route = useRoute();
  const { id } = route.params as Params;

  // Função para reiniciar o quiz
  function resetQuiz() {
    setPoints(0);
    setCurrentQuestion(0);
    setResponses([]);
    setAlternativeSelected(null);
  }

  function handleSkipConfirm() {
    Alert.alert('Pular', 'Deseja realmente pular a questão?', [
      { text: 'Sim', onPress: () => handleNextQuestion() },
      { text: 'Não', onPress: () => {} }
    ]);
  }

  async function handleFinished() {
    await historyAdd({
      id: new Date().getTime().toString(),
      title: quiz.title,
      level: quiz.level,
      points,
      questions: quiz.questions.length
    });

    const profile = determineInvestorProfile(responses);
    
    navigate('finish1', {
      points: String(points),
      total: String(quiz.questions.length),
      profile
    });
  }

  function handleNextQuestion() {
    if (alternativeSelected !== null) {
      setResponses([...responses, alternativeSelected]);
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prevState => prevState + 1);
    } else {
      handleFinished();
    }
    setAlternativeSelected(null);
  }

  async function handleConfirm() {
    if (alternativeSelected === null) {
      return handleSkipConfirm();
    }

    if (quiz.questions[currentQuestion].correct === alternativeSelected) {
      setPoints(prevState => prevState + 1);
    }

    handleNextQuestion();
  }

  function handleStop() {
    Alert.alert('Parar', 'Deseja parar agora?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => navigate('home')
      },
    ]);

    return true;
  }

  function handleRestart() {
    Alert.alert('Reiniciar', 'Deseja reiniciar o quiz?', [
      { text: 'Sim', onPress: resetQuiz },
      { text: 'Não', onPress: () => {} }
    ]);
  }

  useEffect(() => {
    const quizSelected = INVESTOR_PROFILE_QUIZ.find(item => item.id === id);
    if (quizSelected) {
      setQuiz(quizSelected);
      resetQuiz(); // Reset the quiz when loading
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (quiz.questions) {
      setCurrentQuestion(0);
    }
  }, [quiz]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.question}
      >
        <QuizHeader
          title={quiz.title}
          currentQuestion={currentQuestion + 1}
          totalOfQuestions={quiz.questions.length}
        />

        <Question
          key={quiz.questions[currentQuestion].title}
          question={quiz.questions[currentQuestion]}
          alternativeSelected={alternativeSelected}
          setAlternativeSelected={setAlternativeSelected}
        />

        <View style={styles.footer}>
          <OutlineButton title="Parar" onPress={handleStop} />
          <OutlineButton title="Reiniciar" onPress={handleRestart} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </ScrollView>
    </View>
  );
}

function determineInvestorProfile(responses: number[]): string {
  // Define thresholds for different profiles based on the responses
  let conservativeCount = 0;
  let moderateCount = 0;
  let aggressiveCount = 0;

  // Define criteria for each question to categorize responses
  const conservativeCriteria = [0, 1, 2]; // Example criteria for conservative
  const moderateCriteria = [3, 4]; // Example criteria for moderate
  const aggressiveCriteria = [5, 6]; // Example criteria for aggressive

  responses.forEach(response => {
    if (conservativeCriteria.includes(response)) {
      conservativeCount++;
    } else if (moderateCriteria.includes(response)) {
      moderateCount++;
    } else if (aggressiveCriteria.includes(response)) {
      aggressiveCount++;
    }
  });

  // Determine the dominant profile
  if (aggressiveCount > conservativeCount && aggressiveCount > moderateCount) {
    return 'Agressivo';
  } else if (moderateCount > conservativeCount) {
    return 'Moderado';
  } else {
    return 'Conservador';
  }
}
