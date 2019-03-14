import React, {Component} from 'react';
import {createRewardPointsEarningRule, createRewardPointsRedeemptionRule} from '../../actions/rewardPointsRule';
import {connect} from 'react-redux';
import Alert from 'react-s-alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveButton from '../../components/common/SaveButton';
import {getRewardPointRedeemptionRule, getRewardPointEarningRule} from '../../actions/rewardPointsRule';
import _isEmpty from 'lodash/isEmpty';

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

    showAlert(error, msg) {
        if (error) {
            Alert.error(msg || '', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 5000,
                html: true
            });
            this.forceUpdate();
        } else {
            Alert.success(msg || 'successfully saved.', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }
    }

    componentDidMount() {
        let reqObj = {
            id: localStorage.getItem('retailerID')
        }
        let earningUrl = '/Rewards/EarningRule/ByRetailer'
        let redeemptionUrl = '/Rewards/RedemptionRule/ByRetailer'
        this.props.dispatch(getRewardPointEarningRule('', earningUrl, reqObj))
        this.props.dispatch(getRewardPointRedeemptionRule('', redeemptionUrl, reqObj))
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.type == 'SUCCESS_CREATE_RP_EARNING_RULE') {
            if(nextProps.status == 200) {
                this.showAlert(false, 'Reward points earning rule created successfully!')
                this.setState({
                    minSaleAmountEarning: 0,
                    earningMultiplier: 1
                })
            } else {
                this.showAlert(false, 'Some error occured!')
            }
        }

        if(nextProps.type == 'SUCCESS_CREATE_RP_REDEEMPTION_RULE') {
            if(nextProps.status == 200) {
                this.showAlert(false, 'Reward points redeemption rule created successfully!')
                this.setState({
                    minSaleAmountRedeemption: 0,
                    redeemptionMultiplier: 1
                })
            } else {
                this.showAlert(false, 'Some error occured!')
            }
        }

        if(!_isEmpty(nextProps.rewardPointsEarningRule)) {
            let earningRule =  nextProps.rewardPointsEarningRule.earningRule
            this.setState({
                minSaleAmountEarning: earningRule.minimumSaleAmount,
                earningMultiplier: earningRule.earningMultiplier
            })  
        }

        if(!_isEmpty(nextProps.rewardPointsRedeemptionRule)) {
            let redemptionRule =  nextProps.rewardPointsRedeemptionRule.redemptionRule
            this.setState({
                minSaleAmountRedeemption: redemptionRule.minimumSaleAmount,
                redeemptionMultiplier: redemptionRule.redemptionMultiplier
            })  
        }
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
        this.props.dispatch(createRewardPointsEarningRule('', url, reqObj))
    }

    handleRPRedeemptionSubmit = () => {
        let url = '/Rewards/RedemptionRule/Create'
        let reqObj = {
            retailerId : localStorage.getItem('retailerID'),
            minimumSaleAmount : parseFloat(this.state.minSaleAmountRedeemption),
            redemptionMultiplier : parseFloat(this.state.redeemptionMultiplier)
        }
        this.props.dispatch(createRewardPointsRedeemptionRule('', url, reqObj))
    }

    render() {
        
        console.log(this.props.rewardPointsRedeemptionRule.redemptionRule, 'this.props.rewardPointsRedeemptionRule.redemptionRule')
        return (
            <div>
                <div>
                    <h2>Reward Points Earning Rule</h2>
                    <label>Minimum Sale Amount:</label>
                    <input type='number' value={this.state.minSaleAmountEarning} 
                    onChange={(e) => this.handleInputChange(e, 'saleAmountEarning')} />
                    <label>Earning Multiplier:</label>
                    <input type='number' value={this.state.earningMultiplier} 
                    onChange={(e) => this.handleInputChange(e, 'earningMultiplier')} />
                    {
                        this.props.rpEarningLoader ? <CircularProgress disableShrink/> :  <SaveButton type='submit' buttonDisplayText={'Submit'} Class_Name={"btn-info"} handlerSearch={this.handleRPEarningSubmit} />
                    }
                   
                </div>
                <div>
                    <h2>Reward Points Redeemption Rule</h2>
                    <label>Minimum Sale Amount:</label>
                    <input type='number' value={this.state.minSaleAmountRedeemption} 
                    onChange={(e) => this.handleInputChange(e, 'saleAmountRedeemption')} />
                    <label>Redeemption Multiplier:</label>
                    <input type='number' value={this.state.redeemptionMultiplier} 
                    onChange={(e) => this.handleInputChange(e, 'redeemptionMultiplier')} />
                    {
                        this.props.rpRedeemptionLoader ? <CircularProgress disableShrink/> : 
                        <SaveButton type='submit' buttonDisplayText={'Submit'} Class_Name={"btn-info"} handlerSearch={this.handleRPRedeemptionSubmit} />
                    }
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
 