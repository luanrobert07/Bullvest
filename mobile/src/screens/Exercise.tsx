import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  useToast,
  AlertDialog,
  Radio,
  Button as ButtonNativeBase
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { ExerciseDTO, AnswerOption } from '@dtos/ExerciseDTO';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import TalkingBallon from '../components/balao'; // Adjust the path as needed

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const [sendingRegister, setSendingRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const [isOpen, setIsOpen] = useState(false);
  const [currentXp, setCurrentXp] = useState(0);
  const cancelRef = useRef(null);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const toast = useToast();

  const { exerciseId } = route.params as RouteParamsProps;

  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSelectAnswer = (value: string) => {
    setSelectedAnswer(value);
  };

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      const exerciseData: ExerciseDTO = response.data;
      exerciseData.answers = JSON.parse(exerciseData.answers) as AnswerOption[];
      setExercise(exerciseData);
      setCurrentXp(exerciseData.xp);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);
      await api.post('/history', { exercise_id: exerciseId });
      setCurrentXp(prevXp => prevXp + 10);
      setIsOpen(true);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível registrar exercício.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
          <Heading color="gray.100" fontSize="lg" flexShrink={1} fontFamily="heading">
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <Text color="gray.200" ml={1} fontSize="lg" textTransform="capitalize">
              {exercise.group}
            </Text>
            <Text color="gray.200" ml={8} fontSize="lg" textTransform="capitalize">
              {currentXp} XP
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1}>
          <ScrollView contentContainerStyle={{ padding: 8 }}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <HStack>
                <Image
                  w={100}
                  h={100}
                  mr={10}
                  source={{
                    uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`
                  }}
                  alt="Nome do exercício"
                  resizeMode="cover"
                  rounded="lg"
                />

                <TalkingBallon sentence={exercise.title} />
              </HStack>
              <Text color="gray.200" ml="2" mt={10}>
                {exercise.description}
              </Text>

              <Text fontSize="lg" color="gray.200" ml="2" mt={10}>
                {exercise.question}
              </Text>

              <VStack mt={4} space={2}>
                  <Box mt={3} flexDirection="row" alignItems="center">
                    <Radio.Group
                      name="answerOptions"
                      value={selectedAnswer}
                      onChange={(value) => setSelectedAnswer(value)}
                    >
                      {exercise.answers.map((answer: AnswerOption, index: number) => (
                        <Radio
                          key={index}
                          value={answer.option}
                          _text={{ ml: 2 }}
                          
                        >
                          <Text color="gray.200">
                            {answer.option}
                          </Text>
                          
                        </Radio>
                      ))}
                    </Radio.Group>

                  </Box>
              </VStack>
            </Box>
          </ScrollView>

          <Box bg="gray.600" rounded="md" pb={10} px={10} pt={10} m={5}>
            <Button
              title="Marcar como realizado"
              isLoading={sendingRegister}
              onPress={handleExerciseHistoryRegister}
            />
          </Box>

          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Parabéns!</AlertDialog.Header>
              <AlertDialog.Body>
                <Text textAlign="center" fontWeight="bold">
                  +10 XP
                </Text>
                <Text textAlign="center">Mais um assunto concluído.</Text>
              </AlertDialog.Body>
              <AlertDialog.Footer justifyContent="center">
                <ButtonNativeBase
                  ref={cancelRef}
                  onPress={() => {
                    setIsOpen(false);
                    navigation.navigate('history');
                  }}
                >
                  OK
                </ButtonNativeBase>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </VStack>
      )}
    </VStack>
  );
}
