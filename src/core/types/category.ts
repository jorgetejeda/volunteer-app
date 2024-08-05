interface Base {
  title: string;
  color: string;
}
export interface Category extends Base {
  id: number;
}

export interface CategoryDto extends Base {}
