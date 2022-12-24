import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import FundCard from './FundCard';
import {loader} from '../assets';

const DisplayCampaigns = ({title, isLoading, campaigns}) => {
    const [sort, setSort] = useState("newest");
    const navigate = useNavigate();
    // campaigns.sort((a, b) => a.deadline - b.deadline);
    console.log(campaigns)

    useEffect(() => {
        // if (sort === "oldest") {
        //     campaigns.sort((a, b) => b.deadline - a.deadline);
        // } else if (sort === "newest") {
        //     campaigns.sort((a, b) => a.deadline - b.deadline);
        // } else
            if (sort === "least-funded") {
            campaigns.sort((a, b) => Number(b.amountCollected) - Number(a.amountCollected));
        } else if (sort === "most-funded") {
            campaigns.sort((a, b) => Number(a.amountCollected) - Number(b.amountCollected));
        } else if (sort === "least-target") {
            campaigns.sort((a, b) => Number(b.target) - Number(a.target));
        } else if (sort === "most-target") {
            campaigns.sort((a, b) => Number(a.target) - Number(b.target));
        } else if (sort === "least-days") {
            campaigns.sort((a, b) => Number(b.deadline) - Number(a.deadline));
        } else if (sort === "most-days") {
            campaigns.sort((a, b) => Number(a.deadline) - Number(b.deadline));
        }
    }, [sort]);


    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, {state: campaign})
    }

    return (
        <div className="my-5">
            <div className="flex justify-between items-center">
                <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>
                <div className="flex content-center">
                    <h1 className={`font-epilogue font-semibold text-[18px] text-white text-left}`}>
                        Sort by:
                    </h1>
                    <select
                        className="bg-[#2c2f32] text-white font-epilogue font-semibold text-[14px] rounded-[10px] px-2 py-1 ml-2"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        {/*<option value="newest">Newest</option>*/}
                        {/*<option value="oldest">Oldest</option>*/}
                        <option value="most-days">Most Days Left</option>
                        <option value="least-days">Least Days Left</option>
                        <option value="most-funded">Most Funded</option>
                        <option value="least-funded">Least Funded</option>
                        <option value="most-target">Most Target</option>
                        <option value="least-target">Least Target</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
                    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain"/>
                )}

                {!isLoading && campaigns.length === 0 && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                        You have not created any campigns yet
                    </p>
                )}

                {!isLoading && campaigns.length > 0 && campaigns.map((campaign, index) => <FundCard
                    key={index}
                    {...campaign}
                    handleClick={() => handleNavigate(campaign)}
                />)}
            </div>
        </div>
    )
}

export default DisplayCampaigns