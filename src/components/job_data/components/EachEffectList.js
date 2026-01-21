import React, { useEffect, useState } from 'react'
import { CopyButton } from '../../newitem_list/EachItem';
import '../../newitem_list/code.css'
import Prism from 'prismjs';
import 'prismjs/components/prism-lua';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const EachEffectList = ({ itemList }) => {
    const [visible, setVisible] = useState(false);
    const [newItemList, setNewItemList] = useState([]);

    useEffect(() => {
        const updatedItemList = itemList.reverse().map((item) => {
            if (item.is_remove) return `    ["2years_event_${item.citizenid}"] = {
        type = Config.ItemTypes.MUSIC_PLAYER,
        itemName = "2years_event_${item.citizenid}",
        mp3File = "2years_event_${item.citizenid}.mp3"${item.is_remove ? `,
        removeOnUse = true` : ""}
    },\n`;
        if (item.is_emote) return `    ['2years_event_${item.citizenid}'] = {
        type = Config.ItemTypes.EMOTE_ONLY,
        emote = "${item.emote}"${item.is_remove ? `,
        removeOnUse = true` : ""}
    },\n`;
        if (item.is_image) return `    ['2years_event_${item.citizenid}'] = {
        type = Config.ItemTypes.SIMPLE_IMAGE,
        image = '2years_event_${item.citizenid}.png',
        baseUrl = Config.BaseURLs.itemimage${item.is_remove ? `,
        removeOnUse = true` : ""}
    },\n`;
        if (item.is_remove) return `    ['2years_event_${item.citizenid}'] = {
        type = Config.ItemTypes.REMOVE_ITEM,
    },\n`;
            return '';
        }).join('');
        setNewItemList(updatedItemList);
    }, [itemList]);

    useEffect(() => {
        Prism.highlightAll();
    }, [itemList, visible, newItemList]);
    return (
        <div>
            <p className="left-4 text-gray-600 font-bold">
                gmc_utilsystem/config.lua
            </p>
            <div className="relative">
                <CopyButton code={newItemList} />
                <span onClick={() => setVisible(!visible)} className="absolute top-2 right-24 bg-[#4CAF50] rounded-md px-2 cursor-pointer">
                    <ChevronDownIcon className="h-8 w-8 fill-white inline-block" />
                </span>
                <pre className={`scroll-hidden ${!visible && "max-h-12"}`}>
                    <code className="language-lua pr-16">
                        {newItemList}
                    </code>
                </pre>
            </div>
        </div>
    )
}

export default EachEffectList