export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export type FiltersProps = {
  onChange: (index: number) => void;
  selections: boolean[];
  sections: string[];
};
