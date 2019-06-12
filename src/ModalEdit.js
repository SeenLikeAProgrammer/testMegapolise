import React,{Component} from 'react';
export default class Modal extends Component {
  constructor(props){
	  super(props);
	  this.state={text:props.name, id:props.id}
	  this.onChange = this.onChange.bind(this)
	  this.onClick = this.onClick.bind(this);
  }
  render() {
    if (this.props.isOpen === false) return null;
    return (
      <div>
        <div className="modalw">          
			<h3>Заголовок</h3>
			<input type='text' value={this.state.text} onChange={this.onChange}/>
			<div className='btn-modal' onClick={this.onClick}>Создать</div>
		</div>
        <div className="bg" onClick={e => this.close(e)} />
      </div>
    );
  }
  onClick(){
	  if (this.props.onClick)
		  this.props.onClick(this.state.text);
  }
  onChange(e){
	  this.setState({text:e.target.value})
  }
  close(e) {
    e.preventDefault();

    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}