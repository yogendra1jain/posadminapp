import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';

/* Material import */

/* Redux Imports */

/* Component Imports */
import HighVelocityChart from './Components/HighVelocityChart';
import LowVelocityChart from './Components/LowVelocityChart';
import PaymentMethodsPie from './Components/PaymentMethodsPie';

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
                    <div className='row'>
                        <div className='col-sm-3'>
                            <div className='flex-column'>
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
                        <div className='col-sm-9'>
                            <div className='card flex-column'>
                                <span className='card-title'>High Velocity Items</span>
                                <HighVelocityChart />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-8'>
                            <div className='card flex-column'>
                                <span className='card-title'>Low Velocity Items</span>
                                <LowVelocityChart/>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='card flex-column payment-method-pie'>
                                <span className='card-title'>Payment Methods</span>
                                <PaymentMethodsPie/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='card dashboard-table-margin'>
                            <span className='card-title'>Low Inventory</span>
                        </div>   
                    </div>
                    
                    <div className='row'>
                        <div className='card dashboard-table-margin '>
                            <span className='card-title'>Out Of stock</span>
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardContainer;