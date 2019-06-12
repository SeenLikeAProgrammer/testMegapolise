import React,{Component} from 'react';
import './App.css';
import Modal from './Modal';
import Button from './Button';
export default class Element extends Component {
	constructor(props){
		super(props)
		this.state = {isModalOpen:false}
		this.onClickEdit = this.onClickEdit.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
	}
	componentDidMount(){
		
	}
	componentWillUnmount(){

	}
	onClickEdit(){
		if (this.props.onClickEdit)
			this.props.onClickEdit(this.props.element.title, this.props.element.id)
	}
	onClickDelete(){
		if (this.props.onClickDelete)
			this.props.onClickDelete(this.props.element.id)
	}
	closeModal(){
			this.setState({isModalOpen:false})
	}
	render(){
		return (
			<div className='d-flex'>
				<div className='col-2 p-3 border p-1'>{this.props.element.title}</div>
				<div className='col-9 p-3 border p-1'>Описание</div>
				<div className='col-1 p-3 text-center border p-1 d-flex justify-content-between'>
					<Button 
						onClick={this.onClickEdit}
						icon='icon-edit'/>
					<Button 
						onClick={this.onClickDelete}
						icon='icon-delete'/>
				</div>
			</div>
		)
	}
}