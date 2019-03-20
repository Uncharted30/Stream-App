import React from "react";
import StreamForm from "./StreamForm";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {
    render() {
        return(
            <div>
                <h2>Create a stream</h2>
                <StreamForm onSubmit={this.props.createStream}/>
            </div>
        )
    }
}

export default connect(null, {
    createStream: createStream
})(StreamCreate);