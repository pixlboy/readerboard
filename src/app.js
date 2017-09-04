/**
 * Name : Readerboard
 * Author : Rachit Garg
 */
import "styles/styles.scss";
import {MainTable} from "scripts/main-table";
import {ConfigChooser} from "scripts/config-chooser";
import {SavedViews} from "scripts/saved-views";

MainTable.defaultProps = {
    startColumn : "Workgroups",
    theme : 'light',
    emptyCellText : "N/A",
    tooltip : false,
    fullScreen : false,
    tableRows : [],
    tableCols : [],
    tableData: {}
};

ConfigChooser.defaultProps = {
    totalItems: [],
    selectedItems: [],
    quickFilters: false,
    search: false,
    bullets: false,
    tooltip: false,
    fullScreen: false
};

SavedViews.defaultProps = {
    totalItems: [],
    fullScreen: false
};

export {MainTable, ConfigChooser, SavedViews};
