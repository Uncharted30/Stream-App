import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
    renderError = (meta) => {
        if( meta.touched && meta.error ){
            return <div className="ui error message"><i>{meta.error}</i></div>
        }
    }

    renderInput = (formProps) => {
        return(
            <div className="field">
                <label>{formProps.label}</label>
                <input type="text" {...formProps.input} autoComplete="off"/>
                {this.renderError(formProps.meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        console.log(this.props.initialValues)
        return(
            <div>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="title" component={this.renderInput} label="Title"/>
                    <Field name="description" component={this.renderInput} label="Description"/>
                    <button className="ui primary button">Submit</button>
                </form>
            </div>
        )
    }
}

const validate = (formValues) => {
    var error = {};

    if( !formValues.title ) {
        error.title = "You must enter a title"
    };

    if( !formValues.description ) {
        error.description = "You must enter a description"
    };

    return error;
};

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm); 