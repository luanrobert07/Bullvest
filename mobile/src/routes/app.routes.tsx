import {
	BottomTabNavigationProp,
	createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { Platform } from 'react-native'

import HistorySvg from '@assets/history.svg'
import HomeSvg from '@assets/home.svg'
import ProfileSvg from '@assets/profile.svg'
import { Exercise } from '@screens/Exercise'
import { Profile } from '@screens/Profile'
import { Home1 } from '@screens/Home'
import { InitialHome } from '@screens/InitialHome'
import { Simulacao } from '@screens/Simulacao'
import { FinancialControll } from '@screens/financialControll'
import { Entradas_saidas } from '@screens/entradas_saidas'
import { Graficos_controle_financeiro } from '@screens/graficos_controle_financeiro'


import { Home } from '../screens/INicial';
import { Quiz } from '../screens/Quiz';
import { Finish } from '../screens/Finish';
import { History } from '../screens/History1';

type AppRoutes = {
	home: undefined
	exercise: {
		exerciseId: string
	}
	profile: undefined
	history: undefined
	estudo: undefined
	simulation: undefined
	graficos: undefined
	exercises: undefined
	entradas_saidas: undefined
	graficos_controle_financeiro: undefined
	inicial: undefined
	quiz: undefined
	finish: undefined
	teste: undefined
	
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
	const { sizes, colors } = useTheme()

	const iconSize = sizes[6]

	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors.green[500],
				tabBarInactiveTintColor: colors.gray[200],
				tabBarStyle: {
					backgroundColor: colors.gray[600],
					borderTopWidth: 0,
					height: Platform.OS === 'android' ? 'auto' : 96,
					paddingBottom: sizes[9],
					paddingTop: sizes[7]
				}
			}}
		>
			<Screen
				name="home"
				component={InitialHome}
				options={{
					tabBarIcon: ({ color }) => (
						<HomeSvg fill={color} width={iconSize} height={iconSize} />
					)
				}}
			/>

			<Screen
				name="teste"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<HistorySvg fill={color} width={iconSize} height={iconSize} />
					)
				}}
			/>

			<Screen
				name="profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<ProfileSvg fill={color} width={iconSize} height={iconSize} />
					)
				}}
			/>

			<Screen
				name="exercise"
				component={Exercise}
				options={{ tabBarButton: () => null }}
			/>

			<Screen
				name="entradas_saidas"
				component={Entradas_saidas}
				options={{ tabBarButton: () => null }}
			/>

			<Screen
				name="graficos_controle_financeiro"
				component={Graficos_controle_financeiro}
				options={{ tabBarButton: () => null }}
			/>

			<Screen
				name="simulation" //Simulation
				component={Simulacao}
				options={{ tabBarButton: () => null }}
			/>

			<Screen
				name="graficos"
				component={FinancialControll}
				options={{ tabBarButton: () => null }}
			/>	
			<Screen
				name="inicial"
				component={Home}
				options={{ tabBarButton: () => null }}
			/>
				<Screen
					name="quiz"
					component={Quiz}
					options={{ tabBarButton: () => null }}
				/>
				<Screen
					name="history"
					component={History}
					options={{ tabBarButton: () => null }}
				/>
				<Screen
					name="finish"
					component={Finish}
					options={{ tabBarButton: () => null }}
				/>

		</Navigator>
	)
}