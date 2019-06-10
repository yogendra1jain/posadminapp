import React from 'react';
import axiosFetcher from '../global/dataFetcher/axiosFetcher';
var QuickSightEmbedding = require("amazon-quicksight-embedding-sdk");

class InventoryDashBoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    
    onDashboardLoad = (payload)=> {
        console.log("Do something when the dashboard is fully loaded.");
    }

    onError =(payload)=> {
        console.log("Do something when the dashboard fails loading");
    }
    embedDashboard =()=> {
        var containerDiv = document.getElementById("InventoryDashBoardContainer");
        var options = {
            url: this.state.EmbedUrl,
            container: containerDiv,
            scrolling: "yes",
            height: "700px"
        };
        let dashboard = QuickSightEmbedding.embedDashboard(options);
        dashboard.on("error", this.onError);
        dashboard.on("load", this.onDashboardLoad);
    }
    componentDidMount(){
          axiosFetcher({
            method: 'POST',
            url: "DashBoardUrl/Get",
            reqObj: {
                Email: "admin@mega.com",
                DashBoardName:'INVENTORY_ANALYSIS'
            },
            successCb: (res) => {
                this.state.EmbedUrl = res.EmbedUrl;
                this.embedDashboard();
                // this.setState({ EmbedUrl: res.EmbedUrl});

            },
            errorCb: () => console.log("err is here"),
            dontShowMessage: true
        })
    }   

    render() {
        return (
           
                <div id="InventoryDashBoardContainer"></div>

        )
    }
}

export default InventoryDashBoardContainer;