import React,{Component} from 'react';
import './App.css';
import List from './List';
import Modal from './Modal';
import Store from './Store';
import Button from './Button.js';
class App extends  Component{
	constructor(props){
			super(props);
			this.onClickCreate = this.onClickCreate.bind(this);
			this.onGetList = this.onGetList.bind(this);
			this.onSubmit = this.onSubmit.bind(this)
			this.closeModal = this.closeModal.bind(this);
			this.state = {items:Store.getList(), isModalOpen: false, error:false}
	}
	onSubmit(name){
		if (name !== ''){
			Store.createNewElement(name);
			this.setState({error:false})
		}
		else this.setState({error:true})
		
	}
	componentWillMount(){
		Store.addGetListListener(this.onGetList)
		Store.getInitialList();
	}
	onClickCreate(){
		this.setState({isModalOpen:true})
	}
	onGetList(){
		this.closeModal();
			this.setState({items:Store.getList(), inModalOpen:false});
		}
	closeModal(){
			this.setState({isModalOpen:false})
	}
	render() {
	  return (
		<div className='container'>
			<div className='d-flex justify-content-between mt-2 mb-2'>
				<div className='h2'>Список задач</div>
				<Button 
				name='Добавить'
				onClick = {this.onClickCreate}
				/>
			</div>
			<List
			items ={this.state.items}
			/>
		{this.state.isModalOpen && (
        <Modal
          isOpen={this.state.isModalOpen}
		  onClick={this.onSubmit}
          onClose={this.closeModal}
		  name=''
		  error={this.state.error}
        />)}
		

		</div>
	  );
	}
}

export default App;
