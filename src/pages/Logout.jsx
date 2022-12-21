import React from 'react';
import {CustomButton} from "../components";
import {useStateContext} from "../context";
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const { connect, disconnect, address } = useStateContext();
    const navigate = useNavigate();

    return (
        <div className="flex content-center h-3/5">
            <div className="m-auto">
                <CustomButton
                    btnType="button"
                    title={address ? 'Logout' : 'You are not logged in, login here'}
                    styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                    handleClick={() => {
                        if(address) {
                            disconnect();
                            navigate('/');
                        }
                        else connect();
                    }}
                />
            </div>
        </div>
    );
};

export default Logout;
