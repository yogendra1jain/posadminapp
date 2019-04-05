import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';

/* Material import */

/* Redux Imports */

/* Component Imports */
import HighVelocityChart from './Components/HighVelocityChart';
import LowVelocityChart from './Components/LowVelocityChart';
import PaymentMethodsPie from './Components/PaymentMethodsPie';
import LowInventoryTable from './Components/LowInventoryTable';
import OutOfStockTable from './Components/OutOfStockTable';

class DashboardContainer extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className='dashboard'>
                <div className='panel-container'>
                    <span className='panel-heading'>Dashboard</span>
                </div>
                <div className='fwidth flex-column'>

                    <div className='flex-row dash-1'>
                        <div className='dash-11'>
                            <div className='flex-column fheight'>
                                <div className='card flex-column'>
                                    <span className='card-title'>Order Velocity</span>
                                    <span className='card-value'>500</span>
                                </div>
                                <div className='card flex-column'>
                                    <span className='card-title'>Amount Of Sales</span>
                                    <span className='card-value'>$10,000</span>
                                </div>
                                <div className='card flex-column'>
                                    <span className='card-title'>No. of Sales</span>
                                    <span className='card-value'>10</span>
                                </div>
                            </div>
                        </div>
                        <div className='dash-12'>
                            <div className='card flex-column fheight'>
                                <span className='card-title'>High Velocity Items</span>
                                <HighVelocityChart />
                            </div>
                        </div>
                    </div>


                    <div className='flex-row dash-2'>
                        <div className='dash-21'>
                            <div className='card flex-column fheight'>
                                <span className='card-title'>Low Velocity Items</span>
                                <LowVelocityChart/>
                            </div>
                        </div>
                        <div className='dash-22'>
                            <div className='card flex-column payment-method-pie fheight'>
                                <span className='card-title'>Payment Methods</span>
                                <PaymentMethodsPie/>
                            </div>
                        </div>
                    </div>



                    <div className='flex-row dash-3'>
                        <div className='card fwidth'>
                            <span className='card-title'>Low Inventory</span>
                            <LowInventoryTable/>
                        </div>   
                    </div>
                    
                    <div className='flex-row dash-4'>
                        <div className='card fwidth'>
                            <span className='card-title'>Out Of stock</span>
                            <OutOfStockTable/>
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardContainer;