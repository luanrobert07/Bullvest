import { Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '../../../components/Button';
import { styles } from './styles';

interface Params {
  total: string;
  points: string;
  profile: string;
}

export function Finish1() {
  const route = useRoute();
  const { points, total, profile } = route.params as Params;

  const { navigate } = useNavigation();

  // Função para navegar com base no perfil
  function handleNavigate() {
    switch (profile) {
      case 'Agressivo':
        navigate('aggressiveInvestmentScreen');
        break;
      case 'Moderado':
        navigate('moderateInvestmentScreen');
        break;
      case 'Conservador':
        navigate('conservativeInvestmentScreen');
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.subtitle}>
          Seu perfil de investidor é: {profile}
        </Text>
      </View>

      <Button
        title="Continuar navegando"
        onPress={handleNavigate}
      />
    </View>
  );
}
