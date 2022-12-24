import React, {useState, useEffect} from 'react'
import {thirdweb} from '../assets';
import {DisplayCampaigns} from '../components';
import {useStateContext} from '../context'

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [campaignsDonatedTo, setCampaignsDonatedTo] = useState([]);
    const [totalAmountRaised, setTotalAmountRaised] = useState(0);
    const [totalAmountTargeted, setTotalAmountTargeted] = useState(0);

    const {address, contract, getUserCampaigns, getCampaignsDonatedTo} = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getUserCampaigns();
        const data2 = await getCampaignsDonatedTo();
        setCampaigns(data);
        setCampaignsDonatedTo(data2);
        console.log(data2)
        setTotalAmountRaised(data.length>0 ? data.reduce((acc, curr) => parseFloat(acc.amountCollected) + parseFloat(curr.amountCollected)) : 0);
        setTotalAmountTargeted(data.length>0 ? data.reduce((acc, curr) => parseFloat(acc.target) + parseFloat(curr.target)) : 0);
        setIsLoading(false);
    }

    useEffect(() => {
        if (contract) fetchCampaigns().then();
    }, [address, contract]);

    return (
        <div>
            <div className="flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-[100px] h-[100px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                        <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
                    </div>
                    <p className="text-[#fff] text-[16px] font-epilogue font-semibold leading-[18px]">{address}</p>
                    <p className="text-[#fff] text-[16px] font-epilogue font-semibold leading-[18px]">
                        Total amount raised: {totalAmountRaised} ETH / {totalAmountTargeted} ETH ({totalAmountTargeted !== 0 ? (totalAmountRaised / totalAmountTargeted).toFixed(3) * 100 : 0}%)
                    </p>
                </div>
            </div>
            <DisplayCampaigns
                title="All Campaigns You Created"
                isLoading={isLoading}
                campaigns={campaigns}
            />
            <DisplayCampaigns
                title="All Campaigns You Donated"
                isLoading={isLoading}
                campaigns={campaignsDonatedTo}
            />
        </div>
    )
}

export default Profile