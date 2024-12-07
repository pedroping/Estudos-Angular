export interface User {
  id: number;
  firstName: string;
  email: string;
  birthDate?: string;
  age: number;
}

export interface FormValue {
  checked: boolean;
  id: number;
  nome: string;
  idade: number;
  email: string;
  isNew: boolean;
  onEdit: boolean;
}

export interface COLUMNS_SCHEMA {
  key: string;
  type: string;
  label: string;
  inputLabel?: string;
  cantEdit?: boolean;
  cell?: any;
  hasSort?: boolean;
  hasControl?: boolean;
}

export interface Table_User {
  id: number;
  name: string;
  email: string;
  age: number;
  isEdit: boolean;
  isSelected: boolean;
  isNew: boolean;
}

export interface UserForm {
  id: number;
  name: string;
  age: number;
  email: string;
  isSelected: boolean;
}

export const COLUMNS: COLUMNS_SCHEMA[] = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
    hasControl: true,
  },
  {
    key: 'id',
    type: 'id',
    label: 'Id',
    cantEdit: true,
    cell: (element: Table_User) => `${element.id}`,
    hasSort: true,
    hasControl: true,
  },
  {
    key: 'name',
    type: 'text',
    label: 'Nome Completo',
    inputLabel: 'Insira seu nome',
    cell: (element: Table_User) => `${element.name}`,
    hasSort: true,
    hasControl: true,
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email',
    inputLabel: 'Insira seu Email',
    cell: (element: Table_User) => `${element.email}`,
    hasControl: true,
  },
  {
    key: 'age',
    type: 'number',
    label: 'Idade',
    inputLabel: 'Insira sua idade',
    cell: (element: Table_User) => `${element.age}`,
    hasSort: true,
    hasControl: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: 'Editar',
  },
  {
    key: 'delete',
    type: 'delete',
    label: 'Excluir',
  },
];

export const COLORS = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray',
];
export const NAMES = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
