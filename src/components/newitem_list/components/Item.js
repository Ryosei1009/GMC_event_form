import React from 'react'
import { CopyButton } from '../EachItem'

const Item = ({ item }) => {
    const code = `['2years_event_${item.citizenid}'] = { label = '${item.name}', description = '${item.description === null ? "" : item.description}', weight = 100, stack = true, close = true, },`

    return (
        <div>
            <p className="left-4 text-gray-600 font-bold">
                ox_inventory/data/item.lua
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

export default Item