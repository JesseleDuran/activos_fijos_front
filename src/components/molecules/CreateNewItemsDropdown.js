import React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';

const CreateNewItemsDropdown =  ({onChange, options, label}) => {
        return (
            <CreatableSelect
                isClearable
                onChange={onChange}
                options={options}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                })}
                placeholder={label}
            />
        );
}

export default CreateNewItemsDropdown;