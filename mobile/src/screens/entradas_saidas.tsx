import React, { useState } from 'react';
import { ScrollView, VStack, HStack, Text, Heading, Icon, Input, Button, Select, CheckIcon } from 'native-base';
import { HomeHeader } from "@components/HomeHeader";
import { MaterialIcons } from '@expo/vector-icons'; // Ícones do Material Icons

type Transaction = {
  id: string;
  amount: number;
  date: Date;
  category: string;
  type: 'entrada' | 'saida';
};

const categoryIcons: {
  [key: string]: string;
} = {
  Salário: 'attach-money',
  Alimentação: 'restaurant',
  Freelance: 'work',
  Transporte: 'commute',
  // Adicione mais categorias e ícones conforme necessário
};

let transactionIdCounter = 1;

export function Entradas_saidas() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', amount: 200, date: new Date(), category: 'Salário', type: 'entrada' },
    { id: '2', amount: 50, date: new Date(), category: 'Alimentação', type: 'saida' },
    { id: '3', amount: 150, date: new Date(), category: 'Freelance', type: 'entrada' },
    { id: '4', amount: 80, date: new Date(), category: 'Transporte', type: 'saida' },
    // Adicione mais transações conforme necessário
  ]);

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'entrada' | 'saida'>('entrada');

  const addTransaction = () => {
    const newTransaction: Transaction = {
      id: `${transactionIdCounter++}`,
      amount: parseFloat(amount),
      date: new Date(),
      category,
      type,
    };
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    setAmount('');
    setCategory('');
  };

  return (
    <>
    <HomeHeader />

    <VStack flex={1} bg="gray.800" p={5}>
      
      <Heading color="white" mb={5}>Entradas e Saídas</Heading>

      <VStack space={4} mb={5}>
        <Input
          placeholder="Valor"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          color="white"
        />
        <Select
          placeholder="Categoria"
          selectedValue={category}
          onValueChange={setCategory}
          _selectedItem={{
            bg: "gray.600",
            endIcon: <CheckIcon size="5" />,
          }}
          color="white"
        >
          <Select.Item label="Salário" value="Salário" />
          <Select.Item label="Alimentação" value="Alimentação" />
          <Select.Item label="Freelance" value="Freelance" />
          <Select.Item label="Transporte" value="Transporte" />
          {/* Adicione mais categorias conforme necessário */}
        </Select>
        <Select
          placeholder="Tipo"
          selectedValue={type}
          onValueChange={(value) => setType(value as 'entrada' | 'saida')}
          _selectedItem={{
            bg: "gray.600",
            endIcon: <CheckIcon size="5" />,
          }}
          color="white"
        >
          <Select.Item label="Entrada" value="entrada" />
          <Select.Item label="Saída" value="saida" />
        </Select>
        <Button onPress={addTransaction}>Adicionar Transação</Button>
      </VStack>

      <ScrollView>
        {transactions.map((transaction) => (
          <HStack
            key={transaction.id}
            justifyContent="space-between"
            alignItems="center"
            bg="gray.700"
            p={4}
            mb={3}
            borderRadius="md"
          >
            <HStack alignItems="center">
              <Icon
                as={MaterialIcons}
                name={categoryIcons[transaction.category]}
                size="lg"
                color={transaction.type === 'entrada' ? 'green.200' : 'red.500'}
                mr={3}
              />
              <Text color="white" fontSize="md">
                {transaction.category}
              </Text>
            </HStack>
            <Text color="gray.400" fontSize="sm">
              {transaction.date.toLocaleDateString()}
            </Text>
            <Text
              color={transaction.type === 'entrada' ? 'green.200' : 'red.500'}
              fontSize="md"
            >
              {transaction.type === 'entrada' ? '+' : '-'}${transaction.amount}
            </Text>
          </HStack>
        ))}
      </ScrollView>
    </VStack>
    </>
  );
}
