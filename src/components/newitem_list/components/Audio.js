import React from 'react'
import { CopyButton } from '../EachItem'

const Audio = ({ item }) => {
    let code = `["2years_event_${item.citizenid}"] = {
        type = Config.ItemTypes.MUSIC_PLAYER,
        itemName = "2years_event_${item.citizenid}",
        mp3File = "2years_event_${item.citizenid}.mp3"${item.is_remove ? `,
        removeOnUse = true` : ""}
    },`

    return (
        <div>
            <p className="left-4 text-gray-600 font-bold">
                gmc_utilsystem/config.lua
            </p>
            <div className="relative">
                <CopyButton item={item} code={code} />
                <pre>
                    <code className="language-lua pr-16">
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    )
}

export default Audio