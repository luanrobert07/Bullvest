import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base';

import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { Loading } from '@components/Loading';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';



export function Home1() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState('antebraço');
  const [randomAlignmentsSet, setRandomAlignmentsSet] = useState(false);

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId });
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!randomAlignmentsSet) {
        setRandomAlignmentsSet(true);
      }
      fetchExercisesByGroup();
    }, [groupSelected, randomAlignmentsSet])
  );

  const renderGroup = ({ item, index }: { item: string; index: number }) => {
    const totalGroups = groups.length;

    // Posicionamento dos grupos na lista
    let alignItems;
    if (totalGroups > 3 && !randomAlignmentsSet) {
      alignItems = ['center', 'flex-start', 'flex-end'][Math.floor(Math.random() * 7)];
    } else {
      // Posicionamento normal para até dois grupos ou depois de já ter definido aleatório
      if (index === 0) alignItems = 'center'; // Primeiro grupo no centro
      else if (index === 1) alignItems = 'flex-start';
      else if (index === 2) alignItems = 'flex-end';
    }

    return (
      <VStack key={item} alignItems={alignItems} my={index > 0 ? 4 : 0}>
        <Group
          name={item}
          isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
          onPress={() => setGroupSelected(item)}
        />
      </VStack>
    );
  };

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={renderGroup}
        horizontal={false} // Renderiza na vertical agora
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
        my={30}
        maxH={400}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>

            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(item.id)}
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        </VStack>
      )}
    </VStack>
  );
}
