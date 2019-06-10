
import DashBoardHoc from './DashboardHoc';
import React from 'react';
class InventoryDashBoardContainer extends React.Component {

    render() {
        return (
            <div id="InventoryDashBoardContainer"></div>
        )
    }
}

export default DashBoardHoc(InventoryDashBoardContainer,'INVENTORY_ANALYSIS','InventoryDashBoardContainer');