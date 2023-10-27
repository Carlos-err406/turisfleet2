export interface IGroupCreate {
	country: string;
	tourist_amount: number;
}
export interface IGroup extends IGroupCreate {
	id_group: number;
}
export interface IGroupEdit extends IGroupCreate {}
