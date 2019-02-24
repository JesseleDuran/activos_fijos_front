import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';

class CreateNewItemsDropdown extends React.Component {
    handleChange = (newValue, actionMeta) => {
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
    };
    handleInputChange = (inputValue, actionMeta) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    }
    render() {
        return (
            <CreatableSelect
                isClearable
                onChange={this.props.onChange}
                //onInputChange={this.handleInputChange}
                options={this.props.options}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                })}
                placeholder={this.props.label}
            />
        );
    }
}

export default CreateNewItemsDropdown;