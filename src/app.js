/**
 * Name : Marksheet Table Component
 * Author : Rachit Garg
 */
import "styles/styles.scss";
import {MainTable} from "scripts/main-table";
import {ConfigChooser} from "scripts/config-chooser";
import {SavedViews} from "scripts/saved-views";

MainTable.defaultProps = {
    startColumn : "Subjects",
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
    tooltip: false
};

SavedViews.defaultProps = {
    totalItems : []
};

export {MainTable, ConfigChooser, SavedViews};
