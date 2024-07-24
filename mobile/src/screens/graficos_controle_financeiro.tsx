import React, { useState, useEffect, useRef } from 'react';
import { HomeHeader } from '@components/HomeHeader';
import { Heading, View, VStack, Select, CheckIcon, Text, Box, ScrollView } from 'native-base';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { Dimensions, Animated } from 'react-native';

const categories = ["Salário", "Alimentação", "Freelance", "Transporte"]; // Categorias disponíveis

export function Graficos_controle_financeiro() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Categoria selecionada
    const [selectedYear, setSelectedYear] = useState('2024'); // Ano selecionado
    const [selectedMonth, setSelectedMonth] = useState('Julho'); // Mês selecionado
    const [selectedDay, setSelectedDay] = useState('15'); // Dia selecionado (apenas exemplo)

    const [lineChartData, setLineChartData] = useState({
        labels: ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Mar" ],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ]
            }
        ]
    });

    const [pieChartData, setPieChartData] = useState({
        labels: ["Entradas", "Saídas"],
        data: [0.6, 0.4], // Exemplo de dados (60% Entradas, 40% Saídas)
        colors: ["#4CAF50", "#FF5722"] // Cores para as fatias do gráfico (Entradas: Verde, Saídas: Laranja)
    });

    const [balance, setBalance] = useState(0); // Saldo atual
    const balanceAnimation = useRef(new Animated.Value(0)).current;

    // Função para calcular o saldo com base nos dados
    const calculateBalance = () => {
        const entries = lineChartData.datasets[0].data.reduce((acc, val) => acc + val, 0); // Soma das entradas
        const expenses = pieChartData.data[1] * entries; // Saídas como percentual das entradas
        return entries - expenses; // Cálculo do saldo
    };

    // Efeito para chamar updateChartData sempre que os filtros mudarem
    useEffect(() => {
        // Implemente a lógica para atualizar os dados dos gráficos com base nos filtros selecionados
        // Aqui apenas um exemplo simples é fornecido, você pode adaptar conforme necessário
        const newLineChartData = {
            labels: ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Mar" ],
            datasets: [
                {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                }
            ]
        };

        const newPieChartData = {
            labels: ["Entradas", "Saídas"],
            data: [Math.random(), Math.random()], // Dados aleatórios para o exemplo
            colors: ["#4CAF50", "#FF5722"] // Cores para as fatias do gráfico (Entradas: Verde, Saídas: Laranja)
        };

        setLineChartData(newLineChartData);
        setPieChartData(newPieChartData);
    }, [selectedCategory, selectedYear, selectedMonth, selectedDay]);

    // Efeito para animar o saldo quando atualizado
    useEffect(() => {
        Animated.timing(balanceAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, [balance]);

    // Configuração da animação do saldo
    const interpolatedBalanceAnimation = balanceAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    return (
        <ScrollView>
            <HomeHeader />

            <VStack flex={1} p={4}>

                {/* Filtros */}
                <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Select
                        selectedValue={selectedCategory}
                        minWidth={170}
                        onValueChange={(value) => setSelectedCategory(value)}
                        _selectedItem={{
                            bg: "gray.600",
                            endIcon: <CheckIcon size="5" />,
                        }}
                        color="white"
                    >
                        {categories.map((category) => (
                            <Select.Item key={category} label={category} value={category} />
                        ))}
                    </Select>

                    {/* Seletor de Ano, Mês e Dia (Exemplo) */}
                    <Box flexDirection="row" alignItems="center" >
                        <Select
                            selectedValue={selectedYear}
                            minWidth={90}
                            onValueChange={(value) => setSelectedYear(value)}
                            _selectedItem={{
                                bg: "gray.600",
                                endIcon: <CheckIcon size="5" />,
                            }}
                            color="white"
                        >
                            <Select.Item label="2024" value="2024" />
                            <Select.Item label="2023" value="2023" />
                        </Select>
                        <Select
                            selectedValue={selectedMonth}
                            minWidth={90}
                            onValueChange={(value) => setSelectedMonth(value)}
                            _selectedItem={{
                                bg: "gray.600",
                                endIcon: <CheckIcon size="5" />,
                            }}
                            color="white"
                        >
                            <Select.Item label="Julho" value="Julho" />
                            {/* Adicione mais meses conforme necessário */}
                        </Select>
                    </Box>
                </Box>

                {/* Gráfico de Linha */}
                <View>
                    <Heading color={"white"} textAlign={"center"}>Bezier Line Chart</Heading>
                    <LineChart
                        data={lineChartData}
                        width={Dimensions.get('window').width - 40}
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>

                {/* Gráfico de Pizza */}
                <View>
                    <Heading color={"white"} textAlign={"center"}>Gráfico de Pizza</Heading>
                    <ProgressChart
                        data={pieChartData}
                        width={Dimensions.get('window').width - 40}
                        height={220}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={{
                            backgroundGradientFrom: "#1E2923",
                            backgroundGradientTo: "#08130D",
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Cor do texto e das linhas
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Cor das legendas
                            strokeWidth: 2 // Espessura da linha
                        }}
                        hideLegend={false}
                    />
                </View>

                {/* Relatório de Balanço */}
                <View mt={4} p={4} bg={"gray.700"} borderRadius={8} alignItems="center">
                    <Heading color={"white"} textAlign={"center"} mb={2}>Balanço Financeiro</Heading>
                    <Animated.Text style={{ fontSize: 24, color: "white", opacity: interpolatedBalanceAnimation }}>
                        Saldo Atual: ${balance.toFixed(2)}
                    </Animated.Text>
                    {/* Adicione mais informações de relatório conforme necessário */}
                </View>

            </VStack>
        </ScrollView>
    );
}
