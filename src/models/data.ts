/**
 * for describing todo as default
 */
export interface ITodo {
  id:string;
  title: string;
  description?: string | undefined;
  date?: string;
  complete: boolean;
}
