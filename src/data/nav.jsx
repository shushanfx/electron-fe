import {observable, computed} from "mobx"

export default class NavModel {
	@observable
	selected = "";
	@observable
	clickCount = 0;

	@computed
	get count(){
		return this.clickCount;
	}
	plus(){
		this.clickCount ++;
	}
}