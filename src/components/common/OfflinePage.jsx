import React from 'react';
import noInternet from '../../assets/images/no-internet-connection.jpg';

class OfflinePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (

     <div className="no-internet">
         <img src={noInternet} />
         {/* <button type="button" className="btn btn-info">Try Again</button> */}
     </div>
    );
  }
}


export default (OfflinePage);
