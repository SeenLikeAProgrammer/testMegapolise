import eventEmitter from 'events';
import Ajax from './Ajax';
let list=[];
let Store = Object.assign(eventEmitter.prototype, {
		getList: () => {
			return list;
		},
		getInitialList: function() {
			Store.promises.getList().then(function(data){
				list = data.data;
				Store.emit('getList');
			});
		},
		deleteElement: function(id) {
			Store.promises.deleteElement(id).then(function(){
				Store.getInitialList();
			});
		},
		editElement: (name, id) => {
			Store.promises.editElement(name,id)
				.then(() => {
					Store.getInitialList();
				})
		},
		createNewElement: function(name) {
			Store.promises.createElement(name)
				.then (function(elem){
					Store.getInitialList();
				})
		},
		addGetListListener: function(callback) {
			Store.on('getList', callback);
		},
		promises: {
			editElement: (name, id) => {
				let el = {title:name}
				return new Promise(function(resolve,reject) {
					 Ajax.send({
						url: `https://test.megapolis-it.ru/api/list/${id}`,	
						method: 'POST',
						data:el,
						success: function(data) {
							resolve(data);
						},
						error: function(response) {
							reject(response);
						}
					});
				})
			},
			deleteElement: function(id){
				return new Promise(function(resolve,reject) {
				 Ajax.send({
                    url: `https://test.megapolis-it.ru/api/list/${id}`,	
                    method: 'DELETE',
                    success: function(data) {
						resolve(data);
                    },
                    error: function(response) {
                        reject(response);
                    }
                });
				})
			},
			getList: function(){
				return new Promise(function(resolve,reject) {
				 Ajax.send({
                    url: 'https://test.megapolis-it.ru/api/list',
                    method: 'GET',
                    success: function(data) {
						resolve(data);
                    },
                    error: function(response) {
                        reject(response);
                    }
                });
				})
			},
			createElement: function(name){
				let dt = {title:name}
				return new Promise(function(resolve,reject) {
				 Ajax.send({
                    url: 'https://test.megapolis-it.ru/api/list',
                    method: 'POST',
					data:dt,
                    success: function(data) {
						resolve(data);
                    },
                    error: function(response) {
                        reject(response);
                    }
                });
				})
			}
		}
		
	})
export default Store;