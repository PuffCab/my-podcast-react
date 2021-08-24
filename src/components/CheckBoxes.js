import React from 'react';

const CheckBoxes = () => {


    const [checked, setChecked] = React.useState()

    const handleChange = () => {
        setChecked(!checked)
    }


    return (
        <div>
            <label htmlFor="">
                <input type="checkbox" name="uno" id="uno" checked={checked} onChange={handleChange} />
                Uno
            </label>
            {/* <p>Is "UNo" checked? {checked.toString()}</p> */}

            
        </div>
    );
};

export default CheckBoxes;