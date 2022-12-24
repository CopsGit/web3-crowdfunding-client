import React from 'react';
import {CustomButton} from "../components";
import {useStateContext} from "../context";
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const { connect, disconnect, address } = useStateContext();
    const navigate = useNavigate();

    return (
        <div className="flex content-center h-3/5 bg-amber-50">
            <div className="m-auto">
                <CustomButton
                    btnType="button"
                    title={address ? 'Disconnect' : 'Connect Your Web3 Wallet'}
                    styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                    handleClick={() => {
                        if(address) {
                            disconnect();
                            // window.ethereum.disconnect()
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
