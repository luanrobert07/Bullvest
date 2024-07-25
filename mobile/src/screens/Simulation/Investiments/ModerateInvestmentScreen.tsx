import { View, Text, StyleSheet } from 'react-native';

export function ModerateInvestmentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Investimento Moderado</Text>
      {/* Adicione conteúdo específico para o perfil agressivo */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
