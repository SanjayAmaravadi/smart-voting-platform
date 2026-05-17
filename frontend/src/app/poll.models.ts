export interface OptionVote {
  optionText: string;
  voteCount: number;
}

export interface Poll {
  id?: number;
  question: string;
  category: string;
  createdAt?: string;
  options: OptionVote[];
  selectedOptionIndex?: number | null;
}

export interface ApiResponse<T> {
  success: boolean
  message: string;
  data: T;
}

export interface PollPage {
  content: Poll[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// export interface OptionVote {
//     optionText:string;
//     voteCount:number;
// }
// export interface Poll {
//     id?:number; //Optional
//     question:string;
//     options:OptionVote[];
// }
