import React,{Component} from 'react';
import '../App.css';
import Modal from './Modal';
import Button from './Button';
import Store from './Store';
import Element from './element';
export default class ElementList extends Component {
	constructor(props){
		super(props)
		this.onClickEdit = this.onClickEdit.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.onSubmit = this.onSubmit.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.state = {isModalOpen:false, name:'', id:'', modalType:'', error:false}
	}
	componentDidMount(){
		
	}
	componentWillUnmount(){

	}
	onClickEdit(name, id){
		this.setState({isModalOpen:true, name:name, id:id, modalType:'edit'});
	}
	onClickDelete( id){
		Store.deleteElement(id);

		//this.setState({isModalOpen:true, id:id, modalType:'delete'});
	}
	onSubmit(name,id){
		if (name !== ''){
			Store.editElement(name, id);
			this.closeModal();
			this.setState({error:false})
		} else
		this.setState({error:true});
	}
	closeModal(){
			this.setState({isModalOpen:false})
	}
	render(){
		return (
		<div>
			{
				this.props.items.map( element => {
					return (
						<Element
							key={element.id}
							onClickEdit={this.onClickEdit}
							onClickDelete={this.onClickDelete}
							element={element}
						/>
					)
				})
			}
			{this.state.isModalOpen && (
			<Modal
				id={this.state.id}
				name={this.state.name}
				isOpen={this.state.isModalOpen}
				onClick={this.onSubmit}
				onClose={this.closeModal}
				error={this.state.error}
			/> )}
		</div>
		)
	}
}