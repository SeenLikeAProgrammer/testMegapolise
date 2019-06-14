import React,{Component} from 'react';
export default class Modal extends Component {
  constructor(props){
	  super(props);
	  this.state={text:props.name, id:props.id}
	  this.onChange = this.onChange.bind(this)
	  this.onClick = this.onClick.bind(this);
  }
  componentWillMount(){
		if (this.props.name)
			this.setState({text:this.props.name})
  }
  render() {
    if (this.props.isOpen === false) return null;
    return (
      <div>
			<div className="modalw">
				<div className="container">
					<h5>Заголовок</h5>
					<input type='text' value={this.state.text} className='mt-2' onChange={this.onChange}/>
					<div className={this.props.error?"mt-4 d-flex justify-content-between":"mt-4 d-flex justify-content-end"}>
						{this.props.error && (
							<div className='error'>
								Заголовок не может быть пустым
							</div>
						)}
						<div className='btn-modal' onClick={this.onClick}>{this.props.name?'Редактировать':'Создать'}</div>
					</div>
				</div>
		   </div>
        <div className="bg" onClick={e => this.close(e)} />
      </div>
    );
  }
  onClick(){
	  if (this.props.onClick)
		  this.props.onClick(this.state.text, this.state.id);
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