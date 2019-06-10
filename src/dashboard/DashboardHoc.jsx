import React from 'react';
import axiosFetcher from '../global/dataFetcher/axiosFetcher';
import DashRings from '../assets/images/dashboardloader.gif';
var QuickSightEmbedding = require("amazon-quicksight-embedding-sdk");
function DashBoardHoc(WrappedComponent,DashboardName,ContainerName) {
   return class DashBoardContainer extends React.Component {
        constructor(props) {
            super(props);
            this.state = {}
        }


        onDashboardLoad = (payload) => {
            this.setState({ dashboardLoading: false })
            console.log("Do something when the dashboard is fully loaded.");
        }

        onError = (payload) => {
            this.setState({ dashboardLoading: false })
            console.log("Do something when the dashboard fails loading");
        }
        embedDashboard = () => {
            var containerDiv = document.getElementById(ContainerName);
            var options = {
                url: this.state.EmbedUrl,
                container: containerDiv,
                scrolling: "yes",
                height: "700px",
            };
            let dashboard = QuickSightEmbedding.embedDashboard(options);
            dashboard.on("error", this.onError);
            dashboard.on("load", this.onDashboardLoad);
        }
        componentDidMount() {
            this.setState({ dashboardLoading: true })
            axiosFetcher({
                method: 'POST',
                url: "DashBoardUrl/Get",
                reqObj: {
                    Email: localStorage.getItem('email'),
                    DashBoardName:DashboardName
                },
                successCb: (res) => {
                    this.state.EmbedUrl = res.EmbedUrl;
                    if(DashboardName=="INVENTORY_ANALYSIS")
                    this.setState({ dashboardLoading: false })
                    
                    this.embedDashboard();
                    // this.setState({ EmbedUrl: res.EmbedUrl});

                },
                errorCb: () => {this.setState({dashboardLoading:false})},
                dontShowMessage: true
            })
        }

        render() {
            return (
                <React.Fragment>


                    {this.state.dashboardLoading ?
                        <div className='flex-row justify-center align-center' style={{ height: '100vh' }}>
                            <img src={DashRings} height='200px' width="200px" />
                        </div>

                        : null}
                    <WrappedComponent />
                </React.Fragment>


            )
        }
    }
}

export default DashBoardHoc