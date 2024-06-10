import { useNavigation } from '@react-navigation/native'
import { Divider, FlatList, HStack, Heading, VStack, useToast } from 'native-base'
import { useEffect, useState } from 'react'

import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { Loading } from '@components/Loading'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'

export function InitialHome() {
	const [isLoading, setIsLoading] = useState(true)

	const [groups, setGroups] = useState<string[]>([
		'Estudo', 
		'Simulacao', 
		'Gráficos'
	]) // Lista de categorias definida localmente
	const [groupSelected, setGroupSelected] = useState('Estudo')
	const [news, setNews] = useState([]) // Estado para armazenar as notícias

	const toast = useToast()
	const navigation = useNavigation<AppNavigatorRoutesProps>()

	async function fetchNews() {
		try {
			const response = await api.get('/news') // Endpoint para buscar notícias
			setNews(response.data.articles) // Supondo que a resposta contenha uma lista de artigos
		} catch (error) {
			toast.show({
				title: 'Não foi possível carregar as notícias',
				placement: 'top',
				bgColor: 'red.500'
			})
		} finally {
			setIsLoading(false) // Indica que o carregamento foi concluído
		}
	}

	useEffect(() => {
		fetchNews()
	}, [])

	function handleNavigation(group: string) {
		switch (group) {
			case 'Estudo':
				navigation.navigate('estudo')
				break
			case 'Simulacao':
				navigation.navigate('simulacao')
				break
			case 'Gráficos':
				navigation.navigate('graficos')
				break
			default:
				break
		}
	}

	return (
		<VStack flex={1}>
			<HomeHeader />

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

			<Divider my={-20} mb={10} w={250} mx={"auto"}/>

			{isLoading ? (
				<Loading />
			) : (
				<VStack px={8}>
					<HStack justifyContent="center" mb={5}>
						<Heading color="gray.200" fontSize="md" fontFamily="heading">
							Notícias
						</Heading>
					</HStack>

				</VStack>
			)}
		</VStack>
	)
}
