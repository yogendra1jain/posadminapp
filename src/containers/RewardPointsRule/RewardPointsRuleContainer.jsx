import React, {Component} from 'react';
import {createRewardPointsEarningRule, createRewardPointsRedeemptionRule} from '../../actions/rewardPointsRule';
import {connect} from 'react-redux';
import Alert from 'react-s-alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveButton from '../../components/common/SaveButton';
import {getRewardPointRedeemptionRule, getRewardPointEarningRule} from '../../actions/rewardPointsRule';
import _isEmpty from 'lodash/isEmpty';
import genericPostData from '../../Global/DataFetch/genericPostData';
import showMessage from '../../actions/toastAction';
class RewardPointsRuleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minSaleAmountEarning: 0,
            minSaleAmountRedeemption: 0,
            earningMultiplier: 1,
            redeemptionMultiplier: 1
        }
    }

    componentDidMount() {
        let reqObj = {
            id: localStorage.getItem('retailerID')
        }
        let earningUrl = '/Rewards/EarningRule/ByRetailer'
        let redeemptionUrl = '/Rewards/RedemptionRule/ByRetailer'
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: earningUrl,
            identifier: 'RPEarningRulePost',
            successCb: this.handleGetRPEarningSuccess,
            errorCb: this.handleGetRPEarningError,
            successText: "Updated Successfully!"
        })
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: redeemptionUrl,
            identifier: 'RPEarningRulePost',
            successCb: this.handleGetRPRedeemptionSuccess,
            errorCb: this.handleGetRPRedeemptionError,
            successText: "Updated Successfully!"
        })
    }

    handleInputChange = (e, type) => {
        let value = e.target.value
        if(type == 'saleAmountEarning') {
            this.setState({ minSaleAmountEarning: value})
        } else if(type == 'earningMultiplier') {
            this.setState({ earningMultiplier: value})
        } else if(type == 'saleAmountRedeemption') {
            this.setState({ minSaleAmountRedeemption: value})
        } else if(type == 'redeemptionMultiplier') {
            this.setState({ redeemptionMultiplier: value})
        }
    }

    handleRPEarningSubmit = () => {
        let url = '/Rewards/EarningRule/Create'
        let reqObj = {
            retailerId : localStorage.getItem('retailerID'),
            minimumSaleAmount : parseFloat(this.state.minSaleAmountEarning),
            earningMultiplier : parseFloat(this.state.earningMultiplier)
        }
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url,
            identifier: 'address_from_zip',
            successCb: this.handleRPEarningPostSuccess,
            errorCb: this.handleRPEarningPostError,
            successText: "Saved Successfully!"
        })
    }

    handleRPEarningPostSuccess = (res) => {
        if(res.result) {
            let reqObj = {
                id: localStorage.getItem('retailerID')
            }
            let url = '/Rewards/RedemptionRule/ByRetailer'

            genericPostData({
                dispatch: this.props.dispatch,
                reqObj,
                url,
                identifier: 'RPEarningRulePost',
                successCb: this.handleGetRPEarningSuccess,
                errorCb: this.handleGetRPEarningError,
                successText: "Updated Successfully!"
            })
        }
    }

    handleRPEarningPostError = (err) => {
        this.props.dispatch(showMessage({text: err, isSuccess: false}))
    }

    handleGetRPEarningSuccess = (data) => {
        if(!_isEmpty(data.earningRule)) {
            let earningRule =  data.earningRule
            this.setState({
                minSaleAmountEarning: earningRule.minimumSaleAmount,
                earningMultiplier: earningRule.earningMultiplier
            })
        }
    }

    handleGetRPEarningError = (err) => {
        this.props.dispatch(showMessage({ text: err, isSuccess: false}))
    }

    handleRPRedeemptionSubmit = () => {
        let url = '/Rewards/RedemptionRule/Create'
        let reqObj = {
            retailerId : localStorage.getItem('retailerID'),
            minimumSaleAmount : parseFloat(this.state.minSaleAmountRedeemption),
            redemptionMultiplier : parseFloat(this.state.redeemptionMultiplier)
        }
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url,
            identifier: 'address_from_zip',
            successCb: this.handleRPRedeemptionPostSuccess,
            errorCb: this.handleRPRedeemptionPostError,
            successText: "Saved Successfully!"
        })
    }

    handleRPRedeemptionPostSuccess = (res) => {
        if(res.result) {
            let reqObj = {
                id: localStorage.getItem('retailerID')
            }
            let url = '/Rewards/RedemptionRule/ByRetailer'

            genericPostData({
                dispatch: this.props.dispatch,
                reqObj,
                url,
                identifier: 'address_from_zip',
                successCb: this.handleGetRPRedeemptionSuccess,
                errorCb: this.handleGetRPRedeemptionError,
                successText: "Updated Successfully!"
            })
        }
    }

    handleRPRedeemptionPostError = (err) => {
        this.props.dispatch(showMessage({text: err, isSuccess: false}))
    }

    handleGetRPRedeemptionSuccess = (data) => {
        if(!_isEmpty(data.redemptionRule)) {
            let redemptionRule =  data.redemptionRule
            this.setState({
                minSaleAmountRedeemption: redemptionRule.minimumSaleAmount,
                redeemptionMultiplier: redemptionRule.redemptionMultiplier
            }) 
        }
    }

    handleGetRPRedeemptionError = (err) => {
        this.props.dispatch(showMessage({ text: err, isSuccess: false }))
    }

    render() {  
        return (
            <div>
                <div className="white-box-container">
                    <div className="white-box-header">
                        <h2 className="white-box-title">Reward Points Earning Rule</h2>
                    </div>
                    <div className="white-box-body">
                        <div className="row">
                            <div className="col-sm-6 col-md-4 form-custom">
                                <label className="control-label">Minimum Sale Amount:</label>
                                <input className="form-control" type='number' value={this.state.minSaleAmountEarning} 
                                onChange={(e) => this.handleInputChange(e, 'saleAmountEarning')} />
                            </div>
                            <div className="col-sm-6 col-md-4 form-custom">
                                <label className="control-label">Earning Multiplier:</label>
                                <input className="form-control" type='number' value={this.state.earningMultiplier} 
                                onChange={(e) => this.handleInputChange(e, 'earningMultiplier')} />
                            </div>
                            <div className="col-sm-12 form-btn-group">
                                {
                                    this.props.rpEarningLoader ? <CircularProgress disableShrink/> :  <SaveButton type='submit' buttonDisplayText={'Submit'} Class_Name={"btn-info"} handlerSearch={this.handleRPEarningSubmit} />
                                }
                            </div>
                        </div> 
                    </div>
                                      
                </div>
                <div className="white-box-container">
                    <div className="white-box-header">
                        <h2 className="white-box-title">Reward Points Redeemption Rule</h2>
                    </div>
                    <div className="white-box-body">
                        <div className="row">
                            <div className="col-sm-6 col-md-4 form-custom">
                                <label className="control-label">Minimum Sale Amount:</label>
                                <input className="form-control" type='number' value={this.state.minSaleAmountRedeemption} 
                                onChange={(e) => this.handleInputChange(e, 'saleAmountRedeemption')} />
                            </div>
                            <div className="col-sm-6 col-md-4 form-custom">
                                <label className="control-label">Redeemption Multiplier:</label>
                                <input className="form-control" type='number' value={this.state.redeemptionMultiplier} 
                                onChange={(e) => this.handleInputChange(e, 'redeemptionMultiplier')} />
                            </div>
                            <div className="col-sm-12 form-btn-group">
                                {
                                    this.props.rpRedeemptionLoader ? <CircularProgress disableShrink/> : 
                                    <SaveButton type='submit' buttonDisplayText={'Submit'} Class_Name={"btn-info"} handlerSearch={this.handleRPRedeemptionSubmit} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {rewardPointsRule} = state
    const {status, type, rpEarningLoader, rpRedeemptionLoader, error, rewardPointsEarningRule, rewardPointsRedeemptionRule} = rewardPointsRule
    return {
        status,
        type,
        rpEarningLoader,
        rpRedeemptionLoader,
        error,
        rewardPointsEarningRule,
        rewardPointsRedeemptionRule
    } 
}

export default connect(mapStateToProps)(RewardPointsRuleContainer);


//I have integrated this component with genericPostData and we are not storing the data in reducer but we have both reducer and action file so if we need to store this in reducer we can make use of them.
 