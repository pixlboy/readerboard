/**
 * Name : Marksheet Table Component
 * Author : Rachit Garg
 */
'use strict';
import classNames from 'classnames';
export class MainTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cellWidth : 0
        }
    }

    addEmptyCell(){
        return <td className="body-cell rb-text-center">Please select some items</td>
    }

    addEmptyHeaderCell(){
        return <th className="head-cell rb-text-center">Please select some items</th>
    }

    addEmptyRow(){
        return <tr className="empty-row">
            <td className="table-first-col body-cell rb-text-center">
                <span className="icon"></span>
                <p>Please select some items</p>
            </td>
        </tr>
    }

    cellRenderer(item){
        let cells = [];
        this.props.tableCols.map((cell, j) => {
            cells.push(<td key={cell.identifier} className={this.props.tableData[item.identifier] && this.props.tableData[item.identifier][cell.identifier] && this.props.tableData[item.identifier][cell.identifier].type ? this.props.tableData[item.identifier][cell.identifier].type+" body-cell" : "body-cell"}>
            {this.props.tableData[item.identifier] && this.props.tableData[item.identifier][cell.identifier] ? (this.props.tableData[item.identifier][cell.identifier].value ? this.props.tableData[item.identifier][cell.identifier].value : this.props.emptyCellText) : this.props.emptyCellText}</td>);
        });
        return cells;
    }

    // calculateColumnWidth(){
    //     let width = this.scroller.offsetWidth;
    //     if(this.props.tableCols.length > 5){
    //         this.setState({
    //             cellWidth : Math.ceil(width/5)
    //         });
    //     } else{
    //         this.setState({
    //             cellWidth : Math.ceil(width/this.props.tableCols.length)
    //         });
    //     }
    // }

    render() {
        let tableClasses = classNames(
            'table-body',
            {
                'empty-tbody': this.props.tableRows.length === 0,
            }
        );
        let firstColumnCellClasses = classNames(
            'body-cell',
            'table-first-col',
            {
                'rb-tooltip-elm': this.props.tooltip
            }
        );
        let themeClasses = classNames(
            {
                'light' : (this.props.theme === 'light'),
                'dark' : (this.props.theme === 'dark'),
                'fullscreen' : (this.props.fullScreen)
            }
        );

        return (
            <main className={themeClasses}>
                <div className='rb-table-wrapper'>
                    <div className="scroll-wrapper" ref={(scroller) => { this.scroller = scroller }}>
                        <table>
                            <thead className="table-head">
                                <tr className="table-hrow">
                                    <th className="table-first-col head-cell">
                                        <span className="col-freeze-content">{this.props.startColumn}</span>
                                    </th>
                                    {this.props.tableCols.length > 0 ? (this.props.tableCols.map((col, i) => {
                                        return (
                                            <th key={col.identifier} className="head-cell">
                                                {col.displayString}
                                            </th>
                                        );
                                    })) : this.addEmptyHeaderCell()
                                    }
                                </tr>
                            </thead>
                            <tbody className={tableClasses}>
                                {this.props.tableRows.length > 0 ? (this.props.tableRows.map((item, idx) => {
                                    return (
                                        <tr key={item.identifier} className="table-row">
                                            <td className={firstColumnCellClasses}>
                                                <span className="col-freeze-content">{item.displayString}</span>
                                                {this.props.tooltip ? <span className="tooltip-content">{item.description}</span> : null}
                                            </td>
                                            {this.props.tableCols.length > 0 ? this.cellRenderer(item) : this.addEmptyCell()}
                                        </tr>
                                    )
                                })) : this.addEmptyRow() }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        );
    }
}
