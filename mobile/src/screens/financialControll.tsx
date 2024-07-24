import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack, Box, Text, HStack, Divider, Button, Modal, Input, Progress, FlatList, useToast } from 'native-base';
import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { api } from '@services/api';

type Transaction = {
  amount: number;
  date: Date;
};

type Goal = {
  name: string;
  value: number;
  currentValue: number;
  transactions: Transaction[];
};

export function FinancialControll() {
  const [isLoading, setIsLoading] = useState(true)

	const [groups, setGroups] = useState<string[]>([
		'Entradas e Saídas', 
		'Gráficos - Controle financeiro', 
	]) // Lista de categorias definida localmente
	const [groupSelected, setGroupSelected] = useState('Estudo')

	const navigation = useNavigation<AppNavigatorRoutesProps>()

	function handleNavigation(group: string) {
		switch (group) {
			case 'Entradas e Saídas':
				navigation.navigate('entradas_saidas')
				break
			case 'Gráficos - Controle financeiro':
				navigation.navigate('graficos_controle_financeiro')
				break
			default:
				break
		}
	}

  const [goals, setGoals] = useState<Goal[]>([
    { name: 'Goal 1', value: 1000, currentValue: 0, transactions: [] },
    { name: 'Goal 2', value: 2000, currentValue: 0, transactions: [] }
  ]);
  const [totalMoney, setTotalMoney] = useState(5000);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGoalModalVisible, setNewGoalModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalValue, setNewGoalValue] = useState('');
  const [editTotalMoneyModalVisible, setEditTotalMoneyModalVisible] = useState(false);
  const [editAmount, setEditAmount] = useState(0);

  const openModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setModalVisible(true);
  };

  const addMoneyToGoal = () => {
    if (selectedGoal !== null && transactionAmount <= totalMoney) {
      const newTransaction: Transaction = {
        amount: transactionAmount,
        date: new Date()
      };
      const updatedGoals = goals.map((goal) =>
        goal.name === selectedGoal.name
          ? {
              ...goal,
              currentValue: goal.currentValue + transactionAmount,
              transactions: [...goal.transactions, newTransaction]
            }
          : goal
      );
      setGoals(updatedGoals);
      setTotalMoney(totalMoney - transactionAmount);
      setModalVisible(false);
      setTransactionAmount(0);
    }
  };

  const removeMoneyFromGoal = () => {
    if (selectedGoal !== null && transactionAmount <= selectedGoal.currentValue) {
      const newTransaction: Transaction = {
        amount: -transactionAmount,
        date: new Date()
      };
      const updatedGoals = goals.map((goal) =>
        goal.name === selectedGoal.name
          ? {
              ...goal,
              currentValue: goal.currentValue - transactionAmount,
              transactions: [...goal.transactions, newTransaction]
            }
          : goal
      );
      setGoals(updatedGoals);
      setTotalMoney(totalMoney + transactionAmount);
      setModalVisible(false);
      setTransactionAmount(0);
    }
  };

  const addNewGoal = () => {
    if (newGoalName && newGoalValue) {
      const parsedGoalValue = Number(newGoalValue);
      if (parsedGoalValue > 0) {
        const newGoal: Goal = {
          name: newGoalName,
          value: parsedGoalValue,
          currentValue: 0,
          transactions: []
        };
        setGoals([...goals, newGoal]);
        setNewGoalModalVisible(false);
        setNewGoalName('');
        setNewGoalValue('');
      }
    }
  };

  return (
    <ScrollView>
      <HomeHeader />
      <VStack flex={1} p={5}>
        <Box bg="white" p={5} borderRadius={10} alignItems="center">
          <Text fontSize="lg" fontWeight="bold">
            ${totalMoney}
          </Text>
        </Box>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space={3} mb={5} mt={5}>
            <FlatList
              data={groups}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <Group
                  name={item}
                  isActive={
                    groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
                  }
                  onPress={() => {
                    setGroupSelected(item)
                    handleNavigation(item)
                  }}
            />
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				_contentContainerStyle={{
					px: 8
				}}
				my={5}
				maxH={40}
			/>
          </HStack>
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack>
            <Box
              bg="white"
              p={4}
              borderRadius={10}
              alignItems="center"
              justifyContent="center"
              width={220}
              height={150}
              mr={10}
            >
              <Text>Investment 1</Text>
            </Box>

            <Box
              bg="white"
              p={4}
              borderRadius={10}
              alignItems="center"
              justifyContent="center"
              width={220}
              height={150}
            >
              <Text>Investment 2</Text>
            </Box>
          </HStack>
        </ScrollView>

        <Divider my={4} />

        <Box>
          <Text fontSize={30} color="white" mt={5}>
            Suas metas
          </Text>
          <Text fontSize={15} color="white" mb={10}>
            Poupe hoje para colher os frutos amanhã
          </Text>
        </Box>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space={10} mb={15}>
            {goals.map((goal, index) => (
              <Box
                key={index}
                bg="white"
                p={5}
                borderRadius={10}
                alignItems="center"
                justifyContent="center"
                height={150}
                width={220}
              >
                <Text>{goal.name}</Text>
                <Text>
                  ${goal.currentValue} / ${goal.value}
                </Text>
                <Button onPress={() => openModal(goal)}>Detalhes</Button>
              </Box>
            ))}
          </HStack>
        </ScrollView>

        <Button onPress={() => setNewGoalModalVisible(true)}>Adicionar Nova Meta</Button>
      </VStack>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Detalhes da Meta</Modal.Header>
          <Modal.Body>
            {selectedGoal !== null && (
              <>
                <Text mb={3}>Meta: {selectedGoal.name}</Text>
                <Text>Valor atual: ${selectedGoal.currentValue}</Text>
                <Text>Valor total: ${selectedGoal.value}</Text>
                <Text>Progresso:</Text>
                <Progress value={(selectedGoal.currentValue / selectedGoal.value) * 100} />
                <Text>Transações:</Text>
                {selectedGoal.transactions.map((transaction, idx) => (
                  <Box key={idx} mt={2}>
                    <Text>Data: {transaction.date.toLocaleDateString()}</Text>
                    <Text>
                      Valor: {transaction.amount > 0 ? `+ $${transaction.amount}` : `- $${Math.abs(transaction.amount)}`}
                    </Text>
                  </Box>
                ))}
                <Input
                  placeholder="Digite o valor"
                  keyboardType="numeric"
                  value={transactionAmount.toString()}
                  onChangeText={(text) => setTransactionAmount(Number(text))}
                />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={addMoneyToGoal}>Adicionar Dinheiro</Button>
            <Button onPress={removeMoneyFromGoal}>Remover Dinheiro</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={newGoalModalVisible} onClose={() => setNewGoalModalVisible(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Nova Meta</Modal.Header>
          <Modal.Body>
            <Input
              placeholder="Nome da Meta"
              value={newGoalName}
              onChangeText={(text) => setNewGoalName(text)}
            />
            <Input
              placeholder="Valor da Meta"
              keyboardType="numeric"
              value={newGoalValue}
              onChangeText={(text) => setNewGoalValue(text)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={addNewGoal}>Adicionar Meta</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={editTotalMoneyModalVisible} onClose={() => setEditTotalMoneyModalVisible(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Editar Saldo Total</Modal.Header>
          <Modal.Body>
            <Input
              placeholder="Digite o valor"
              keyboardType="numeric"
              value={editAmount.toString()}
              onChangeText={(text) => setEditAmount(Number(text))}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
}
