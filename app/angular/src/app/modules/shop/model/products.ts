export interface IProducts {
  id: number,
  title: string,
  price: number,
  image?: string,
  text: string,
  grade: number,
  description: IDescription,
  
}

export interface IDescription {
  size: number,
  weight: number,
  age: number,
}
