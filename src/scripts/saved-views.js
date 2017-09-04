/**
 * Name : JTACWB Readerboard component
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
            <div className={this.props.fullScreen ? 'rb-saved-views-wrapper fullscreen' : 'rb-saved-views-wrapper normalscreen'}>
                <div className="save-view">
                    {this.props.fullScreen ? null : <strong>Save View</strong>}
                    <input type="text" ref={(ref) => { this.addItemInput = ref }} onKeyUp={this.handleKeyPress.bind(this)} placeholder="Enter Name" className="save-view-input" maxLength="15" />
                    {this.props.fullScreen ?
                        <input type="button" className="add-view-btn pull-left" onClick={this.onAddItem.bind(this)} value="Add" /> :
                        <i className="add-view-icon pull-left" onClick={this.onAddItem.bind(this)}></i>
                    }
                </div>
                <p className={duplicateNamesErr}>Name already exists</p>
                <div className="saved-list">
                    {this.props.fullScreen ? null : <strong>Saved Views</strong>}
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
            </div>
        );
    }
}
