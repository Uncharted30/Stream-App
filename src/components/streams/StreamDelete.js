import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { deleteStream, fetchStream } from "../../actions"
import {Link} from "react-router-dom";

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    actions = () => {
        return(
            <React.Fragment>
                <button className="ui negative button" onClick={() => this.props.deleteStream(this.props.stream.id)}>Delete</button>
                <Link to="/" className="ui primary button" onClick={this.onCancelClick}>Cancel</Link>
            </React.Fragment>
        );
    }

    render(){
        if(this.props.stream){
            return(
                <div>
                    <Modal
                    header="Delete stream"
                    content={`Are you sure you want to delete the stream ${this.props.stream.title}?`}
                    actions={this.actions()}
                    onDismiss={() => history.push('/')}
                    />
                </div>
            );
        } else {
            return <div>Loading...</div>
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    return({
        stream: state.streams[ownProps.match.params.id]
    });
}

export default connect(mapStateToProps,{
    deleteStream: deleteStream,
    fetchStream: fetchStream
})(StreamDelete);