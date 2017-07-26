import React from "react";
import ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {Nav, NavItem} from "react-bootstrap";

import NavModel from "../data/nav.jsx" 
const navModel = new NavModel();
@observer
class IndexComponent extends React.Component {
	handleSelect(key) {
		this.props.navData.plus();
	}
	render() {
		let nav = this.props.navData;
		return (
			<div>
				<Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect.bind(this)}>
					<NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
					<NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
					<NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
				</Nav>
				<div>{nav.count}</div>
			</div>
		)
	}
}


ReactDOM.render(<IndexComponent navData={navModel} />, document.getElementById("container"));