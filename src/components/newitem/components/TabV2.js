import React from 'react'

const TabV2 = ({ formData, setFormData }) => {
    // タイプを判定するヘルパー関数
    const isBasic = () => formData.is_emote === 0 && formData.is_image === 0 && formData.is_audio === 0;
    const isEmote = () => formData.is_emote === 1;
    const isImage = () => formData.is_image === 1;
    const isAudio = () => formData.is_audio === 1;

    // タイプ変更ハンドラー
    const handleTypeChange = (type) => {
        setFormData(prev => ({
            ...prev,
            is_emote: type === "emote" ? 1 : 0,
            is_image: type === "image" ? 1 : 0,
            is_audio: type === "audio" ? 1 : 0,
            emote: type !== "emote" ? "" : prev.emote, // エモート以外を選んだ時はemoteをリセット
        }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl mx-4 sm:mx-auto max-w-4xl mt-6 relative z-10 p-6 sm:p-8">
            <label className="text-lg font-semibold text-gray-700 mb-2 block">アイテムタイプ</label>
            <div className="text-gray-500 text-sm mb-4">
                このアイテムの機能を選択してください。<br />
                エモートアイテム、画像表示アイテム、音楽再生アイテムを選択すると、事前納品時に2.5万円、当日納品時に5万円の追加料金が発生します。
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                {/* 基本アイテム */}
                <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        isBasic()
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => handleTypeChange("basic")}
                >
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            checked={isBasic()}
                            className="mr-2"
                            readOnly
                        />
                        <span className="font-semibold">📦 基本アイテム</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        特別な機能を持たない通常のアイテム
                    </div>
                </div>

                {/* エモートアイテム */}
                <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        isEmote()
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => handleTypeChange("emote")}
                >
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            checked={isEmote()}
                            className="mr-2"
                            readOnly
                        />
                        <span className="font-semibold">🕺 エモートアイテム</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        使用時にエモートを実行するアイテム
                    </div>
                </div>

                {/* 画像表示アイテム */}
                <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        isImage()
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => handleTypeChange("image")}
                >
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            checked={isImage()}
                            className="mr-2"
                            readOnly
                        />
                        <span className="font-semibold">🖼️ 画像表示アイテム</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        使用時に画像を表示するアイテム
                    </div>
                </div>

                {/* 音楽再生アイテム */}
                <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        isAudio()
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => handleTypeChange("audio")}
                >
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            checked={isAudio()}
                            className="mr-2"
                            readOnly
                        />
                        <span className="font-semibold">🎵 音楽再生アイテム</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        使用時に音楽を再生するアイテム
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabV2