// import React from 'react';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { ShowController } from 'react-admin';
// import _get from 'lodash/get';
// import _isEmpty from 'lodash/isEmpty'
// import moment from 'moment';

// let DineroInit = (amount, currency, precision) => (
//     Dinero({amount:  parseInt(amount) || 0, currency: currency || 'USD', precision: precision || 2}).toFormat('$0,0.00')
// )

// let subTotal = 0

// const showItemTable = record => {
//     _get(record, 'sale.saleItems', []).map(item => {
//         subTotal += _get(item, 'subTotal', DineroInit()).getAmount()
//         return (
//             <div style={{ display: 'flex', flex: '1', paddingTop: "10px", paddingBottom: "10px", borderBottom: 'dotted 1px #9e9e9e' }}>
//                 <div style={{ width: "35%" }}>{_get(item, 'doc.product.isGiftCard', false) ? 'Gift Card' : _get(item, 'doc.product.name', '')}<br /><span style={{ fontSize: '10px' }}>{_get(item, 'packages[0].label')}</span></div>
//                 <div style={{ width: "10%", textAlign: "center" }}>{_get(item, 'qty', '')}</div>
//                 <div style={{ width: "30%", textAlign: "right" }}>{DineroInit(_get(item, 'doc.product.salePrice.amount', 0)).toFormat('$0,0.00')}<br />
//                     <div style={{ fontSize: "9px" }}>
//                         {_get(item, 'itemDiscountMoney', DineroInit()).getAmount() == 0 ? '' : <span>(Item Disc.: {_get(item, 'itemDiscountMoney', DineroInit()).toFormat('$0,0.00')})</span>}
//                         <br />
//                         {_get(item, 'empDiscountMoney', DineroInit()).getAmount() == 0 ? '' : <span>(Emp Disc.: {_get(item, 'empDiscountMoney', DineroInit()).toFormat('$0,0.00')})</span>}
//                         {_get(item, 'cartDiscountMoney', DineroInit()).getAmount() == 0 ? '' : <span>(Cart Disc.: {_get(item, 'cartDiscountMoney', DineroInit()).toFormat('$0,0.00')})</span>}
//                     </div>
//                 </div>
//                 <div style={{ width: "25%", textAlign: "right" }}>{_get(item, 'subTotal', DineroInit()).toFormat('$0,0.00')}</div>
//             </div>
//         )
//     })
// }

// const SaleHistoryShow = props => (
//     <ShowController {...props} title=" ">
//         {({ record }) =>
//             record && (
//                 <Card style={{ width: 600, margin: 'auto' }}>
//                     <CardContent>
//                         <Grid container spacing={16}>
//                             <Grid item xs={12}>
//                                 <Typography variant="title" gutterBottom>
//                                     Invoice
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                         <Grid container spacing={16}>
//                             <Grid item xs={12}>
//                                 <Typography>
//                                     Order id: {_get(record, 'sale.id', '')}
//                                 </Typography>
//                                 <Typography>
//                                     Date: {moment(_get(record, 'sale.saleTimeStamp.seconds', '') * 1000).toFormat('DD/MM/YYYY hh:mm:ss')}
//                                 </Typography>
//                                 <Typography>
//                                     Store Name: {_get(record.store, 'name', '')}
//                                 </Typography>
//                                 <Typography>
//                                     Address: {_get(record.store, 'address.addressLine1', '') + ', ' + _get(record.store, 'address.addressLine2', '') + ', ' + _get(record.store, 'address.city', '') + ', ' + _get(record.store, 'address.state', '') + ', ' + _get(record.store, 'address.country', '') + ', ' + _get(record.store, 'address.postalCode', '')}
//                                 </Typography>
//                                 <Typography>
//                                     Cashier: {_get(record.operator, 'person.firstName') + _get(record.operator, 'person.lastName')}
//                                 </Typography>
//                                 <Typography>
//                                     Terminal: {_get(record.terminal, 'name', '')}
//                                 </Typography>
//                                 <Typography>
//                                     Customer: {_get(record.customer, 'customer.firstName', '') + _get(record.customer, 'customer.lastName', '')}
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                         <Grid container spacing={16}>
//                             <Grid item xs={8} align="left">
//                                 <Typography>Total Tax:</Typography>
//                                 <Typography>Grand Total:</Typography>
//                                 <Typography>Total Paid:</Typography>
//                                 <Typography>Change Due:</Typography>
//                                 <Typography>Payment Method:</Typography>
//                             </Grid>
//                             <Grid item xs={8} align="right">
//                                 <Typography>{DineroInit(_get(record,'sale.totalTaxAmount.amount',0))}</Typography>
//                                 <Typography>{DineroInit(_get(record,'sale.totalAmount.amount',0))}</Typography>
//                                 <Typography>{DineroInit(_get(record,'sale.totalAmountPaid.amount',0))}</Typography>
//                                 <Typography>{DineroInit(_get(record,'sale.changeDue.amount',0))}</Typography>
//                                 <Typography>{_}</Typography>
//                             </Grid>
//                         </Grid>
//                     </CardContent>
//                 </Card>
//             )
//         }
//     </ShowController>
// );

// export default SaleHistoryShow;
