import React from "react";
import { fetchStreams } from "../../actions" 
import { connect } from "react-redux"
import { Link } from "react-router-dom";

class StreamList extends React.Component {
    componentDidMount = () =>{
        this.props.fetchStreams();
    }

    renderButton = (stream) => {
        if( stream.userId === this.props.CurrentUserId ) {
            return(
                <div className="right floated content">
                    <Link className="ui primary basic button"
                    to={`/streams/edit/${stream.id}`}>
                        Edit
                    </Link>
                    <Link 
                    className="ui red basic button"
                    to={`/streams/delete/${stream.id}`}>
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList = () => {
        const streamsList = this.props.streams.map((stream) => {
            return(
                <div className="item" key={stream.id}>
                    <div>{this.renderButton(stream)}</div>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>     
            );
        });
        return streamsList;
    }

    renderCreate = () => {
        if( this.props.CurrentUserId ){
            return(
                <div style={{textAlign: "right"}}>
                    <Link to="/streams/new">
                        <button className="ui basic positive button">Create Stream</button>
                    </Link>
                </div>
            );
        }
    }

    render() {
        return(
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return({
        streams: Object.values(state.streams),
        CurrentUserId: state.auth.userId
    });
}

export default connect(mapStateToProps,{
    fetchStreams: fetchStreams
})(StreamList);