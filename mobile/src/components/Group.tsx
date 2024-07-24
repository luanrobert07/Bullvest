import { IPressableProps, Pressable, Text, VStack } from 'native-base'

type Props = IPressableProps & {
	name: string
	isActive: boolean
}

export function Group({ name, isActive, ...rest }: Props) {
	return (
	<VStack space={2} alignItems="center">
		<Pressable
		  mr={3}
		  size={20} // Definindo um tamanho para o botão circular
		  bg="gray.600"
		  rounded="full" // Arredondando para formato de círculo
		  justifyContent="center"
		  alignItems="center"
		  overflow="hidden"
		  isPressed={isActive}
		  _pressed={{ borderColor: 'green.500', borderWidth: 1 }}
		  {...rest}
		>
		  <Text
			color={isActive ? 'green.500' : 'gray.200'}
			textTransform="uppercase"
			fontSize="xs"
			fontWeight="bold"
		  >
			{name}
		  </Text>
		</Pressable>
	  </VStack>
	)
}
