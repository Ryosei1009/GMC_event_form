import React from 'react'
import EachItemList from './components/EachItemsList';
import EachEffectList from './components/EachEffectList';

const JobData = ({ itemList }) => {
    return (
        <div className="flex justify-center mx-3 mt-8">
            <div className="max-w-5xl w-full mb-16">
                <EachItemList itemList={itemList} />
                <EachEffectList itemList={itemList} />
            </div>
        </div>
    )
}

export default JobData