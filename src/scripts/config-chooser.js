/**
 * Name : Readerboard
 * Author : Rachit Garg
 */
'use strict';
import classNames from 'classnames';
export class ConfigChooser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filters : [],
            filteredItems : this.props.totalItems,
            selectedItems : this.props.selectedItems
        };

        this.onSelectItem = this.onSelectItem.bind(this);
        this.onFilterItem = this.onFilterItem.bind(this);
        this.onSelectQuickFilter = this.onSelectQuickFilter.bind(this);
    }

    onSelectItem(item){
        let idx = _.findIndex(this.props.selectedItems, item);
        (idx === -1) ? this.props.selectedItems.push(item) : this.props.selectedItems.splice(idx, 1);
        this.props.onSelectItem(this.props.selectedItems);
        this.setState({
            selectedItems : this.props.selectedItems
        });
    }

    onFilterItem(e){
        let keyword = e.target.value.toLowerCase();
        let results = _.filter(this.props.totalItems, function(item) { return item.displayString.toLowerCase().includes(keyword); });
        this.setState({
            filteredItems : results
        });
    }

    onSelectQuickFilter(filterVal){
        let keyword = filterVal.toLowerCase();
        let values = this.state.filters;
        let results = [];

        function setCurrent(){
            _.filter(values, ['selected', true])[0].selected = false;
            _.filter(values, ['displayString', filterVal])[0].selected = true;
        }

        setCurrent();
        if(keyword === 'all'){
            results = this.props.totalItems;
        } else{
            results = _.filter(this.props.totalItems, function(item) { return item.displayString.toLowerCase().startsWith(keyword); });
        }
        this.setState({
            filteredItems : results
        });
    }

    testIfSelected(item){
        return _.some(this.props.selectedItems,['identifier',item.identifier])
    }

    generateQuickFilters(){
        function getDistinctValues(item){
            return {
                "selected" : false,
                "displayString" : item.displayString.charAt(0),
            }
        }
        let values = _.uniqBy(_.flatMap(this.props.totalItems, getDistinctValues), 'displayString');
        values.splice(0, 0, {
            "selected" : true,
            "displayString" : "All"
        });
        this.setState({
            filters : values
        });
    }

    componentDidMount(){
        if(this.props.quickFilters){
            this.generateQuickFilters();
        }
    }

    render() {
        let tooltipClass = classNames(
            {
                'rb-tooltip-elm' : this.props.tooltip
            }
        );
        return (
            <div className={this.props.fullScreen ? 'rb-config-chooser fullscreen' : 'rb-config-chooser normalscreen'}>
                {this.props.bullets ?
                    <div className="selected-items">
                        {this.props.selectedItems.map((item, idx) => {
                            return (
                                <span className="bullet" key={item.identifier}>{item.displayString}<i className="icon" onClick={this.onSelectItem.bind(this, item)}></i></span>
                            );
                        })}
                    </div> : null
                }
                {this.props.search ?
                    <input type="text" placeholder="Search field name" className="search-box" onKeyUp={this.onFilterItem.bind(this)} />
                    : null
                }
                <div className="list-wrapper">
                    {this.props.quickFilters ?
                        <ul className="rb-list quick-filters-list">
                            {this.state.filters.map((item, idx) => {
                                return (
                                    <li key={item+idx} onClick={this.onSelectQuickFilter.bind(this, item.displayString)} className={item.selected ? "list-item selected-item" : "list-item"}>
                                        {item.displayString}
                                    </li>
                                );
                            })}
                        </ul> : null
                    }
                    <ul className="rb-list list-container">
                        {this.state.filteredItems.map((item, idx) => {
                            return (
                                <li key={item.identifier} className="list-item">
                                    <p className={tooltipClass} onClick={this.onSelectItem.bind(this, item)}>
                                        <i className={this.testIfSelected(item) ? 'item-checkbox selected' : 'item-checkbox'} key={'input-'+item.identifier}></i>
                                        <span className="item-name">{item.displayString}</span>
                                        {this.props.tooltip ? <span className="tooltip-content">{item.description}</span> : null}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
