import React from "react";
import StreamForm from "./StreamForm";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions"

class StreamEdit extends React.Component{
    componentDidMount = () => {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.stream.id, formValues);
    }

    render() {
        if( !this.props.stream ) {
            return <div>Loading...</div>
        } else {
            if( this.props.stream.userId === this.props.auth.userId ) {
                return(
                    <div>
                        <h2>Edit a stream</h2>
                        <StreamForm
                        onSubmit={this.onSubmit}
                        initialValues={{
                            title: this.props.stream.title,
                            description: this.props.stream.description
                        }}
                        />
                    </div>
                );
            } else {
                return <div></div>
            }
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    return({
        auth: state.auth,
        stream: state.streams[ownProps.match.params.id]
    });
}

export default connect(mapStateToProps, {
    fetchStream: fetchStream,
    editStream: editStream
})(StreamEdit);