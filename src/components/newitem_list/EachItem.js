import React, { useEffect, useState } from 'react'
import './code.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-lua';
import Item from './components/Item';
import Image from './components/Image';
import Audio from './components/Audio';
import Emote from './components/Emote';
import Remove from './components/Remove';

const EachItem = ({ item, token }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, [isOpen, token]);

    const getItemTypeLabel = (item) => {
        if (item.item_type === "effect") return "効果アイテム";
        if (item.item_type === "image") return "画像表示アイテム";
        if (item.item_type === "audio") return "音楽再生アイテム";
        if (item.item_type === "giveitem") return "アイテム付与アイテム";
        return "通常アイテム";
    }

    return (
        <div id={item.id} className={`my-8 bg-white/50 rounded-xl cursor-pointer`}>
            <div className="mb-2 hover:bg-white rounded-xl p-4 w-full">
                <div onClick={() => setIsOpen(!isOpen)}>
                    <div className={`flex max-md:flex-col justify-between max-md:justify-center`}>
                        <div className="flex flex-col items-center sm:flex-row max-md:max-w-full max-w-[60%]">
                            <div className="relative sm:mr-4">
                                <img loading="lazy" className="min-w-32 max-w-32 min-h-32 max-h-32" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/images/items/2years_event_${item.citizenid}.png`} alt="" />
                                <div className="absolute bottom-0 right-0 text-black">
                                    0.1
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{item.name}<span className="text-xl font-normal"> (2years_event_{item.citizenid})</span></p>
                                <p className="text-base font-normal">{item.description}</p>
                            </div>
                        </div>
                        <div className={`flex justify-between flex-col max-md:items-center max-md:flex-row`}>
                            <div className={`mt-2`}>
                                <div className="mb-2">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                        {getItemTypeLabel(item)}
                                    </span>
                                </div>

                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                    作成者
                                </span>
                                {item.citizenid}

                                {item.is_remove ? (
                                    <>
                                        <div className="font-bold text-red-600 mt-4 mb-2">
                                            <div className="font-bold">使用後削除アイテム</div>
                                        </div>
                                    </>
                                ) : ""}

                                {item.is_image ? (
                                    <div className="font-bold text-indigo-600 mt-4 mb-2">
                                        <div className="font-bold">画像表示アイテム</div>
                                        {item.display_type && <div>表示タイプ: {item.display_type}</div>}
                                        <img className="w-48" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/images/gmc2/utilsystem/2years_event_${item.citizenid}.png`} alt="" />
                                    </div>
                                ) : ""}

                                {item.is_audio ? (
                                    <>
                                        <div className="font-bold text-yellow-600 mt-4 mb-2">
                                            <div className="font-bold">音楽再生アイテム</div>
                                        </div>
                                        <audio className="w-48" controls src={`${process.env.REACT_APP_IMAGE_DOMAIN}/images/gmc2/utilsystem/2years_event_${item.citizenid}.mp3`}></audio>
                                    </>
                                ) : ""}

                                {item.is_emote ? (
                                    <>
                                        <div className="font-bold text-green-600 mt-4 mb-2">
                                            <div className="font-bold">エモートアイテム</div>
                                            <div className='text-black font-normal'>{item.emote}</div>
                                        </div>
                                    </>
                                ) : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                isOpen &&
                <div className="border-black border-2 rounded-lg px-3 pt-2">
                    <Item item={item} />
                    {item.is_image ? (
                        <Image item={item} />
                    ) : ""}
                    {item.is_audio ? (
                        <Audio item={item} />
                    ) : ""}
                    {item.is_emote ? (
                        <Emote item={item} />
                    ) : ""}
                    {item.is_remove && (!item.is_image && !item.is_audio && !item.is_emote) ? (
                        <Remove item={item} />
                    ) : ""}
                </div>
            }
        </div >
    )
}

export const CopyButton = ({ code }) => {
    const [copyStatus, setCopyStatus] = useState('Copy');

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopyStatus('Copied!');
                setTimeout(() => setCopyStatus('Copy'), 2000);
            })
            .catch((error) => {
                console.error("Copy failed:", error);
                setCopyStatus('Failed to copy');
            });
    };

    return (
        <button
            onClick={() => handleCopy(`${code}`)}
            className="absolute right-2 top-2 py-1 px-2 cursor-pointer bg-[#4CAF50] text-white rounded-md"
        >
            {copyStatus}
        </button>
    )
}

export default EachItem