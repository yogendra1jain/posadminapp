import React from 'react';
import SaveButton from '../../components/common/SaveButton.jsx'
import { fetchRewardEarnRule, saveRewardEarnRuleData } from '../../actions/rules';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import Row from "react-bootstrap/lib/Row";
import { GenericInput } from '../../components/common/TextValidation.jsx';
import Alert from 'react-s-alert';
import _cloneDeep from 'lodash/cloneDeep';

const data = {
    name:'adi',
}

class RulesCreateContainer extends React.Component {
    constructor(props) {
        super(props);
        this.method = 'PUT';
        this.rewardSpentInfo = {};
        this.rewardEarnInfo = {};
        this.submitedRER = false;
        this.submitedRSR = false;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSpentInputChange = this.handleSpentInputChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSaveRER = this.onSaveRER.bind(this);
        this.fetchEarnRulesFlag = false;
        this.fetchSpentRulesFlag = false;
        this.fetchEarnRules = this.fetchEarnRules.bind(this);
        this.fetchSpentRules = this.fetchSpentRules.bind(this);
    }

    fetchEarnRules(){
        this.fetchEarnRulesFlag = true;
        const { dispatch, rulesReducer } = this.props;
        let url = '/rewardpointrule?owner='+localStorage.getItem('retailerID');
        dispatch(fetchRewardEarnRule(rulesReducer, url));
    }
    fetchSpentRules(){
        this.fetchSpentRulesFlag = true;
        const { dispatch, rulesReducer } = this.props;
        let url = '/spentrewardpointrule?owner='+localStorage.getItem('retailerID');
        dispatch(fetchRewardEarnRule(rulesReducer, url));
    }
    componentDidMount() {
        this.fetchEarnRules();
        
    }
    handleInputChange(event) {
        _set(this.rewardEarnInfo, event.target.name, parseFloat(event.target.value));
        this.forceUpdate();
    }
    handleSpentInputChange(event) {
        _set(this.rewardSpentInfo, event.target.name, parseFloat(event.target.value));
        this.forceUpdate();
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
            Alert.success(msg || 'successfully subimetted', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }

    }
    onSave() {
        this.submitedRSR = true;
        const {dispatch, rulesReducer } = this.props;
        let data = {};
        data = _cloneDeep(this.rewardSpentInfo);
        delete data['$class'];
        delete data['moneySpent'];
        delete data['pointsEarned'];
        _set(data, 'owner', localStorage.getItem('retailerID'));
        let url = '';
        if(data.id && data.id!==''){
            this.method = 'PUT';
            url = "/spentrewardpointrule/"+this.rewardSpentInfo.id;
        }else{
            this.method = 'POST';
            url = "/spentrewardpointrule/"
        }
        // url = "/spentrewardpointrule/"+this.rewardSpentInfo.id;
        dispatch(saveRewardEarnRuleData(rulesReducer, data, this.method, url));
        this.forceUpdate();
    }
    onSaveRER() {
        this.submitedRER = true;
        const {dispatch, rulesReducer } = this.props;
        let data = {};
        data = _cloneDeep(this.rewardEarnInfo);
        delete data['$class'];
        
        _set(data, 'owner', localStorage.getItem('retailerID'));
        let url = '';
        if(data.id && data.id!==''){
            this.method = 'PUT';
            url = "/earnedrewardpointrule/"+this.rewardEarnInfo.id;
        }else{
            this.method = 'POST';
            url = "/earnedrewardpointrule/"
        }
        
        dispatch(saveRewardEarnRuleData(rulesReducer, data, this.method, url));
        this.forceUpdate();
    }


    componentWillReceiveProps(props) {
        if(this.fetchEarnRulesFlag && !_isEmpty(props.rewardEarnRules)){
            this.fetchEarnRulesFlag = false;
            if(props.status===200){
                this.rewardEarnInfo = _get(props.rewardEarnRules,'earnedPointRule[0]',{});
                this.rewardSpentInfo = _get(props.rewardEarnRules,'spentPointRule[0]',{}); 
                // this.fetchSpentRules();

            }else{
                // this.fetchSpentRules();
                this.showAlert(true, props.rewardEarnRules.message);
            }
                       
        }
        // if(this.fetchSpentRulesFlag && !_isEmpty(props.rewardEarnRules)){
        //     this.fetchSpentRulesFlag = false;
        //     if(props.status===200){
        //         // this.rewardEarnInfo = props.rewardEarnRules[0];
        //         this.rewardSpentInfo = props.rewardEarnRules[0]; 

        //     }else{
        //         this.showAlert(true, props.rewardEarnRules.message);
        //     }

        // }
        if(this.submitedRER && !_isEmpty(props.rewardEarnRulesData)){
            this.submitedRER = false;
            if(props.status===200){
              this.showAlert(false, props.rewardEarnRulesData.message);   
              this.fetchEarnRules();           
            }else{
                this.showAlert(true, props.rewardEarnRulesData.message);               
            }
        }
        if(this.submitedRSR && !_isEmpty(props.rewardEarnRulesData)){
            this.submitedRSR = false;
            if(props.status===200){
              this.showAlert(false, props.rewardEarnRulesData.message); 
              this.fetchEarnRules();             
            }else{
                this.showAlert(true, props.rewardEarnRulesData.message);               
            }
        }

        this.forceUpdate();

    }

    render() {

        if (_get(this, 'props.isFetching')) {
            return (<div className='loader-wrapper-main'>
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>);
        }


        return (
            <div className="strainBlock">
                {/* <span className="glyphicon glyphicon-remove drawer-close" onClick={this.closeDrawer}></span> */}
                <div className="row">
                <div className="col-sm-6">
                <div className="contact-panel2">
                <Row className="d-flex">
                    <div className="col-sm-6 form-d">
                        <label className="control-label">Money Spent</label>
                        <GenericInput
                            htmlFor="moneySpent" displayName="Money Spent" type="number"
                            inputName="moneySpent" defaultValue={_get(this.rewardEarnInfo, 'moneySpent', '')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                    <div className="col-sm-6 form-d">
                        <label className="control-label">Reward Points Earned</label>
                        <GenericInput
                            htmlFor="pointsEarned" displayName="Reward Points Earned" type="number"
                            inputName="pointsEarned" defaultValue={_get(this.rewardEarnInfo, 'pointsEarned', '')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                    <div className="col-sm-12">
                        <div className="form-btn-group">
                            <SaveButton buttonDisplayText={'Save'} Class_Name={"btn-info"} handlerSearch={()=>this.onSaveRER()} />
                        </div>
                    </div>
                </Row>
                </div>
                </div>
                <div className="col-sm-6">
                <div className="contact-panel2">
                <Row>
                    <div className="col-sm-6 form-d">
                        <label className="control-label">Reward Points Spent</label>
                        <GenericInput
                            htmlFor="pointsSpent" displayName="Reward Points Spent" type="number"
                            inputName="pointsSpent" defaultValue={_get(this.rewardSpentInfo, 'pointsSpent', '')}
                            onChange={this.handleSpentInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                    <div className="col-sm-6 form-d">
                        <label className="control-label">Equivalent Money</label>
                        <GenericInput
                            htmlFor="equivalentMoney" displayName="Equivalent Money" type="number"
                            inputName="equivalentMoney" defaultValue={_get(this.rewardSpentInfo, 'equivalentMoney', '')}
                            onChange={this.handleSpentInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                    <div className="col-sm-12">
                        <div className="form-btn-group">
                            <SaveButton buttonDisplayText={'Save'} Class_Name={"btn-info"} handlerSearch={this.onSave} />
                        </div>
                    </div>
                </Row>
                </div>
                </div>
                </div>


            </div>
        )

    }

}

const mapStateToProps = state => {

    let { rulesReducer } = state

    let { status } = rulesReducer || '';
    let { isFetching } = rulesReducer || false;
    let { type, rewardEarnRules, rewardEarnRulesData} = rulesReducer || {};




    return {
        status,
        isFetching,
        type,
        rewardEarnRules,
        rewardEarnRulesData

    }
}

export default connect(mapStateToProps)(RulesCreateContainer);
