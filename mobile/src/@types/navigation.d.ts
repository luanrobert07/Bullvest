export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      investiment: undefined
      aggressiveInvestmentScreen: undefined
      conservativeInvestmentScreen: undefined
      moderateInvestmentScreen: undefined
      quiz: { id: string };
      perfilInvestidorQuestions: { id: string };
      history: undefined;
      finish: { total: string, points: string };
      finish1: {
        points: string;
        total: string;
        profile: string;  // Add this line to include 'profile'
      };
    }
  }
}