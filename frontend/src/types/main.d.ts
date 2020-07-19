interface SelfIntroductionTableInterface {
  id: string;
  name: string;
  skill: string;
  "hobby-list": string[];
  like: string;
  comment: string;
}

export interface SelfIntroductionMainInterface {
  dialog: boolean;
  snackbar: boolean;
  errorMessage: string;
  name: string;
  skill: string;
  hobbyList: string[];
  like: string;
  comment: string;
  editName: string;
  editSkill: string;
  editHobby: string[];
  editLike: string;
  editComment: string;
  profileData: SelfIntroductionTableInterface | null;
}
