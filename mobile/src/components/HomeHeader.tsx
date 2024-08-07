import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Heading, Icon, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

import { api } from '@services/api'

import { useAuth } from '@hooks/useAuth'

import defaulUserPhotoImg from '@assets/userPhotoDefault.png'
import { UserPhoto } from './UserPhoto'

export function HomeHeader() {
	const { user, signOut } = useAuth()

	return (
		<HStack bg="gray.600" pt={12} pb={5} px={8} alignItems="center">
			<UserPhoto
				source={
					user.avatar
						? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
						: defaulUserPhotoImg
				}
				size={16}
				alt="Imagem do usuário"
				mr={4}
			/>
			<HStack flex={1}>
				<Text color="gray.100" fontSize="md" mr={2} >
					Olá,
				</Text>
				<Heading color="gray.100" fontSize="md" mt={0.5} fontFamily="heading">
					{user.name}
				</Heading>
			</HStack>
			<TouchableOpacity onPress={signOut}>
				<Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
			</TouchableOpacity>
		</HStack>
	)
}
