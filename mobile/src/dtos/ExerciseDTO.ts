export type ExerciseDTO = {
	id: string;
	demo: string;
	group: string;
	name: string;
	quantity: string;
	thumb: string;
	updated_at: string;
	description: string;
	title: string;
	xp: number;
	question: string;
	answers: AnswerOption[];
  }
  
  export type AnswerOption = {
  	option: string;
	id: string;
	text: string;
  }
  