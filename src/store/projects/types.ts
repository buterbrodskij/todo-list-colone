export interface IProject {
  id: string;
  name: string;
  created: Date;
  desk: string;
  color: string;
  isFavorite: boolean;
}


export interface IState {
  projects: IProject[]
}
