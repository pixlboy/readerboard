/**
 * Name : Marksheet Table Component
 * Author : Rachit Garg
 */
'use strict';
import classNames from 'classnames';
export class SavedViews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalItems : this.props.totalItems,
            showDuplicateErr : false
        };

        this.onSelectItem = this.onSelectItem.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
    }

    onAddItem(){
        if(this.addItemInput.value){
            if(_.filter(this.state.totalItems, ['identifier', this.addItemInput.value]).length === 0){
                let currentItem = {
                    "identifier" : this.addItemInput.value,
                    "default"    : true
                };
                this.setState({
                    showDuplicateErr : false
                });
                this.props.onAddItemCb(currentItem);
                this.addItemInput.value = '';
            } else {
                this.setState({
                    showDuplicateErr : true
                });
            }
        }
    }

    onDeleteItem(idx, event){
        this.props.onDeleteItemCb(idx);
        this.setState({});
        event.stopPropagation();
    }

    onSelectItem(idx){
        this.props.onSelectItemCb(idx);
        this.setState({});
    }

    handleKeyPress(event){
        if(event.key === 'Enter'){
            this.onAddItem();
        }
    }

    render() {
        let duplicateNamesErr = classNames(
            'duplicate-name',
            {
                'rb-show-me': this.state.showDuplicateErr,
                'rb-hide-me': !this.state.showDuplicateErr,
            }
        );
        return (
            <div className="rb-saved-views-wrapper">
                <div className="saved-list">
                    <ul className="rb-list">
                        {this.state.totalItems.map((item, idx) => {
                            return (
                                <li key={item.identifier} className={item.default ? 'list-item current-view' : 'list-item'} onClick={this.onSelectItem.bind(this, idx)}>
                                    <a href="javascript:void(0)" className="selector"></a>
                                    <span className="item-name">{item.identifier}</span>
                                    {item.identifier === 'Default' ? null : <i className="delete-btn" onClick={this.onDeleteItem.bind(this, idx)}></i>}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="save-view">
                    <input type="text" ref={(ref) => { this.addItemInput = ref }} onKeyUp={this.handleKeyPress.bind(this)} placeholder="Enter Name" className="save-view-input" maxLength="15" />
                    <input type="button" className="add-view-btn pull-left" onClick={this.onAddItem.bind(this)} value="Add" />
                </div>
                <p className={duplicateNamesErr}>Name already exists</p>
            </div>
        );
    }
}
