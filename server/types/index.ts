//interfaz user para las req/res
export interface User {
  nickname: string;
  email: string;
  password: string;
}

export interface Item {
  nombre: string;
  precio: number;
  image: string;
  plataforma: string;
}
